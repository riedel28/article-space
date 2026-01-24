# Plan: Remove SCSS, Use CSS Modules with PostCSS

## Overview

Replace all SCSS files with plain CSS modules. The project already has `postcss-preset-mantine` configured which provides nesting support (via `postcss-nested`), so no SCSS-specific features are needed. The codebase only uses SCSS for nesting and `//` comments — no $variables, @mixin, @extend, or @include.

**Scope:** 42 SCSS files → 42 CSS files, ~39 TypeScript import updates, 5 config files

---

## Phase 1: Config Updates

### 1.1 Webpack CSS loader (`config/build/loaders/buildCSSLoader.ts`)
- Change regex: `/\.s[ac]ss$/i` → `/\.css$/i`
- Remove `'sass-loader'` from the `use` array
- Add `'postcss-loader'` (needed for PostCSS processing in webpack — nesting, Mantine preset)
- Keep CSS modules `auto` function: update `.module.` check (stays the same — still matches `.module.css`)

### 1.2 Storybook config (`config/storybook/main.ts`)
- Already uses `buildCSSLoader(true)` — will work after the loader update

### 1.3 Jest config (`config/jest/jest.config.ts`)
- Change moduleNameMapper: `'\\.s?css$'` → `'\\.css$'`

### 1.4 Type declarations (`src/app/types/global.d.ts`)
- Replace `declare module '*.module.scss'` → `declare module '*.module.css'`
- Replace `declare module '*.scss'` → `declare module '*.css'`

### 1.5 Stylelint (`.stylelintrc.json`)
- Change extends: `"stylelint-config-standard-scss"` → `"stylelint-config-standard"`
- Remove/update any SCSS-specific rules

### 1.6 PostCSS config (`postcss.config.cjs`)
- Already configured with `postcss-preset-mantine` (provides nesting) — no changes needed

### 1.7 Package scripts (`package.json`)
- Update lint:scss script pattern: `"**/*.scss"` → `"**/*.css"` (and rename scripts to `lint:css`/`lint:css:fix`)

---

## Phase 2: Global Styles

### 2.1 Convert global styles from SCSS to CSS

Files to rename and update:
- `src/app/styles/index.scss` → `index.css`
  - Replace `@use "..." as *;` → `@import "...";` (4 lines)
- `src/app/styles/reset.scss` → `reset.css` (no syntax changes needed)
- `src/app/styles/variables/global.scss` → `global.css`
  - Replace `//` comments → `/* */` comments
- `src/app/styles/themes/normal.scss` → `normal.css`
  - Replace `//` comments → `/* */` comments
- `src/app/styles/themes/dark.scss` → `dark.css`
  - Replace `//` comments → `/* */` comments

### 2.2 Update global style import

In `src/shared/config/storybook/StyleDecorator/StyleDecorator.ts`:
- Change `import '@/app/styles/index.scss'` → `import '@/app/styles/index.css'`

In `src/shared/lib/tests/componentRender/componentRender.tsx`:
- Change `import '@/app/styles/index.scss'` → `import '@/app/styles/index.css'`

---

## Phase 3: Rename Module Files (37 files)

Rename all `.module.scss` → `.module.css`. No syntax changes needed in these files since:
- Nesting is handled by `postcss-preset-mantine` (includes `postcss-nested`)
- `&` parent selector is supported by `postcss-nested`
- Only CSS custom properties are used (no SCSS variables)

**Entities (10 files):**
- `src/entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent.module.scss`
- `src/entities/Article/ui/ArticleDetails/ArticleDetails.module.scss`
- `src/entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent.module.scss`
- `src/entities/Article/ui/ArticleList/ArticleList.module.scss`
- `src/entities/Article/ui/ArticleListItem/ArticleListItem.module.scss`
- `src/entities/Article/ui/ArticleListItem/ArticleListItemRedesigned/ArticleListItemRedesigned.module.scss`
- `src/entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent.module.scss`
- `src/entities/Comment/ui/CommentCard/CommentCard.module.scss`
- `src/entities/Notification/ui/NotificationItem/NotificationItem.module.scss`
- `src/entities/Notification/ui/NotificationList/NotificationList.module.scss`

