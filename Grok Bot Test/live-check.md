# Live check

| agent | status | ready | note | checked_at |
| --- | --- | --- | --- | --- |
| hackermans | LIVE | yes | war-room lead | '"$ts"' |
| cursor | LIVE | yes | credits/playbook/Eugene prompts | '"$ts"' |
| ivan | LIVE | yes | Hermes HQ; Titans smoke done | '"$ts"' |
| titans | LIVE | yes | 6/6 Heavy parallel ~1 min | '"$ts"' |
| coder | LIVE | yes | production on-call | '"$ts"' |
| feedback | LIVE | yes | research/specs on-call | '"$ts"' |
| grokker | LIVE | yes | fleet hygiene | '"$ts"' |

## Titans value smoke

6/6 parallel Heavy seats DONE (~1 min wall clock). Cards t_30c85c7e…t_be9392cf done.

- [x] titan1 clock: Split 19:00–21:15 into 19:00–19:15 scope-and-spike, 19:15–20:30 core build, 20:30–21:00 polish-and-demo, 21:00–21:15 freeze-and-submit.
- [x] titan2 demo pitfalls: Don’t burn clock on setup/login; don’t depend on live API with no fallback; don’t narrate architecture — show one crisp user-value punchline.
- [x] titan3 Node24+pnpm: Verify Node 24 (`node -v`) and pnpm (`pnpm -v` / corepack) before coding.
- [x] titan4 ruthless scope: One demoable path in two hours; refuse extras that don’t unstick that path.
- [x] titan5 credit fail path: If organizer credits fail, abort credit path and surface failure without charging a fallback payment method.
- [x] titan6 3rd-human: Third human unlocks prize lane when events require a complete three-person team.
