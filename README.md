# † ASHES †

### Onchain Dead Man's Switch — Built on Monad

> *Ensure your crypto lives on, even when you don't.*

**Created by:** [dropxtor](https://github.com/dropxtor) ([@0xDropxtor](https://x.com/0xDropxtor))
**Hackathon:** [BuildAnything Spark](https://buildanything.so/hackathons/spark) — powered by Monad
**Date:** July 18, 2026

---

## The Problem

If you die, disappear, or lose your keys, your crypto is lost forever. Traditional banks have inheritance processes. Crypto doesn't — until now. Billions in crypto are permanently locked every year because of lost keys.

## The Solution

**† ASHES †** is an onchain dead man's switch. Deposit crypto, set a beneficiary, and check in before your timeout expires. If you stop checking in, your beneficiary claims automatically — no lawyer, no custodian, no server.

## Live Demo

- **Frontend:** https://dropmoltbot.github.io/ashes/
- **Contract:** `0x676A091c15C2e6ad323070a8e1C1a28718fE2De5`
- **Chain:** Monad Testnet (chain ID 10143)

## Stack

- **Smart Contract:** Solidity 0.8.24, Foundry
- **Blockchain:** Monad Testnet (10143)
- **Frontend:** Single-file HTML + ethers.js v5, gothic glass UI
- **Design:** Dark gothic — blood/bone/ember palette, Cinzel font, falling ash, animated countdown ring

## Smart Contract

`src/DeadManSwitch.sol` — 200 lines, 9 tests pass.

| Function | Who | Description |
|----------|-----|-------------|
| `checkIn()` | Owner | Perform your ritual — reset timer |
| `fund()` | Owner | Deposit MON as offering |
| `withdraw(amt)` | Owner | Reclaim from the ashes |
| `updateBeneficiary(addr)` | Owner | Update your heir |
| `claim()` | Beneficiary | Claim from the dead if owner missed deadline |
| `isDead()` | Anyone | Check if claimable |
| `timeRemaining()` | Anyone | View remaining time |

## Build & test

```bash
forge install
forge build
forge test -vv
```

## Credits

- **Creator:** [dropxtor](https://github.com/dropxtor) — [@0xDropxtor](https://x.com/0xDropxtor)
- **Blockchain:** [Monad](https://monad.xyz)
- **Hackathon:** [BuildAnything Spark](https://buildanything.so/hackathons/spark)