**Features (5 files):**
- `src/features/ArticleSortSelector/ui/ArticleSortSelector/ArticleSortSelector.module.scss`
- `src/features/ArticleViewSelector/ui/ArticleViewSelector/ArticleViewSelector.module.scss`
- `src/features/addCommentForm/ui/AddCommentForm/AddCommentForm.module.scss`
- `src/features/AuthByUsername/ui/LoginForm/LoginForm.module.scss`
- `src/features/notificationButton/ui/NotificationButton/NotificationButton.module.scss`

**Pages (6 files):**
- `src/pages/ArticleDetailsPage/ui/AdditionalInfoContainer/AdditionalInfoContainer.module.scss`
- `src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.module.scss`
- `src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.module.scss`
- `src/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.module.scss`
- `src/pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters.module.scss`
- `src/pages/NotFoundPage/ui/NotFoundPage.module.scss`

**Shared (8 files):**
- `src/shared/layouts/AppLoaderLayout/AppLoaderLayout.module.scss`
- `src/shared/layouts/MainLayout/MainLayout.module.scss`
- `src/shared/layouts/StickyContentLayout/StickyContentLayout.module.scss`
- `src/shared/ui/redesigned/AppLink/AppLink.module.scss`
- `src/shared/ui/redesigned/AppLogo/AppLogo.module.scss`
- `src/shared/ui/redesigned/Code/Code.module.scss`
- `src/shared/ui/redesigned/Icon/Icon.module.scss`
- `src/shared/ui/redesigned/StarRating/StarRating.module.scss`

**Widgets (8 files):**
- `src/widgets/ArticlesFilters/ui/ArticlesFilters/ArticlesFilters.module.scss`
- `src/widgets/ErrorPage/ui/ErrorPage.module.scss`
- `src/widgets/Navbar/ui/Navbar.module.scss`
- `src/widgets/Page/ui/Page/Page.module.scss`
- `src/widgets/PageLoader/ui/PageLoader/PageLoader.module.scss`
- `src/widgets/ScrollToolbar/ui/ScrollToolbar/ScrollToolbar.module.scss`
- `src/widgets/Sidebar/ui/Sidebar/Sidebar.module.scss`
- `src/widgets/Sidebar/ui/SidebarItem/SidebarItem.module.scss`

---

## Phase 4: Update TypeScript Imports (~39 files)

Change all `import cls from './Component.module.scss'` → `import cls from './Component.module.css'`

These are in the same components that own the module files listed above.

---

## Phase 5: Dependency Cleanup

### Remove:
```bash
npm uninstall sass sass-loader stylelint-config-standard-scss
```

### Install:
```bash
npm install --save-dev postcss-loader stylelint-config-standard
```

(`postcss-loader` is needed for webpack to process PostCSS; Vite handles it natively)

---

## Phase 6: Remove `.stylelintignore` SCSS references

Check if `.stylelintignore` needs updates (currently only ignores `/build`).

---

## Verification

```bash
npx tsc --noEmit              # No type errors
npm run lint:ts               # No lint errors
npm run lint:css              # No CSS lint errors (renamed from lint:scss)
npm run test:unit             # All 75 tests pass
npm run build:dev             # Dev build succeeds
npm run start                 # App runs correctly
npm run storybook             # Storybook renders correctly
```

---

## Summary

| Metric | Count |
|--------|-------|
| Files renamed | 42 |
| TypeScript imports updated | ~39 |
| Config files modified | 6 |
| Dependencies removed | 3 (sass, sass-loader, stylelint-config-standard-scss) |
| Dependencies added | 2 (postcss-loader, stylelint-config-standard) |
| SCSS features to replace | Only `//` comments and `@use` in 5 global files |
