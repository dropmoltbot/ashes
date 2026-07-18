import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: { default: { http: ['https://testnet-rpc.monad.xyz'] } },
  blockExplorers: { default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' } },
  testnet: true
}
export const CONTRACT = '0x676A091c15C2e6ad323070a8e1C1a28718fE2De5'
export const config = getDefaultConfig({
  appName: 'ASHES',
  projectId: '9b7978df7340069dbaf085e3ea5e7de5',
  chains: [monadTestnet],
  transports: { [monadTestnet.id]: http() }
})
