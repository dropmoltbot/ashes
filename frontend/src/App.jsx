import React, { useState, useEffect } from 'react'
import { RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider, useAccount, useContractRead, useContractWrite } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { formatEther, parseEther } from 'viem'
import { config, CONTRACT } from './config'
import { ABI } from './abi'

const qc = new QueryClient()
const short = a => a ? a.slice(0,6)+'...'+a.slice(-4) : '—'

function AshFlakes() {
  useEffect(() => {
    const c = document.querySelector('.ash-container')
    if (!c || c.children.length) return
    for (let i = 0; i < 50; i++) {
      const f = document.createElement('div')
      f.className = 'ash-flake'
      f.style.left = Math.random()*100+'%'
      f.style.animationDuration = (4+Math.random()*5)+'s'
      f.style.animationDelay = Math.random()*6+'s'
      f.style.opacity = 0.2+Math.random()*0.3
      c.appendChild(f)
    }
  }, [])
  return <div className="ash-container" />
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { if (msg) { const t = setTimeout(onClose, 4000); return () => clearTimeout(t) } }, [msg])
  if (!msg) return null
  return <div className={'toast ' + (type === 'err' ? 'toast-err' : 'toast-ok')}>{msg}</div>
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
        <circle className="ring-fg" cx="110" cy="110" r="92" strokeWidth="8" fill="none" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off} />
      </svg>
      <div className="ring-center">
        <span className="ring-number">{days > 0 ? days : hours}</span>
        <span className="ring-label">{days > 0 ? 'DAYS LEFT' : 'HOURS LEFT'}</span>
      </div>
    </div>
  )
}

function Stats() {
  const owner = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'owner' })
  const beneficiary = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'beneficiary' })
  const lastCheckIn = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'lastCheckIn' })
  const timeout = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeout' })
  const balance = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'balance' })
  const isDead = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'isDead' })
  const lastDate = lastCheckIn.data ? new Date(Number(lastCheckIn.data) * 1000).toLocaleString() : '—'
  const timeoutDays = timeout.data ? Number(timeout.data) / 86400 : 30
  return (
    <div className="card stats">
      <div className="stat-row"><span className="stat-label">Owner</span><span className="stat-value">{short(owner.data)}</span></div>
      <div className="stat-row"><span className="stat-label">Beneficiary</span><span className="stat-value">{short(beneficiary.data)}</span></div>
      <div className="stat-row"><span className="stat-label">Last Ritual</span><span className="stat-value">{lastDate}</span></div>
      <div className="stat-row"><span className="stat-label">Timeout</span><span className="stat-value">{timeoutDays} days</span></div>
      <div className="stat-row"><span className="stat-label">Offering</span><span className="stat-value">{balance.data ? formatEther(balance.data) : '0'} MON</span></div>
      <div className="stat-row"><span className="stat-label">Status</span>
        {isDead.data ? <span className="stat-status status-dead">CLAIMABLE</span> : <span className="stat-status status-active">ALIVE</span>}
      </div>
    </div>
  )
}

