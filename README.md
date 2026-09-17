# cursor-hackathon

Taxfix Cursor Hackathon Berlin — **Year File** pulse demo.

## Demo path (2 minutes)

1. Open `/` (index is the pulse — not the counter scaffold).
2. Add one expense in plain text (try `coworking day pass` + `45`).
3. Read the instant verdict, why, and rough € YTD impact.
4. Watch **Filing confidence** tick up; expense lands in the Year File.
5. Note the return hook: come back next month for the score — no nags.

Counter scaffold remains at `/counter`.

## How to run

```bash
pnpm install
pnpm dev
```

Node `>=24 <25`. Package manager: `pnpm@11` (see `package.json`).

Do **not** have agents start the long-lived `pnpm run dev` if Sal already has it running.

## Pitch VIDEO script (~2:00)

**0:00–0:15 — Hook**  
"Filing season is a panic product. We built the opposite: Year File — taxes year-round, on your terms."

**0:15–0:45 — Problem**  
"People ignore deductibles until April, then scramble. Anxious apps nag. We want financially savvy control — clever, not guilty."

**0:45–1:20 — Demo**  
Screen: open `/`. Type expense → instant "likely / maybe / unlikely", plain why, rough € impact YTD. Confidence grows. Saved to Year File.

**1:20–1:45 — Why return**  
"No streaks. No fake urgency. The reason to come back is the score next month — a dossier that makes April boring in a good way."

**1:45–2:00 — Agents + close**  
"Built with Cursor + a small agent trail: Hackermans scoped, Sapne co-drive, Cursor Agent shipped the pulse. One vertical slice. That's the point."

## Agent trail

See [`HOW-WE-BUILT.md`](./HOW-WE-BUILT.md).

## Scope freeze

Only the Year File deductible pulse. No notifications, streaks, filing-only tools, or architecture tours.
