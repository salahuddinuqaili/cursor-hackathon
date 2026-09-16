---
name: test-filtering
description: Filter tests by name, file patterns, and tags
---

# Test Filtering

## CLI Filtering

### By File Path

```bash
# Run files containing "user"
pnpm exec vitest user

# Multiple patterns
pnpm exec vitest user auth

# Specific file
pnpm exec vitest src/user.test.ts

# By line number
pnpm exec vitest src/user.test.ts:25
```

### By Test Name

```bash
# Tests matching pattern
pnpm exec vitest -t "login"
pnpm exec vitest --testNamePattern "should.*work"

# Regex patterns
pnpm exec vitest -t "/user|auth/"
```

## Changed Files

```bash
# Uncommitted changes
pnpm exec vitest --changed

# Since specific commit
pnpm exec vitest --changed HEAD~1
pnpm exec vitest --changed abc123

# Since branch
pnpm exec vitest --changed origin/main
```

## Related Files

Run tests that import specific files:

```bash
pnpm exec vitest related src/utils.ts src/api.ts --run
```

Useful with lint-staged:

```js
// .lintstagedrc.js
export default {
  '*.{ts,tsx}': 'pnpm exec vitest related --run',
}
```

## Focus Tests (.only)

```ts
test.only('only this runs', () => {})

describe.only('only this suite', () => {
  test('runs', () => {})
})
```

In CI, `.only` throws error unless configured:

```ts
defineConfig({
  test: {
    allowOnly: true, // Allow .only in CI
  },
})
```

## Skip Tests

```ts
test.skip('skipped', () => {})

// Conditional
test.skipIf(process.env.CI)('not in CI', () => {})
test.runIf(!process.env.CI)('local only', () => {})

// Dynamic skip
test('dynamic', ({ skip }) => {
  skip(someCondition, 'reason')
})
```

## Tags

Tags must be declared in config, then applied to tests/suites and filtered with a tag expression:

```ts
// vitest.config.ts
defineConfig({
  test: {
    tags: [{ name: 'db' }, { name: 'slow' }, { name: 'flaky' }],
  },
})

// test file
test('database test', { tags: ['db'] }, () => {})
```

```bash
pnpm exec vitest --tagsFilter "db && !flaky"
pnpm exec vitest --tagsFilter "unit || e2e"
pnpm exec vitest --list-tags            # show defined tags
```

Full syntax, priority, and per-tag options: see [features-test-tags](features-test-tags.md).

## Include/Exclude Patterns

```ts
defineConfig({
  test: {
    // Test file patterns
    include: ['**/*.{test,spec}.{ts,tsx}'],
    
    // Exclude patterns
    exclude: [
      '**/node_modules/**',
      '**/e2e/**',
      '**/*.skip.test.ts',
    ],
    
    // Include source for in-source testing
    includeSource: ['src/**/*.ts'],

    // Scope discovery to a directory (faster than broad excludes)
    dir: './src',
  },
})
```

> v4 simplified default `exclude` to only `node_modules`/`.git`. Prefer `test.dir` to limit where tests are found; spread `configDefaults.exclude` to restore the old excludes.

## Watch Mode Filtering

In watch mode, press:
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `a` - Run all tests
- `f` - Run only failed tests

## Projects Filtering

Run specific project:

```bash
pnpm exec vitest --project unit
pnpm exec vitest --project integration --project e2e
```

## Environment-based Filtering

```ts
const isDev = process.env.NODE_ENV === 'development'
const isCI = process.env.CI

describe.skipIf(isCI)('local only tests', () => {})
describe.runIf(isDev)('dev tests', () => {})
```

## Combining Filters

```bash
# File pattern + test name + changed
pnpm exec vitest user -t "login" --changed

# Related files + run mode
pnpm exec vitest related src/auth.ts --run
```

## List Tests Without Running

```bash
pnpm exec vitest list                 # Show all test names
pnpm exec vitest list -t "user"       # Filter by name
pnpm exec vitest list --filesOnly     # Show only file paths
pnpm exec vitest list --json          # JSON output
```

## Key Points

- Use `-t` for test name pattern filtering
- `--changed` runs only tests affected by changes
- `--related` runs tests importing specific files
- Tags provide semantic test grouping
- Use `.only` for debugging, but configure CI to reject it
- Watch mode has interactive filtering

<!-- 
Source references:
- https://vitest.dev/guide/filtering.html
- https://vitest.dev/guide/cli.html
-->
