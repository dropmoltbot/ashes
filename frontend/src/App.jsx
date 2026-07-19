import React, { useState, useEffect, createContext, useContext } from 'react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider, useAccount, useContractRead, useContractWrite, useDeployContract } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { formatEther, parseEther } from 'viem'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from './config'
import { ABI } from './abi'
import { BYTECODE } from './bytecode'
import { AshesLogo, SkullIcon, UrnIcon, FlameIcon, CrownIcon, DividerSvg } from './Icons'
import { GothicConnectButton } from './GothicConnect'
import Landing from './Landing'

const qc = new QueryClient()
const short = a => a ? a.slice(0,6)+'...'+a.slice(-4) : '—'

// Contract address can be: (a) user's own deployed contract (persisted localStorage), (b) the demo contract
const DEMO_CONTRACT = '0x676A091c15C2e6ad323070a8e1C1a28718fE2De5'
const isValidAddr = a => typeof a === 'string' && /^0x[a-fA-F0-9]{40}$/.test(a)
const getInitialContract = () => {
  const stored = (typeof localStorage !== 'undefined') ? localStorage.getItem('ashes_contract') : null
  return isValidAddr(stored) ? stored : DEMO_CONTRACT
}
const ContractCtx = createContext(null)
const useContract = () => useContext(ContractCtx)

// === Framer Motion variants for fluid animations ===
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
}

const cardVariant = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
}

const tabVariant = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

function AshFlakes() {
  useEffect(() => {
    const c = document.querySelector('.ash-container')
    if (!c || c.children.length) return
    for (let i = 0; i < 24; i++) {  // Reduced from 50 to 24 for perf
      const f = document.createElement('div')
      f.className = 'ash-flake'
      f.style.left = Math.random()*100+'%'
      f.style.animationDuration = (6+Math.random()*7)+'s'
      f.style.animationDelay = Math.random()*6+'s'
      f.style.opacity = 0.15+Math.random()*0.25
      c.appendChild(f)
    }
  }, [])
  return <div className="ash-container" />
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { if (msg) { const t = setTimeout(onClose, 4000); return () => clearTimeout(t) } }, [msg])
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          className={'toast ' + (type === 'err' ? 'toast-err' : 'toast-ok')}
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >{msg}</motion.div>
      )}
    </AnimatePresence>
  )
}

function TimerRing({ remaining, timeout }) {
  const circ = 578
  const pct = Math.max(0, Math.min(1, Number(remaining || 0n) / Number(timeout || 1n)))
  const off = circ * (1 - pct)
  const rem = Number(remaining || 0n)
  const days = Math.floor(rem / 86400)
  const hours = Math.floor((rem % 86400) / 3600)
  return (
    <div className="ring-wrapper">
      <svg className="ring-svg" width="220" height="220">
        <circle className="ring-bg" cx="110" cy="110" r="92" strokeWidth="8" fill="none" strokeLinecap="round" />
        <motion.circle
          cx="110" cy="110" r="92" strokeWidth="8" fill="none" strokeLinecap="round"
          stroke="rgb(255,107,28)"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,28,0.5))' }}
        />
      </svg>
      <div className="ring-center">
        <motion.span className="ring-number"
          key={days > 0 ? days : hours}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >{days > 0 ? days : hours}</motion.span>
        <span className="ring-label">{days > 0 ? 'DAYS LEFT' : 'HOURS LEFT'}</span>
      </div>
    </div>
  )
}

function StatRow({ label, value, glow }) {
  return (
    <motion.div className="stat-row" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <span className="stat-label">{label}</span>
      <span className="stat-value" style={glow ? { textShadow: '0 0 10px rgba(255,107,28,0.6)' } : {}}>{value}</span>
    </motion.div>
  )
}