function ActionTabs() {
  const [tab, setTab] = useState('checkIn')
  const [toast, setToast] = useState({ msg: '', type: '' })
  const [input, setInput] = useState('')
  const checkIn = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'checkIn' })
  const fund = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'fund' })
  const withdraw = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'withdraw' })
  const updateBen = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'updateBeneficiary' })
  const claim = useContractWrite({ address: CONTRACT, abi: ABI, functionName: 'claim' })
  const handle = async (fn, label, arg) => {
    try {
      setToast({ msg: label + ' pending...', type: 'ok' })
      const tx = arg !== undefined ? await fn.writeAsync(arg) : await fn.writeAsync()
      await tx.wait()
      setToast({ msg: label + ' done ✓', type: 'ok' })
    } catch (e) { setToast({ msg: e.message.slice(0, 80), type: 'err' }) }
  }
  return (
    <>
      <div className="tabs">
        <button className={'tab ' + (tab==='checkIn'?'active':'')} onClick={()=>setTab('checkIn')}>Ritual</button>
        <button className={'tab ' + (tab==='fund'?'active':'')} onClick={()=>setTab('fund')}>Offer</button>
        <button className={'tab ' + (tab==='withdraw'?'active':'')} onClick={()=>setTab('withdraw')}>Reclaim</button>
        <button className={'tab ' + (tab==='ben'?'active':'')} onClick={()=>setTab('ben')}>Heir</button>
        <button className={'tab ' + (tab==='claim'?'active':'')} onClick={()=>setTab('claim')}>Claim</button>
      </div>
      <div className="card">
        <div className={'panel ' + (tab==='checkIn'?'active':'')}>
          <p className="panel-desc">Confirm your existence. Resets the countdown.</p>
          <button className="btn-primary" onClick={()=>handle(checkIn,'Ritual')}>Perform Ritual</button>
        </div>
        <div className={'panel ' + (tab==='fund'?'active':'')}>
          <p className="panel-desc">Deposit MON as offering.</p>
          <input className="input" placeholder="0.05" value={input} onChange={e=>setInput(e.target.value)} />
          <button className="btn-primary" onClick={()=>handle(fund,'Offer',{value:parseEther(input||'0.01')})}>Deposit Offering</button>
        </div>
        <div className={'panel ' + (tab==='withdraw'?'active':'')}>
          <p className="panel-desc">Reclaim from the ashes.</p>
          <input className="input" placeholder="0.01" value={input} onChange={e=>setInput(e.target.value)} />
          <button className="btn-primary" onClick={()=>handle(withdraw,'Reclaim',parseEther(input||'0.01'))}>Reclaim MON</button>
        </div>
        <div className={'panel ' + (tab==='ben'?'active':'')}>
          <p className="panel-desc">Designate a new heir.</p>
          <input className="input" placeholder="0x..." value={input} onChange={e=>setInput(e.target.value)} />
          <button className="btn-primary" onClick={()=>handle(updateBen,'Heir',input)}>Update Heir</button>
        </div>
        <div className={'panel ' + (tab==='claim'?'active':'')}>
          <p className="panel-desc">If the owner stopped their rituals, claim their legacy.</p>
          <button className="btn-primary btn-claim" onClick={()=>handle(claim,'Claim')}>Claim From The Dead</button>
        </div>
      </div>
      <Toast {...toast} onClose={()=>setToast({msg:'',type:''})} />
    </>
  )
}

function Dashboard() {
  const remaining = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeRemaining' })
  const timeout = useContractRead({ address: CONTRACT, abi: ABI, functionName: 'timeout' })
  return (
    <div className="container">
      <div className="card timer-card">
        <TimerRing remaining={remaining.data || 0n} timeout={timeout.data || 1n} />
      </div>
      <Stats />
      <ActionTabs />
    </div>
  )
}

function App() {
  const { isConnected } = useAccount()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider theme={darkTheme({accentColor:'#8b1818',accentColorForeground:'#e8dcc8',borderRadius:'medium',fontStack:'Cinzel, serif'})}>
          <div className="app">
            <AshFlakes />
            <header className="hero">
              <span className="cross-symbol">†</span>
              <h1 className="title font-gothic">ASHES</h1>
              <p className="subtitle">Ensure your crypto lives on, even when you don't.</p>
              <div className="divider" />
            </header>
            <div style={{maxWidth:760,margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'center'}}>
              <ConnectButton showBalance />
            </div>
            <div style={{height:40}} />
            {isConnected ? <Dashboard /> : (
              <div className="container connect-section">
                <p className="connect-hint">Connect your wallet to claim your legacy on Monad.</p>
              </div>
            )}
            <footer className="footer">
              <p className="footer-contract">CONTRACT :: {CONTRACT}</p>
              <p className="footer-sig">† BUILT ON MONAD · BY dropxtor †</p>
            </footer>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
