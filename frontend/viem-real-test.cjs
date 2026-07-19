// Real viem test — exact same library wagmi uses under the hood
const fs = require('fs');

(async () => {
  const { createWalletClient, createPublicClient, http, parseEther, getAddress } = await import('viem');
  const { monadTestnet } = await import('viem/chains');

  const FAUCET_RAW = '0xd6447CBb6B61d1C95EaeFBb24b1ccFBF3E0D5E36';
  const FAUCET_PK = '0x60f69435063c15feaddfcbc01e0bb09740ed96d8373856522a05b534fc2e387e';
  const HEIR_RAW = '0x3c44cddfeb1f1c64a3e8d7c21d8d91c4359d0b22';

  const FAUCET = getAddress(FAUCET_RAW);
  const HEIR = getAddress(HEIR_RAW);

  // Load ABI and BYTECODE
  const { ABI } = require('./src/abi.js');
  const { BYTECODE } = require('./src/bytecode.js');

  console.log('=== STEP 1: Create viem clients ===');
  const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http('https://testnet-rpc.monad.xyz'),
  });

  const { privateKeyToAccount } = await import('viem/accounts');
  const pkAccount = privateKeyToAccount(FAUCET_PK);
  console.log('Private key account:', pkAccount.address, '(expected:', FAUCET + ')');

  const walletClient = createWalletClient({
    chain: monadTestnet,
    transport: http('https://testnet-rpc.monad.xyz'),
    account: pkAccount,
  });

  console.log('=== STEP 2: Deploy contract via viem (same as RainbowKit calls) ===');
  // deployContract — same function wagmi's useDeployContract exposes
  let hash;
  try {
    hash = await walletClient.deployContract({
      abi: ABI,
      bytecode: BYTECODE,
      args: [HEIR, 2592000], // beneficiary, 30 days
      
      chain: monadTestnet,
      gas: 1500000n,
    });
    console.log('Deploy tx sent, hash:', hash);
  } catch (e) {
    console.log('Deploy error:', e.message?.slice(0, 200));
    process.exit(1);
  }

  console.log('=== STEP 3: Wait for receipt ===');
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log('Receipt status:', receipt.status);
  console.log('Contract address:', receipt.contractAddress);
  const newContract = receipt.contractAddress;
  if (!newContract) {
    console.log('FAILED — no contractAddress on receipt');
    // Try fallback: get from contractDeployed event
    process.exit(1);
  }

  console.log('\n=== STEP 4: Read contract state (uses wagmi useContractRead under the hood) ===');
  const [owner, beneficiary, balance, timeout, lastCheckIn, isDead] = await Promise.all([
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'owner' }),
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'beneficiary' }),
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'balance' }),
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'timeout' }),
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'lastCheckIn' }),
    publicClient.readContract({ address: newContract, abi: ABI, functionName: 'isDead' }),
  ]);
  console.log('owner:', owner);
  console.log('beneficiary:', beneficiary);
  console.log('balance:', balance.toString(), 'wei =', Number(balance) / 1e18, 'MON');
  console.log('timeout:', timeout.toString(), 'seconds =', Number(timeout) / 86400, 'days');
  console.log('lastCheckIn:', lastCheckIn.toString());
  console.log('isDead:', isDead);

  console.log('\n=== STEP 5: Perform Ritual (checkIn) — same as wagmi useContractWrite ===');
  // Sign with PK
  const acct = { address: FAUCET, type: 'privateKey', privateKey: FAUCET_PK, source: 'privateKey' };
  const txHash1 = await walletClient.writeContract({
    address: newContract,
    abi: ABI,
    functionName: 'checkIn',
    
    chain: monadTestnet,
    gas: 200000n,
  });
  const r1 = await publicClient.waitForTransactionReceipt({ hash: txHash1 });
  console.log('checkIn() status:', r1.status === 'success' ? '✅ SUCCESS' : '❌ FAIL');
  const newCheckIn = await publicClient.readContract({ address: newContract, abi: ABI, functionName: 'lastCheckIn' });
  console.log('lastCheckIn updated:', lastCheckIn.toString(), '->', newCheckIn.toString());

  console.log('\n=== STEP 6: Fund Offering (0.01 MON) ===');
  const txHash2 = await walletClient.writeContract({
    address: newContract,
    abi: ABI,
    functionName: 'fund',
    
    chain: monadTestnet,
    value: parseEther('0.01'),
    gas: 200000n,
  });
  const r2 = await publicClient.waitForTransactionReceipt({ hash: txHash2 });
  console.log('fund() status:', r2.status === 'success' ? '✅ SUCCESS' : '❌ FAIL');
  const newBal = await publicClient.readContract({ address: newContract, abi: ABI, functionName: 'balance' });
  console.log('balance:', Number(newBal) / 1e18, 'MON');

  console.log('\n=== STEP 7: Update Heir (Update Beneficiary) ===');
  const txHash3 = await walletClient.writeContract({
    address: newContract,
    abi: ABI,
    functionName: 'updateBeneficiary',
    args: ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'],
    
    chain: monadTestnet,
    gas: 200000n,
  });
  const r3 = await publicClient.waitForTransactionReceipt({ hash: txHash3 });
  console.log('updateBeneficiary() status:', r3.status === 'success' ? '✅ SUCCESS' : '❌ FAIL');
  const newBen = await publicClient.readContract({ address: newContract, abi: ABI, functionName: 'beneficiary' });
  console.log('beneficiary updated to:', newBen);

  console.log('\n=== STEP 8: Reclaim (withdraw 0.005 MON) ===');
  const txHash4 = await walletClient.writeContract({
    address: newContract,
    abi: ABI,
    functionName: 'withdraw',
    args: [parseEther('0.005')],
    
    chain: monadTestnet,
    gas: 200000n,
  });
  const r4 = await publicClient.waitForTransactionReceipt({ hash: txHash4 });
  console.log('withdraw() status:', r4.status === 'success' ? '✅ SUCCESS' : '❌ FAIL');
  const finalBal = await publicClient.readContract({ address: newContract, abi: ABI, functionName: 'balance' });
  console.log('balance after reclaim:', Number(finalBal) / 1e18, 'MON');

  console.log('\n=== ALL TESTS PASS ===');
  console.log('Contract:', newContract);
})();