function Stats() {
  const CONTRACT = useContract()
  const enabled = !!CONTRACT
  const owner = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'owner', enabled })
  const beneficiary = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'beneficiary', enabled })
  const lastCheckIn = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'lastCheckIn', enabled })
  const timeout = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeout', enabled })
  const balance = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'balance', enabled })
  const isDead = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'isDead', enabled, refetchInterval: 30000 })
  const lastDate = lastCheckIn.data ? new Date(Number(lastCheckIn.data) * 1000).toLocaleString() : '—'
  const timeoutDays = timeout.data ? Number(timeout.data) / 86400 : 0
  const isLoading = owner.isLoading || beneficiary.isLoading
  return (
    <motion.div className="card stats" {...cardVariant}>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 20, opacity: 0.5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Loading on-chain state…</div>
      ) : (
        <>
          <StatRow label="Owner" value={short(owner.data)} />
          <StatRow label="Beneficiary" value={short(beneficiary.data)} />
          <StatRow label="Last Ritual" value={lastDate} />
          <StatRow label="Timeout" value={timeoutDays + ' days'} />
          <StatRow label="Offering" value={(balance.data ? formatEther(balance.data) : '0') + ' MON'} glow />
          <div className="stat-row">
            <span className="stat-label">Status</span>
            {isDead.data ? (
              <motion.span className="stat-status status-dead"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >CLAIMABLE</motion.span>
            ) : (
              <span className="stat-status status-active">ALIVE</span>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

function ActionTabs() {
  const CONTRACT = useContract()
  const [tab, setTab] = useState('checkIn')
  const [toast, setToast] = useState({ msg: '', type: '' })
  const [input, setInput] = useState('')
  const checkIn = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'checkIn' })
  const fund = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'fund' })
  const withdraw = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'withdraw' })
  const updateBen = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'updateBeneficiary' })
  const claim = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'claim' })
  const handle = async (fn, label, functionName, arg, isPayable, valueEth) => {
    try {
      setToast({ msg: label + ' pending...', type: 'ok' })
      const cfg = { abi: ABI, address: CONTRACT, functionName }
      if (arg !== undefined && arg !== null) {
        cfg.args = Array.isArray(arg) ? arg : [arg]
      }
      if (isPayable && valueEth) {
        try { cfg.value = parseEther(String(valueEth)) } catch(e) { setToast({ msg: 'Invalid amount', type: 'err' }); return }
      }
      // Client-side guards (contract also enforces these onchain)
      if (functionName === 'updateBeneficiary' && cfg.args && cfg.args[0]) {
        if (!isValidAddr(cfg.args[0])) { setToast({ msg: 'Invalid heir address', type: 'err' }); return }
      }
      if (functionName === 'withdraw' && cfg.args && cfg.args[0] !== undefined && typeof cfg.args[0] === 'string') {
        try { cfg.args = [parseEther(cfg.args[0])] } catch(e) { setToast({ msg: 'Invalid amount', type: 'err' }); return }
      }
      // Explicit gas to avoid gas-estimate failure when contract would revert (common on Monad testnet)
      cfg.gas = 200000n
      const tx = await fn.writeContractAsync(cfg)
      if (tx?.hash) setToast({ msg: label + ' sent ✓ ' + tx.hash.slice(0, 10) + '...', type: 'ok' })
      else setToast({ msg: label + ' done ✓', type: 'ok' })
    } catch (e) {
      const msg = e?.shortMessage || e?.message || 'tx failed'
      setToast({ msg: msg.slice(0, 80), type: 'err' })
    }
  }
  const tabs = [
    { id: 'checkIn', label: 'Ritual', icon: <FlameIcon size={16} /> },
    { id: 'fund', label: 'Offer', icon: <UrnIcon size={16} /> },
    { id: 'withdraw', label: 'Reclaim', icon: <SkullIcon size={16} /> },
    { id: 'ben', label: 'Heir', icon: <CrownIcon size={16} /> },
    { id: 'claim', label: 'Claim', icon: <SkullIcon size={16} /> }
  ]
  return (
    <>
      <div className="tabs">
        {tabs.map(t => (
          <motion.button key={t.id}
            className={'tab ' + (tab===t.id?'active':'')}
            onClick={()=>setTab(t.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              {t.icon} {t.label}
            </span>
          </motion.button>
        ))}
      </div>
      <motion.div className="card" {...cardVariant}>
        <AnimatePresence mode="wait">
          {tab === 'checkIn' && (
            <motion.div className="panel active" key="checkIn" {...tabVariant}>
              <p className="panel-desc">Confirm your existence. Resets the countdown.</p>
              <motion.button className="btn-primary"
                onClick={()=>handle(checkIn,'Ritual','checkIn')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >Perform Ritual</motion.button>
            </motion.div>
          )}
          {tab === 'fund' && (
            <motion.div className="panel active" key="fund" {...tabVariant}>
              <p className="panel-desc">Deposit MON as offering.</p>
              <input className="input" placeholder="0.05" value={input} onChange={e=>setInput(e.target.value)} />
              <motion.button className="btn-primary"
                onClick={()=>handle(fund,'Offer','fund',undefined,true,(input||'0.01'))}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >Deposit Offering</motion.button>
            </motion.div>
          )}
          {tab === 'withdraw' && (
            <motion.div className="panel active" key="withdraw" {...tabVariant}>
              <p className="panel-desc">Reclaim from the ashes.</p>
              <input className="input" placeholder="0.01" value={input} onChange={e=>setInput(e.target.value)} />
              <motion.button className="btn-primary"
                onClick={()=>handle(withdraw,'Reclaim','withdraw',[parseEther(input||'0.01')])}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >Reclaim MON</motion.button>
            </motion.div>
          )}
          {tab === 'ben' && (
            <motion.div className="panel active" key="ben" {...tabVariant}>
              <p className="panel-desc">Designate a new heir.</p>
              <input className="input" placeholder="0x..." value={input} onChange={e=>setInput(e.target.value)} />
              <motion.button className="btn-primary"
                onClick={()=>handle(updateBen,'Heir','updateBeneficiary',[input])}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >Update Heir</motion.button>
            </motion.div>
          )}
          {tab === 'claim' && (
            <motion.div className="panel active" key="claim" {...tabVariant}>
              <p className="panel-desc">If the owner stopped their rituals, claim their legacy.</p>
              <motion.button className="btn-primary btn-claim"
                onClick={()=>handle(claim,'Claim','claim')}
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 50px rgba(255,107,28,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >Claim From The Dead</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Toast {...toast} onClose={()=>setToast({msg:'',type:''})} />
    </>
  )
}

function Forge() {
  const { isConnected, address } = useAccount()
  const deploy = useDeployContract()
  const setContract = useContractSet()
  const [benInput, setBenInput] = useState('')
  const [days, setDays] = useState(30)
  const [toast, setToast] = useState({ msg: '', type: '' })

  const handleDeploy = async () => {
    if (!isConnected) { setToast({msg:'Connect wallet first', type:'err'}); return }
    if (!isValidAddr(benInput)) {
      setToast({msg:'Invalid heir address (must be 0x... 40 hex)', type:'err'}); return
    }
    if (benInput.toLowerCase() === address?.toLowerCase()) {
      setToast({msg:'Self-heir not allowed', type:'err'}); return
    }
    if (days < 1 || days > 365) {
      setToast({msg:'Timeout 1-365 days', type:'err'}); return
    }
    try {
      setToast({msg:'Forging your switch...', type:'ok'})
      const hash = await deploy.deployContract({
        abi: ABI,
        bytecode: BYTECODE,
        args: [benInput, Number(days) * 86400],
        gas: 1500000n,
      })
      if (hash) {
        setToast({msg:'Switch forged! polling for address...', type:'ok'})
        const receipt = await deploy.waitForDeployment?.() || null
        const tc = await import('wagmi').then(m => m.waitForTransactionReceipt)
        const r = await tc({ hash, chainId: 10143 })
        if (r?.contractAddress) {
          setContract(r.contractAddress)
          localStorage.setItem('ashes_contract', r.contractAddress)
          setToast({msg:'Switch live at ' + short(r.contractAddress), type:'ok'})
        }
      }
    } catch (e) {
      const msg = e?.shortMessage || e?.message || 'deploy failed'
      setToast({msg: msg.slice(0, 80), type:'err'})
    }
  }

  return (
    <motion.div className="card forge-card" {...cardVariant}
      style={{ maxWidth: 500, margin: '0 auto 30px auto', padding: '28px' }}
    >
      <h2 className="section-title font-gothic">Forge Your Switch</h2>
      <p className="panel-desc">Anyone can forge their own on-chain dead-man switch. You become its owner; the chain enforces your will after death.</p>

      <div style={{ marginBottom: 18 }}>
        <label className="stat-label">HEIR ADDRESS</label>
        <input className="input" placeholder="0x... (beneficiary, not yourself)"
          value={benInput} onChange={e=>setBenInput(e.target.value)} />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label className="stat-label">TIMEOUT (DAYS): <span style={{color:'var(--ember)'}}>{days}</span></label>
        <input type="range" min="1" max="365" value={days}
          onChange={e=>setDays(e.target.value)}
          style={{ width: '100%', accentColor: '#f6851b', cursor: 'pointer' }} />
      </div>

      <motion.button className="btn-primary btn-forge"
        onClick={handleDeploy}
        whileHover={{ scale: 1.02, y: -2, boxShadow: '0 12px 50px rgba(255,107,28,0.5)' }}
        whileTap={{ scale: 0.98 }}
        disabled={deploy.isPending}
        style={{ width: '100%' }}
      >
        {deploy.isPending ? 'Forging...' : 'Forge Your Switch'}
      </motion.button>
      <AnimatePresence>
        {toast.msg && (
          <motion.div className={'toast ' + (toast.type === 'err' ? 'toast-err' : 'toast-ok')}
            initial={{ x: 120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 120, opacity: 0 }}
            style={{ position: 'static', marginTop: 14 }}
          >{toast.msg}</motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Dashboard() {
  const CONTRACT = useContract()
  const enabled = !!CONTRACT
  const remaining = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeRemaining', refetchInterval: 30000, enabled })
  const timeout = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeout' })
  return (
    <motion.div className="container"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
    >
      <motion.div className="card timer-card" {...cardVariant}>
        <TimerRing remaining={remaining.data || 0n} timeout={timeout.data || 1n} />
      </motion.div>
      <Stats />
      <ActionTabs />
    </motion.div>
  )
}

function Inner() {
  const { isConnected, isReconnecting, isConnecting } = useAccount()
  const [contract, setContract] = useState(getInitialContract)
  const value = { contract, setContract, address: contract }
  const showDashboard = isConnected && !isConnecting
  return (
    <ContractCtx.Provider value={value.address}>
      <div className="app">
        <AshFlakes />
        <motion.header className="hero" {...fadeUp}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AshesLogo size={140} />
          </motion.div>
          <h1 className="title font-gothic">ASHES</h1>
          <p className="subtitle">Ensure your crypto lives on, even when you don't.</p>
          <DividerSvg width={180} />
        </motion.header>
        <motion.div
          style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <GothicConnectButton />
        </motion.div>
        <div style={{ height: 40 }} />
        <AnimatePresence mode="wait">
          {isReconnecting ? (
            <motion.div key="reconnecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace', color: 'var(--bone-fade)' }}>
              Reconnecting...
            </motion.div>
          ) : showDashboard ? (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Forge />
              <Dashboard />
            </motion.div>
          ) : (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Landing />
            </motion.div>
          )}
        </AnimatePresence>
        <footer className="footer">
          <motion.p className="footer-contract"
            whileHover={{ color: 'var(--ember)' }}
            transition={{ duration: 0.2 }}
            style={{ cursor: 'pointer' }}
            onClick={() => { navigator.clipboard.writeText(value.address); alert('Contract address copied') }}
            title="Click to copy"
          >CONTRACT :: {value.address.slice(0,20)}...{value.address.slice(-6)} ⎘</motion.p>
          {contract !== DEMO_CONTRACT && (
            <motion.button
              onClick={() => { localStorage.removeItem('ashes_contract'); setContract(DEMO_CONTRACT) }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ textTransform: 'none', font: 'inherit', background: 'transparent', color: 'var(--bone-fade)', padding: '4px 12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, marginTop: 8 }}
            >← back to demo switch</motion.button>
          )}
          <p className="footer-sig">† BUILT ON MONAD · BY dropxtor †</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12 }}>
            <a href="https://github.com/dropmoltbot/ashes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bone-fade)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textDecoration: 'none' }}>GITHUB ↗</a>
            <a href={`https://testnet.monadexplorer.com/address/${value.address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bone-fade)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textDecoration: 'none' }}>EXPLORER ↗</a>
            <a href="https://x.com/0xDropxtor" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--bone-fade)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textDecoration: 'none' }}>X ↗</a>
          </div>
        </footer>
      </div>
    </ContractCtx.Provider>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider theme={darkTheme({accentColor:'#8b1818',accentColorForeground:'#e8dcc8',borderRadius:'medium',fontStack:'Cinzel, serif'})}>
          <Inner />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
