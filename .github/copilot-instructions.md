# AI Agent Instructions for Intl Explorer

## Project Overview
Intl Explorer is an interactive SvelteKit application for experimenting with the ECMAScript Internationalization API (`Intl`). The app provides live playgrounds for each `Intl` method (NumberFormat, DateTimeFormat, etc.) with dynamic option controls, browser compatibility data, and i18n support.

## Architecture & Key Patterns

### Core Structure
- **SvelteKit 5** app with file-based routing deployed on Cloudflare
- **Paraglide.js** for i18n with URL strategy (`$paraglide/messages`)
- **Melt UI** component library with custom preprocessing
- **MDN Browser Compat Data** integration for live compatibility checking
- **Playwright** for E2E testing with custom page object models

### Format Method System
Each `Intl` method has a consistent structure:
```
src/routes/{Method}/          # Route pages
src/lib/components/pages/{Method}.svelte  # Main playground component
src/lib/format-options/{method}.options.ts  # Type-safe option definitions
static/{Method}-compat-data.json  # Generated browser support data
```

The `formatMethods` array in `src/lib/format-methods.ts` drives all method-related functionality.

### Playground Architecture
- **Schema-driven**: Each method defines a `PlaygroundSchema<Method>` with typed options
- **Dynamic validation**: `invalidOptionCombos` prevents incompatible option combinations
- **Live execution**: Real-time `Intl` API calls with error handling and output formatting

### Browser Compatibility Integration
- Run `pnpm update:compat` to regenerate compatibility data from `@mdn/browser-compat-data`
- Data flows: `src/update-compat-data.ts` → `static/*.json` → runtime loading via `loadJson()`
- Conditional loading based on `$settings.showBrowserSupport` store

## Development Workflows

### Essential Commands
```bash
pnpm dev                  # Development server
pnpm update:compat        # Regenerate browser compatibility data
pnpm test:e2e            # Run Playwright tests
pnpm test:gen            # Generate new Playwright tests via codegen
```

### Adding New Intl Methods
1. Add method to `formatMethods` array in `src/lib/format-methods.ts`
2. Create option definitions in `src/lib/format-options/{method}.options.ts`
3. Add to exports in `src/lib/format-options/index.ts`
4. Create route structure: `src/routes/{Method}/+page.svelte`
5. Build playground component in `src/lib/components/pages/{Method}.svelte`
6. Run `pnpm update:compat` to generate compatibility data

### Store Management
- **Reactive stores**: `$store/locales.ts` (URL-derived), `$store/settings.ts` (localStorage-persisted)
- **Locale handling**: Automatically synced with URL params via `getLocaleFromParams()`
- **Settings**: Theme, browser support visibility, accessibility options

### Path Aliases (Critical)
```typescript
$paraglide → ./src/paraglide     # i18n messages
$ui → ./src/lib/components/ui    # Reusable components
$pages → ./src/lib/components/pages  # Route-specific components
$utils → ./src/lib/utils         # Utilities
$store → ./src/lib/store         # Svelte stores
$types → ./src/lib/types         # TypeScript types
```

## Testing Patterns

### Playwright Structure
- **Page Object Model**: `tests/pages/` with `IntlPage`, `PlaygroundPage`, `SettingsPage`
- **Extended fixtures**: Custom test fixtures in `tests/test.ts`
- **Method testing**: Each `Intl` method has dedicated test specs following consistent patterns

### Test Execution
```bash
pnpm test:e2e                    # Run all E2E tests
pnpm test:gen                    # Interactive test generation
NODE_NO_WARNINGS=1 playwright test  # Suppress Node warnings
```

## Internationalization (i18n)

### Paraglide.js Integration
- **Message files**: `messages/{locale}.json` with typed access via `m.messageKey()`
- **URL strategy**: Locale detection from URL parameters
- **Build integration**: Vite plugin auto-generates typed message functions
- **Adding locales**: Update `project.inlang/settings.json` + create message file

### Translation Workflow
1. Add locale to `project.inlang/settings.json`
2. Create `messages/{locale}.json` by copying `en.json`
3. Translate all message keys
4. Test locally with locale URL parameter

## Build & Deployment

### Cloudflare Adapter
- **SSG deployment** with `@sveltejs/adapter-cloudflare`
- **Static assets**: Browser compat data, icons in `static/`
- **Build optimization**: Vite handles code splitting and asset optimization

### Code Quality
- **Linting**: ESLint 9 with Svelte plugin
- **Formatting**: Prettier with Svelte support
- **Commits**: Conventional commits enforced via commitlint + husky
- **Pre-commit**: Format + lint checks

## Common Gotchas

### Svelte 5 Patterns
- Use `$derived` for computed values, `$effect` for side effects
- Props destructuring: `let { prop }: Props = $props()`
- Snippet types for component children slots

### Browser Compatibility
- Always run `pnpm update:compat` after updating `@mdn/browser-compat-data`
- Compatibility data loading is async - handle loading states
- Settings control visibility, not availability of compat data

### Type Safety
- Format options are strictly typed per method
- Playground schemas enforce option validation at compile time
- Use `AllFormatOptions[Method]` and `AllMethods[Method]` types
