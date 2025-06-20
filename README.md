# Eventful

> **Eventful** is an on‑chain ticketing system that mints verifiable NFTs, collects required attendee data via **Smart Wallet Profiles**, and settles payments in USDC on Base —all in a single signed transaction.

---

## ✨ Why Eventful?

| Pain‑point                            | Typical Status‑Quo                     | How Eventful fixes it                                  |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Shipping / KYC data for ticket buyers | Extra Web 2 form or custodial KYC flow | Wallet prompts once, data bundled in tx via Profiles   |
| Gas onboarding for non‑crypto users   | Confusing ETH top‑ups                  | Paymaster abstracts gas—pay in USDC only               |
| Fraudulent / duplicated tickets       | QR images can be copied                | On‑chain NFT ticket bound to the buyer’s wallet        |
| Compliance (MiCA, FATF R‑16)          | Manual CSV exports & audits            | Travel‑Rule fields collected + forwarded automatically |

---

## 🏗  Architecture Overview

```
Browser
  │  (wallet_sendCalls)
  ▼
Coinbase Smart Wallet ———► Profiles Callback  (Next.js API Route)
              │                  │
              │  signed tx       │  POST PII JSON
              ▼                  ▼
  Base  NFT Ticket Contract    Postgres (orders, profiles)
```

* **Frontend:** Next.js 15 App Router + wagmi/viem + shadcn/ui
* **Smart Contracts:** Solidity (ERC‑721 & ERC‑721 soulbound) + EIP‑4337 entry point + paymaster
* **Database:** Neon Postgres via Prisma for off‑chain order metadata
* **Auth:** Clerk (organiser login) – end‑users rely entirely on Wallet auth

---

## 🚀  Getting Started

### Prerequisites

| Tool                  | Version             |
| --------------------- | ------------------- |
| Node.js               | ≥ 20.0              |
| pnpm                  | ≥ 9.0               |
| Foundry               | latest              |
| Base Sepolia endpoint | Alchemy/Ankr/Infura |

### Installation

```bash
# 1. Clone
$ git clone https://github.com/your‑org/eventful.git
$ cd eventful

# 2. Install packages
$ pnpm install

# 3. Copy env and fill values
$ cp .env.example .env.local

# 4. Start all dev services
$ pnpm dev        # Next.js
$ pnpm chain      # Anvil (local fork)
$ pnpm deploy:local
```

### Environment Variables (`.env.local`)

```
DATABASE_URL=postgres://...
NEXT_PUBLIC_ALCHEMY_URL=https://...
NEXT_PUBLIC_BASE_EXPLORER=https://sepolia.basescan.org
PAYMASTER_ADDRESS=0x...
PROFILE_CALLBACK_SECRET=supersecret
```

---

## 🔑  Smart Wallet Profiles Flow

1. Frontend constructs an `executeCalls` array containing the NFT mint call *plus* a `dataCallback` capability:

```ts
const calls = [
  {
    to: EVENTFUL_CONTRACT,
    data: nftInterface.encodeFunctionData('mintTicket', [eventId, tierId]),
  },
];

const capabilities = [
  {
    type: 'dataCallback',
    callbackUrl: 'https://api.eventful.xyz/profile',
    fields: ['name', 'email', 'phone'],
  },
];

walletClient.sendCalls({ calls, capabilities });
```

2. **Wallet** prompts the buyer for the missing fields.
3. **Backend** validates JSON, stores encrypted blob, returns `calls` unchanged → wallet signs.
4. **Contract** emits `TicketMinted` with profile hash.

---

## 🧪  Testing

```
# Contract unit tests
forge test -vv

# End‑to‑end happy‑path (Playwright)
pnpm test:e2e
```

---

## ☁️  Deployment

```bash
# Deploy contracts to Base mainnet
forge script scripts/Deploy.s.sol \
  --rpc-url $BASE_MAINNET \
  --broadcast --verify

# Push frontend
pnpm build && pnpm dlx vercel --prod
```

---

## 🎫  Example Usage

```bash
curl -X POST https://api.eventful.xyz/events \
  -H "Authorization: Bearer <organiser_api_key>" \
  -d '{
    "name": "ETH Lagos 2025",
    "ticketPrice": "25",
    "currency": "USDC",
    "soulbound": true
  }'
```

---

## 🤝  Contributing

1. Fork & PR to `develop`
2. Follow the Conventional Commits spec (`feat:`, `fix:` …)
3. Run `pnpm format` before pushing

---

## 📜  License

MIT © 2025 Eventful contributors

4. Vercel deploys the latest version from this repository
