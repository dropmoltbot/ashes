import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Custom wrapper that forces gothic theme on the ConnectButton
export function GothicConnectButton() {
  return (
    <div className="gothic-connect-wrapper">
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading'
          const connected = ready && account && chain
          return (
            <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
              {!connected ? (
                <button onClick={openConnectModal} type="button" className="gothic-connect-btn">
                  CONNECT WALLET
                </button>
              ) : chain.unsupported ? (
                <button onClick={openChainModal} type="button" className="gothic-connect-btn gothic-connect-warn">
                  WRONG NETWORK
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={openChainModal} className="gothic-chain-btn" type="button">
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button" className="gothic-account-btn">
                    {account.displayName}
                    {account.displayBalance ? ` · ${account.displayBalance}` : ''}
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </ConnectButton.Custom>
      <style>{`
        .gothic-connect-wrapper button {
          font-family: 'Cinzel', serif;
          font-size: 15px;
          letter-spacing: 0.25em;
          font-weight: 600;
          color: rgb(232, 220, 200);
          background: linear-gradient(135deg, rgb(74, 14, 14), rgb(139, 24, 24));
          border: 1px solid rgba(196, 72, 72, 0.4);
          padding: 16px 36px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          box-shadow: 0 4px 20px rgba(139, 24, 24, 0.3);
        }
        .gothic-connect-wrapper button:hover {
          background: linear-gradient(135deg, rgb(139, 24, 24), rgb(196, 72, 72));
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139, 24, 24, 0.5), 0 0 40px rgba(196, 72, 72, 0.2);
          border-color: rgb(196, 72, 72);
        }
        .gothic-connect-wrapper button:active { transform: translateY(0); }
        .gothic-connect-warn {
          background: linear-gradient(135deg, rgb(139, 24, 24), rgb(255, 107, 28)) !important;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        .gothic-chain-btn {
          background: rgba(232, 220, 200, 0.04) !important;
          border: 1px solid rgba(212, 192, 160, 0.15) !important;
          font-size: 11px !important;
          letter-spacing: 0.15em !important;
          padding: 10px 16px !important;
        }
        .gothic-account-btn {
          background: rgba(139, 24, 24, 0.15) !important;
          border: 1px solid rgba(139, 24, 24, 0.4) !important;
          font-size: 11px !important;
          letter-spacing: 0.1em !important;
        }
      `}</style>
    </div>
  )
}
