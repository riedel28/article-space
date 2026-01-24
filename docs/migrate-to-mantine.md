# Mantine v8 Migration Plan

## Overview
Migrate the project's custom SCSS-based UI component system to Mantine v8. Remove all deprecated components, the `isAppRedesigned` feature flag, and the orange theme. Consolidate to Mantine's built-in light/dark color scheme.

---

## Phase 1: Branch Setup & Dependencies

1. Create and checkout branch `feature/mantine-migration` from `develop`
2. Install dependencies:
   ```bash
   npm install @mantine/core @mantine/hooks
   npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars
   ```
3. Create `postcss.config.cjs`:
   ```js
   module.exports = {
     plugins: {
       'postcss-preset-mantine': {},
       'postcss-simple-vars': {
         variables: {
           'mantine-breakpoint-xs': '36em',
           'mantine-breakpoint-sm': '48em',
           'mantine-breakpoint-md': '62em',
           'mantine-breakpoint-lg': '75em',
           'mantine-breakpoint-xl': '88em',
         },
       },
     },
   };
   ```

---

## Phase 2: Theme & Provider Setup

### Files to modify/create:
- **Create** `src/shared/config/mantine/theme.ts` - Mantine theme config
- **Modify** `src/app/providers/ThemeProvider/ui/ThemeProvider.tsx` - Replace with MantineProvider
- **Modify** `src/shared/lib/hooks/useTheme/useTheme.ts` - Use `useMantineColorScheme`
- **Modify** `src/app/styles/index.scss` - Remove theme imports, keep layout styles
- **Modify** app entry - Import `@mantine/core/styles.css`
- **Delete** `src/app/styles/themes/orange.scss`

### Theme mapping:
```typescript
// src/shared/config/mantine/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'cyan',
  fontFamily: '"Nunito Sans", sans-serif',
  headings: { fontFamily: '"Roboto", sans-serif' },
  defaultRadius: 'md',
  colors: {
    accent: ['#e0f7ff', '#b3ecff', '#80e0ff', '#4dd4ff', '#1ac8ff', '#00c8ff', '#00a3d1', '#007ea3', '#005975', '#003447'],
  },
});
```

### Provider replacement:
```typescript
// ThemeProvider.tsx
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '@/shared/config/mantine/theme';

export const ThemeProvider = ({ children }) => (
  <MantineProvider theme={theme} defaultColorScheme="light">
    {children}
  </MantineProvider>
);
```

---

## Phase 3: Component Migration (Bottom-Up)

Strategy: Create thin wrapper components that preserve the existing API but use Mantine internally. This minimizes changes to 47+ consumer files.

### Tier 1: Leaf Components

| Component | Mantine Equivalent | Key Prop Mappings |
|-----------|-------------------|-------------------|
| Button | `Button` | `variant: clear→subtle, filled→filled, outline→outline`; `addonLeft→leftSection`; `color: success→green, error→red` |
| Input | `TextInput` | `onChange(string)` → adapter from `onChange(event)`; `addonLeft→leftSection`; `readonly→readOnly` |
| Card | `Card` | `variant: outlined→withBorder`; `padding: 0/8/16/24 → 0/xs/sm/md`; `border: round→xl, normal→md` |
| Text | `Text` + `Title` | `title` prop renders `<Title>`, `text` prop renders `<Text>`; `variant→c (color)`; `bold→fw={700}` |
| Skeleton | `Skeleton` | `border→radius` |
| Overlay | `Overlay` | API nearly identical |
| Avatar | `Avatar` | Direct replacement with fallback support |

### Tier 2: Composite Components

| Component | Mantine Equivalent | Notes |
|-----------|-------------------|-------|
| Modal | `Modal` | `isOpen→opened`; remove custom Portal/Overlay/useModal |
| Drawer | `Drawer` | `isOpen→opened`, `position="bottom"`; removes spring animations |
| Tabs | `Tabs` | Map `TabItem[]` to `Tabs.List > Tabs.Tab` compound pattern |
| Stack/HStack/VStack | `Stack`/`Group`/`Flex` | `gap: "16"→16`; `justify: "between"→"space-between"` |
| Dropdown | `Menu` | Map items array to `Menu.Item` children |
| ListBox | `Select` | Map `ListBoxItem[]` to Select data format |
| Popover | `Popover` | Map trigger/content to Target/Dropdown pattern |

