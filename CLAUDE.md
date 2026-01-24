# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-level React application built with TypeScript following Feature-Sliced Design (FSD) methodology. The project supports both Webpack and Vite build systems, includes comprehensive testing setup, internationalization (i18n), and uses Redux Toolkit for state management.

## Development Commands

### Running the application

- `npm run start:dev` - Start frontend (Webpack) + backend server
- `npm run start:dev:vite` - Start frontend (Vite) + backend server
- `npm start` - Start frontend only (Webpack dev server on port 3000)
- `npm run start:vite` - Start frontend only (Vite)
- `npm run start:dev:server` - Start backend server only

### Building

- `npm run build:prod` - Production build (minified)
- `npm run build:dev` - Development build (not minified)

### Testing

- `npm run test:unit` - Run Jest unit and component tests
- `npm run test:e2e` - Open Cypress for e2e tests
- `npm run test:ui` - Run Loki screenshot tests
- `npm run test:ui:ok` - Approve new screenshots
- `npm run test:ui:report` - Generate visual test report

### Linting

- `npm run lint:ts` - Check TypeScript files
- `npm run lint:ts:fix` - Fix TypeScript files
- `npm run lint:scss` - Check SCSS files
- `npm run lint:scss:fix` - Fix SCSS files
- `npm run prettier` - Format all files

### Storybook

- `npm run storybook` - Start Storybook on port 6006
- `npm run storybook:build` - Build static Storybook

### Code Generation

- `npm run generate:slice` - Generate FSD slice (see below)
- `npm run remove-feature` - Remove feature flag (see below)

## Architecture: Feature-Sliced Design (FSD)

The project strictly follows FSD methodology with the following layers:

### Layer Structure

```
src/
├── app/          # Application initialization, providers, styles
├── pages/        # Page components (routes)
├── widgets/      # Complex UI blocks (Sidebar, Navbar, etc.)
├── features/     # User interactions and business logic
├── entities/     # Business entities (Article, User, Profile, etc.)
└── shared/       # Reusable code (UI kit, utils, API, configs)
```

### Key Principles

1. **Layers can only import from layers below them**: `app > pages > widgets > features > entities > shared`
2. **Import only from public API**: Each module exports through `index.ts`
3. **Absolute imports**: Use `@/*` alias for all imports from `src/`
4. **No cross-imports within same layer**: Features cannot import other features

### Entities

The app includes these business entities:

- Article - Blog articles with WYSIWYG editing
- Comment - User comments on articles
- User - User authentication and profiles
- Profile - Editable user profiles with ratings
- Notification - In-app notifications
- Rating - Star ratings for articles/profiles
- Country/Currency - Reference data

### Custom ESLint Plugin

The project uses `eslint-plugin-ulbi-tv-plugin` with three FSD-enforcing rules:

- `path-checker` - Prevents absolute imports within same module
- `layer-imports` - Enforces FSD layer hierarchy
- `public-api-imports` - Ensures imports only from public API (has autofix)

## State Management

### Redux Toolkit

- Store configuration: `src/app/providers/StoreProvider`
- Use RTK Query for API calls (see `src/shared/api/rtkApi.ts`)
- Normalize reusable entities with EntityAdapter when possible

### Dynamic Reducer Loading

To avoid bundling all reducers:

```tsx
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';

<DynamicModuleLoader reducers={{ articleDetails: articleDetailsReducer }}>
  {/* Component content */}
</DynamicModuleLoader>;
```

### API Configuration

- Base API: `src/shared/api/rtkApi.ts` using RTK Query
- Backend runs on port 8000 (HTTP) or 8443 (HTTPS if SSL certs available)
- All API requests require Authorization header (stored in localStorage)
- 800ms artificial delay added to simulate real API

## Internationalization (i18n)

- Uses `i18next` and `react-i18next`
- Translation files: `public/locales/{lang}/{namespace}.json`
- ESLint enforces translation usage in markup via `i18next/no-literal-string` rule
- Supported languages: English (en), Russian (ru)

## Feature Flags

### Usage

Use only the `toggleFeatures` helper function:

```typescript
import { toggleFeatures } from '@/shared/lib/features';

const component = toggleFeatures({
  name: 'featureName',
  on: () => <NewComponent />,
  off: () => <OldComponent />
});
```

### Removing Feature Flags

Use the automated script:

```bash
npm run remove-feature featureName on|off
```

This script uses `ts-morph` to automatically remove feature flag code and keep either the `on` or `off` branch.

## UI Components

The project has two UI design systems:

- `src/shared/ui/deprecated/` - Legacy UI components
- `src/shared/ui/redesigned/` - New redesigned UI components

The active design is controlled by feature flags. Common components include:

- Button, Input, Card, Modal, Drawer
- Dropdown, ListBox, Popover
- Stack layouts (HStack, VStack, Flex)
- AppLink, Avatar, Icon, Text
- Skeleton loaders

## Generating FSD Slices

To create a new feature/entity/page with boilerplate:

```bash
npm run generate:slice
# Follow prompts to select layer and enter slice name
```

This generates the full slice structure with UI, model, and public API.

## Testing Strategy

### 1. Unit Tests (Jest)

- Config: `config/jest/jest.config.ts`
- Test files: `*.test.ts(x)` next to source files
- Use React Testing Library for component tests
- Setup file: `config/jest/setupTests.ts`

### 2. Storybook Stories

- Create `*.stories.tsx` files next to components
- Mock API requests with `storybook-addon-mock`
- Config: `config/storybook/`
- Example format shown in README.md

### 3. Visual Regression (Loki)

- Uses Docker Chrome for screenshot consistency
- Configurations for desktop (1366x768) and mobile (iPhone 7)
- Generates HTML reports with `reg-cli`

### 4. E2E Tests (Cypress)

- Run `npm run test:e2e` to open Cypress interface

## Build Systems

### Webpack (Primary)

- Config: `config/build/`
- Plugins: Fork TS Checker, HTML Plugin, Bundle Analyzer
- Supports HMR with React Refresh
- Custom loaders for SVG, SCSS

### Vite (Alternative)

- Config: `vite.config.ts`
- Faster development experience
- Uses same environment variables as Webpack

### Global Variables

Both build systems define:

- `__IS_DEV__` - Development mode flag
- `__API__` - API base URL
- `__PROJECT__` - Project type (storybook/frontend/jest)

## Authentication

Test credentials (all use password `123`):

- **Admin**: `admin` / `123` - Full access
- **User**: `user` / `123` - Basic access
- **Manager**: `manager` / `123` - Manager access
- **Test User**: `testuser` / `123` - Full access

User data stored in `json-server/db.json`

## Pre-commit Hooks

Husky runs lint-staged on commit:

- `prettier --list-different` on all TS/TSX files
- `eslint` on all TS/TSX files

## CI/CD

GitHub Actions config: `.github/workflows/`
Pipeline runs:

- All test types (unit, UI, e2e)
- Project build
- Storybook build
- Linting (TS and SCSS)

## Configuration Locations

- `/config/babel` - Babel configuration (with i18next-extract plugin)
- `/config/build` - Webpack configuration
- `/config/jest` - Jest test environment
- `/config/storybook` - Storybook configuration
- `scripts/` - Utility scripts (slice generation, feature removal, port management)

## Important Notes

- Port 3000: Frontend dev server
- Port 8000: Backend HTTP server
- Port 6006: Storybook
- The backend server includes 800ms delay to simulate real API latency
- Always import from public API (`index.ts`) of modules
- Follow FSD layer hierarchy strictly
- Use `toggleFeatures` for all feature flag logic
- Storybook stories serve as both documentation and visual regression tests
