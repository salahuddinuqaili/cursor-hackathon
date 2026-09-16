# Live check results

Hackermans fills this after agent LIVE acks. Scaffold outside this folder is ignored.

## Summary

- checked_at: '"$ts"'
- required LIVE: hackermans, cursor, ivan, titans
- required DOWN: (none)
- on-call LIVE: coder, feedback, grokker
- verdict: FULL GREEN — Grok Bot pod live; Titans parallel value proved

## Agent acks

### hackermans
LIVE — war-room lead; clock/scope/demo.

### cursor
LIVE — Cursor co-drive/credits lane; packs ready; co-drive when Sal allows.

### ivan
LIVE: ivan
role: Hermes HQ — orchestrate Hermes default → Titans on Sapne (monitor only; default mutates)
ready: yes

### titans (value smoke)
6/6 parallel Heavy seats DONE (~1 min wall clock). Parallel value proved.
- titan1 clock: Split 19:00–21:15 into 19:00–19:15 scope-and-spike, 19:15–20:30 core build, 20:30–21:00 polish-and-demo, and 21:00–21:15 freeze-and-submit so you never miss the cutoff.
- titan2 demo pitfalls: The top pitfalls for a 2–3 minute Taxfix hackathon demo are burning the clock on setup or login, hitting a live API or network failure with no recorded fallback, and narrating architecture instead of showing one crisp user-value punchline.
- titan3 Node24+pnpm: Before coding, verify that Node.js 24 is the active runtime (`node -v`) and that pnpm is installed and selected (`pnpm -v` or corepack) so installs and scripts use the matching toolchain.
- titan4 ruthless scope: Ship one demoable path in two hours and refuse every extra feature, polish pass, and abstraction that does not unstick that path.
- titan5 credit fail path: If organizer Cursor credits do not redeem, abort the credit path and surface the redemption failure without charging a fallback payment method.
- titan6 3rd-human: A third human at check-in often unlocks the prize lane because many events only award a complete three-person team.
Cards: t_30c85c7e…t_be9392cf all done.

### coder
LIVE — production code/architecture/security on-call.

### feedback
LIVE — research/specs on-call; no production code or external publish.

### grokker
LIVE — fleet ops/usage hygiene; quiet by default.