### Keep Custom (no Mantine equivalent):
- **AppLink** - Router-aware, keep with simplified styling
- **Icon** - SVG import pattern; use `ActionIcon` for clickable variant
- **AppImage** - Loading/error states for images
- **AppLogo** - Brand-specific
- **Portal** - Thin `createPortal` wrapper
- **Code** - Simple code display with copy

---

## Phase 4: Feature Flag Removal

### Files to update (~12 files):
1. Remove `isAppRedesigned` from `src/shared/types/featureFlags.ts`
2. For all `<ToggleFeatures feature="isAppRedesigned">` usages - keep only the `on` branch
3. For all `toggleFeatures({ name: 'isAppRedesigned' })` calls - keep only the `on` result
4. Delete `src/features/uiDesignSwitcher/` entirely
5. Delete storybook decorators: `FeaturesFlagsDecorator`, `NewDesignDecorator`

---

## Phase 5: Consumer File Updates (47+ files)

Since wrappers preserve the existing API, most consumers need only:
1. Import path updates (if any change)
2. Removal of `ToggleFeatures`/`toggleFeatures` for `isAppRedesigned`
3. Removal of deprecated component imports → use new unified imports

### High-impact consumers:
- `src/entities/Rating/ui/RatingCard/RatingCard.tsx`
- `src/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard.tsx`
- `src/entities/Article/ui/ArticleDetails/ArticleDetails.tsx`
- `src/features/AuthByUsername/ui/LoginForm/LoginForm.tsx`
- `src/entities/Profile/ui/ProfileCardRedesigned/ProfileCardRedesigned.tsx`

---

## Phase 6: Storybook & Test Updates

### Storybook:
- Update `config/storybook/preview.js` - Add MantineProvider decorator, remove theme addon
- Update `ThemeDecorator` - Use `forceColorScheme` instead of class-based themes
- Delete all 13 deprecated component stories
- Update remaining stories to remove `NewDesignDecorator`/`FeaturesFlagsDecorator`

### Tests:
- Update `src/shared/lib/tests/componentRender/componentRender.tsx` - Add MantineProvider
- Update Jest config - Mock `@mantine/core/styles.css`
- Delete `src/shared/ui/deprecated/Button/Button.test.tsx`
- Update `Sidebar.test.tsx` for new component structure
- Preserve `data-testid` attributes in wrappers for existing test compatibility

---

## Phase 7: Cleanup

### Delete directories:
- `src/shared/ui/deprecated/` (entire directory)
- `src/shared/ui/shadcn/` (unused stubs)
- `src/features/uiDesignSwitcher/`
- `src/shared/lib/components/AnimationProvider/`

### Delete files:
- All `.module.scss` files for migrated components (~15 files)
- `src/app/styles/themes/orange.scss`
- `src/shared/lib/hooks/useModal/useModal.tsx`

### Remove dependencies:
```bash
npm uninstall @headlessui/react @react-spring/web @use-gesture/react
```

### Keep:
- `classNames` utility (still used by layouts/pages)
- Webpack SCSS loader (for remaining layout styles)
- `src/shared/const/theme.ts` - Replace `Theme` enum with `type ColorScheme = 'light' | 'dark'`

---

## Phase 9: Verification

```bash
npm run build:prod        # Production build succeeds
npm run build:dev         # Dev build succeeds
npm run lint:ts           # No new lint errors
npm run lint:scss         # No SCSS errors
npm run test:unit         # All unit tests pass
npm run storybook:build   # Storybook builds
npm run start:dev         # Manual verification:
                          #   - Light/dark switching works
                          #   - All pages render correctly
                          #   - Modal/Drawer behavior correct
                          #   - Forms (login, profile) work
                          #   - Sidebar collapse works
```

---

## Summary

| Metric | Count |
|--------|-------|
| Files modified | ~110 |
| Files deleted | ~60 |
| Files created | ~3 |
| Dependencies added | 2 runtime + 3 dev |
| Dependencies removed | 3 |
| Components migrated to Mantine | 17 |
| Components kept custom | 6 |
| Consumer files updated | 47+ |
