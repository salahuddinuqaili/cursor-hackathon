# Run on Sapne (machineId 4be467d3-c9a0-430a-b9c1-d726bf7a9e9f)
# Applies Year File pulse into existing checkout WITHOUT recloning.
$ErrorActionPreference = "Stop"
$Repo = "C:\Users\salahuddin\projects\cursor-hackathon"
Set-Location $Repo

git fetch origin 2>$null
git checkout -B year-file-pulse 2>$null
git remote remove sal-fork 2>$null
git remote add sal-fork https://github.com/salahuddinuqaili/cursor-hackathon.git
git fetch sal-fork year-file-pulse
git merge --ff-only sal-fork/year-file-pulse

Write-Host "Applied year-file-pulse. Open / after pnpm install (if needed). Do NOT start pnpm dev if already running."
Write-Host "Verify: pnpm exec biome check --write app/features/year-file app/routes.ts README.md HOW-WE-BUILT.md; pnpm run typecheck; pnpm run verify"
