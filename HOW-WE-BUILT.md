# How we built this (agent trail)

Honest jury note for **Cursor Hackathon Berlin @ Taxfix** — Year File pulse slice.

## Multi-agent orchestration (real, not cosplay)

1. **Hackermans** scoped the challenge ruthlessly: voluntary Year File engagement outside filing season; one pulse only — *Is this deductible?*
2. **Grok Bot (executor)** was tasked to co-drive **Sapne** (`machineId 4be467d3-…`) on the existing checkout `C:\Users\salahuddin\projects\cursor-hackathon` — no fresh clone, Sal vetoes publish.
3. **Cursor Agent / Composer** (on Sapne’s running Cursor) is the primary IDE surface for the pulse UI; this bot prepared the vertical slice and agent trail so the laptop/Sapne player can land a clickable `/` demo fast.
4. **Sal** keeps veto on submit/demo. Humans stay in the loop; agents do not spam urgency.

No fake swarm. No notification/streak product. Orchestration = clear roles + one demo path.

## What shipped

- Index route `/` → Year File pulse (replaces counter as default).
- Add expense (text) → instant plain verdict + why + rough € YTD impact (keyword heuristic).
- Persist Year File + filing confidence in `localStorage`.
- Return reason: open next month to see the score (clever, not nagging).
- In-app “Built with Cursor + agents” beat on the pulse screen.

## How to run (Sapne)

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5173/` — first load is the pulse.

Agents must not start `pnpm run dev` (assume Sal/Eugene already has it). Handoff gate: `pnpm run verify` (no Playwright).
