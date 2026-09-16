---
name: vitest-cli
description: Command line interface commands and options
---

# Command Line Interface

## Commands

### `vitest`

Start Vitest in watch mode (dev) or run mode (CI):

```bash
pnpm exec vitest                    # Watch mode in dev, run mode in CI
pnpm exec vitest foobar             # Run tests containing "foobar" in path
pnpm exec vitest basic/foo.test.ts:10  # Run specific test by file and line number
```

### `pnpm exec vitest run`

Run tests once without watch mode:

```bash
pnpm exec vitest run
pnpm exec vitest run --coverage
```

### `pnpm exec vitest watch`

Explicitly start watch mode:

```bash
pnpm exec vitest watch
```

### `pnpm exec vitest related`

Run tests that import specific files (useful with lint-staged):

```bash
pnpm exec vitest related src/index.ts src/utils.ts --run
```

### `pnpm exec vitest bench`

Run only benchmark tests:

```bash
pnpm exec vitest bench
```

### `pnpm exec vitest list`

List all matching tests without running them:

```bash
pnpm exec vitest list                    # List test names
pnpm exec vitest list --json             # Output as JSON
pnpm exec vitest list --filesOnly        # List only test files
```

### `pnpm exec vitest init`

Initialize project setup:

```bash
pnpm exec vitest init browser            # Set up browser testing
```

### `pnpm exec vitest --list-tags`

List tags defined in config without running tests:

```bash
pnpm exec vitest --list-tags             # Human-readable list
pnpm exec vitest --list-tags=json        # JSON output
```

## Common Options

```bash
# Configuration
--config <path>           # Path to config file
--project <name>          # Run specific project

# Filtering
--testNamePattern, -t     # Run tests matching pattern
--tagsFilter <expr>       # Run tests by tag expression, e.g. "db && !flaky"
--changed                 # Run tests for changed files
--changed HEAD~1          # Tests for last commit changes
--dir <path>              # Limit test discovery to a directory

# Reporters
--reporter <name>         # default, verbose, tree, dot, json, html, junit, minimal, blob
--reporter=json --outputFile=report.json

# Coverage
--coverage                # Enable coverage
--coverage.provider v8    # Use v8 provider
--coverage.reporter text,html

# Execution
--shard <index>/<count>   # Split tests across machines
--bail <n>                # Stop after n failures
--retry <n>               # Retry failed tests n times
--shuffle                 # Randomize test order
--no-file-parallelism     # Run test files one at a time

# Watch mode
--no-watch                # Disable watch mode
--standalone              # Start without running (v4: runs matched files if a filter is passed)

# Environment
--environment <env>       # jsdom, happy-dom, node
--globals                 # Enable global APIs

# Debugging
--inspect                 # Enable Node inspector
--inspect-brk             # Break on start

# Output
--silent                  # Suppress console output
--no-color                # Disable colors
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage"
  }
}
```

## Sharding for CI

Split tests across multiple machines. The blob reporter writes to `.vitest/blob/` by default:

```bash
# Machine 1
pnpm exec vitest run --shard=1/3 --reporter=blob --outputFile=reports/blob-1.json

# Machine 2
pnpm exec vitest run --shard=2/3 --reporter=blob --outputFile=reports/blob-2.json

# Merge all blobs into a final report
pnpm exec vitest --merge-reports=reports --reporter=junit --reporter=default
```

## Watch Mode Keyboard Shortcuts

In watch mode, press:
- `a` - Run all tests
- `f` - Run only failed tests
- `u` - Update snapshots
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `q` - Quit

## Key Points

- Watch mode is default in dev, run mode in CI (when `process.env.CI` is set)
- Use `--run` flag to ensure single run (important for lint-staged)
- Both camelCase (`--testTimeout`) and kebab-case (`--test-timeout`) work
- Boolean options can be negated with `--no-` prefix
- Filter tests by tag with `--tagsFilter` (tags must be declared in config) — see [features-test-tags](features-test-tags.md)
- `--merge-reports` and `--reporter=blob` do not work in watch mode

<!-- 
Source references:
- https://vitest.dev/guide/cli.html
-->
