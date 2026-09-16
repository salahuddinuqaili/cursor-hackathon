# Live check results

Hackermans fills this after agent LIVE acks. Scaffold outside this folder is ignored.

## Summary

- checked_at: '"$ts"'
- required LIVE: hackermans, cursor
- required PENDING: ivan, titans
- on-call LIVE: coder, feedback, grokker
- verdict: Grok Bot pod mostly green; Titans value smoke still open

## Agent acks

### hackermans
LIVE — war-room lead; clock/scope/demo; running this check.

### cursor
LIVE: cursor
role: Cursor co-drive/credits lane — organizer credit checklist, Composer/Agent playbook, Eugene paste prompts; co-drive only when Sal allows
ready: yes

### ivan
PENDING — LIVE check + Titans Heavy parallel smoke requested.

### titans (value smoke)
PENDING — Sal priority; awaiting concrete parallel outputs from ivan.

### coder
LIVE: coder
role: production code / architecture / security on-call — implement from feedback specs when called
ready: yes

### feedback
LIVE: feedback
role: research/on-call — thin digests, primary-source checks, specs for coder; no production code or external publish
ready: yes

### grokker
LIVE: grokker
role: fleet ops / usage hygiene — quiet unless dead bots, auth breaks, or Sal asks
ready: yes
