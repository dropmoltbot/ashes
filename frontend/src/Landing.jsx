import React from 'react'
import { motion } from 'framer-motion'
import { AshesLogo, FlameIcon, UrnIcon, SkullIcon, CrownIcon, DividerSvg } from './Icons'

const fadeUpStagger = i => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 * i, duration: 0.7, ease: [0.4, 0, 0.2, 1] }
})

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Deposit', icon: <UrnIcon size={28} />, desc: 'Lock your crypto in the contract. Set a timeout and a beneficiary — your heir.' },
    { num: '02', title: 'Perform Rituals', icon: <FlameIcon size={28} />, desc: 'Check in before the deadline to reset the countdown. Prove you are still alive.' },
    { num: '03', title: 'The Heir Inherits', icon: <CrownIcon size={28} />, desc: 'If you stop your rituals, your beneficiary claims everything automatically.' }
  ]
  return (
    <motion.section
      initial="initial" animate="animate"
      style={{ padding: '60px 0', maxWidth: 760, margin: '0 auto' }}
    >
      <motion.h2 {...fadeUpStagger(0)} className="font-gothic" style={{ fontSize: 22, textAlign: 'center', color: 'var(--bone-dim)', marginBottom: 8, letterSpacing: '0.2em' }}>HOW IT WORKS</motion.h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <DividerSvg width={140} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {steps.map((s, i) => (
          <motion.div key={s.num} {...fadeUpStagger(i + 1)}
            style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}
            whileHover={{ y: -4, borderColor: 'rgba(212,192,160,0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ minWidth: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'rgba(139,24,24,0.15)', color: 'var(--blood-bright)' }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="font-mono" style={{ fontSize: 11, color: 'var(--bone-fade)', letterSpacing: '0.2em' }}>{s.num}</span>
                <h3 className="font-gothic" style={{ fontSize: 16, color: 'var(--bone)', letterSpacing: '0.15em' }}>{s.title}</h3>
              </div>
              <p style={{ marginTop: 10, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 15, color: 'var(--bone-dim)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function WhyItMatters() {
  const stats = [
    { value: '$140B+', label: 'crypto permanently locked from lost keys' },
    { value: '0', label: 'lawyers, custodians, or middlemen required' },
    { value: '∞', label: 'trustless, onchain, forever' }
  ]
  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
      style={{ maxWidth: 760, margin: '40px auto', padding: '40px 0', textAlign: 'center' }}
    >
      <h2 className="font-gothic" style={{ fontSize: 22, color: 'var(--bone-dim)', marginBottom: 32, letterSpacing: '0.2em' }}>WHY IT MATTERS</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.15, duration: 0.6 }}
            style={{ flex: 1, minWidth: 200, background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, backdropFilter: 'blur(10px)' }}
            whileHover={{ y: -4, borderColor: 'rgba(255,107,28,0.3)' }}
          >
            <div className="font-gothic" style={{ fontSize: 32, color: 'var(--ember)', fontWeight: 800, marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: 'var(--bone-dim)' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function SocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
      style={{ textAlign: 'center', padding: '40px 20px 20px' }}
    >
      <p className="font-mono" style={{ fontSize: 10, color: 'var(--bone-fade)', letterSpacing: '0.3em', marginBottom: 16 }}>BUILT AT</p>
      <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <a href="https://monad.xyz" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 600, letterSpacing: '0.1em',
            color: 'var(--bone-dim)', textDecoration: 'none'
          }}>
            ◈ MONAD
          </a>
        </motion.div>
        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <a href="https://buildanything.so/hackathons/spark" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.1em',
            color: 'var(--bone-dim)', textDecoration: 'none'
          }}>
            BUILD·ANYTHING SPARK
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Landing() {
  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <HowItWorks />
      <WhyItMatters />
      <SocialProof />
    </div>
  )
}

export default Landing
