# Migration Plan: Replace MainLayout with Mantine AppShell

## Overview

Replace the custom MainLayout component with Mantine's AppShell component to leverage Mantine's built-in layout system and improve maintainability.

## Current Architecture

**MainLayout** (`src/shared/layouts/MainLayout/MainLayout.tsx`):

- CSS Grid layout: `sidebar | content | rightbar`
- Grid columns: `min-content 1fr 100px`
- Sticky positioning for sidebar and rightbar
- Props: header, content, sidebar, toolbar (optional)

**Important**: Current layout renders the `header` prop (Navbar widget) in the RIGHT column, not at the top.

**Usage Locations**:

1. `src/app/App.tsx` - Main application
2. `src/shared/layouts/AppLoaderLayout/AppLoaderLayout.tsx` - Loading state

## CRITICAL DECISION: Layout Modernization ✓ CONFIRMED

The current MainLayout has an unusual structure where the Navbar (header prop) is rendered in the right column, NOT at the top.

**Selected Approach: Modernize to Standard Layout**

- Move header (Navbar) to top of page - full width
- Use AppShell.Header for Navbar widget
- Use AppShell.Aside only for toolbar (right column)
- Follows standard app shell pattern
- Aligns with Mantine design conventions
- Better accessibility and UX

## Implementation Strategy

### Phase 1: Create AppShellLayout Component

**New Files**:

- `src/shared/layouts/AppShellLayout/AppShellLayout.tsx`
- `src/shared/layouts/AppShellLayout/AppShellLayout.module.css`
- `src/shared/layouts/AppShellLayout/index.ts`

**Component Structure**:

```typescript
<AppShell
  layout="alt"          // Navbar extends full height
  padding={0}           // Manual control
  withBorder={false}    // Custom borders via CSS
  header={{
    height: 60,
    offset: true
  }}
  navbar={{
    width: sidebarCollapsed ? 50 : 220,
    breakpoint: 0,
    collapsed: { desktop: false, mobile: false }
  }}
  aside={toolbar ? {
    width: 100,
    breakpoint: 0,
    collapsed: { desktop: false, mobile: false }
  } : undefined}
>
  <AppShell.Header>{header}</AppShell.Header>
  <AppShell.Navbar>{sidebar}</AppShell.Navbar>
  <AppShell.Main>{content}</AppShell.Main>
  {toolbar && <AppShell.Aside>{toolbar}</AppShell.Aside>}
</AppShell>
```

**Props Interface**:

```typescript
interface AppShellLayoutProps {
  className?: string;
  header: ReactElement; // Navbar widget - rendered at top
  content: ReactElement; // Main content area (AppRouter)
  sidebar: ReactElement; // Sidebar widget - left navigation
  toolbar?: ReactElement; // ScrollToolbar - right column (optional)
  sidebarCollapsed?: boolean; // Controlled collapse state
}
```

### Phase 2: Lift Sidebar Collapse State

**Problem**: Sidebar manages its own collapse state, but AppShell needs it for navbar width configuration.

**Solution**: Convert Sidebar to controlled component

**Modify** `src/widgets/Sidebar/ui/Sidebar/Sidebar.tsx`:

- Add `collapsed?: boolean` prop (controlled state)
- Add `onToggle?: () => void` callback prop
- Maintain backward compatibility with internal state fallback

**Update** `src/app/App.tsx`:

- Add `const [sidebarCollapsed, setSidebarCollapsed] = useState(false)`
- Pass to Sidebar: `collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)}`
- Pass to AppShellLayout: `sidebarCollapsed={sidebarCollapsed}`

### Phase 3: Update All Usage Locations

**File**: `src/app/App.tsx`

- Import AppShellLayout instead of MainLayout
- Add sidebar collapse state
- Pass sidebarCollapsed prop to layout

**File**: `src/shared/layouts/AppLoaderLayout/AppLoaderLayout.tsx`

- Replace MainLayout with AppShellLayout
- Pass `sidebarCollapsed={false}` for loading state

### Phase 4: Styling Implementation

**AppShellLayout.module.css**:

```css
.AppShellLayout {
  min-height: 100vh;
}

.header {
  padding: 16px;
}

.navbar {
  padding: 32px;
  background: transparent; /* Sidebar handles bg */
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  width: 100%;
}

.aside {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
```

**Widget Updates**:

- `src/widgets/Sidebar/ui/Sidebar/Sidebar.module.css`: Remove `position: sticky` (AppShell handles it)
- Sidebar widgets already render as semantic HTML (`<header>`, `<aside>`), update to `<div>` to avoid nesting

### Phase 5: Deprecate MainLayout

**File**: `src/shared/layouts/MainLayout/MainLayout.tsx`

- Add `@deprecated` JSDoc comment
- Keep file for backward compatibility
- Note: StickyContentLayout still uses the CSS class pattern

## Key Architectural Changes

### Fixed vs Sticky Positioning

- **Before**: Sidebar/rightbar use `position: sticky`
- **After**: AppShell uses `position: fixed`
- **Impact**: Sections never scroll, only main content scrolls
- **Justification**: Standard pattern for application shells

### Width Transitions

- AppShell handles width animation via CSS variables
- Use `transitionDuration` and `transitionTimingFunction` props to match current 0.3s transition

### Semantic HTML

- AppShell uses semantic elements: `<nav>`, `<aside>`, `<main>`
- Update widgets to use `<div>` when rendered inside AppShell sections to avoid nested semantics

## Files to Modify

### New Files (3)

1. `src/shared/layouts/AppShellLayout/AppShellLayout.tsx`
2. `src/shared/layouts/AppShellLayout/AppShellLayout.module.css`
3. `src/shared/layouts/AppShellLayout/index.ts`

### Modified Files (5)

1. `src/app/App.tsx` - Replace MainLayout, add sidebar state
2. `src/shared/layouts/AppLoaderLayout/AppLoaderLayout.tsx` - Use AppShellLayout
3. `src/widgets/Sidebar/ui/Sidebar/Sidebar.tsx` - Controlled component
4. `src/widgets/Sidebar/ui/Sidebar/Sidebar.module.css` - Remove sticky styles
5. `src/widgets/Navbar/ui/Navbar.tsx` - Change `<header>` to `<div>`

### Deprecated Files (1)

1. `src/shared/layouts/MainLayout/MainLayout.tsx` - Add deprecation notice

## Testing & Verification

### Manual Testing Checklist

- [ ] Navbar appears at TOP of page, full width
- [ ] Sidebar appears on left with correct styling
- [ ] Sidebar collapses from 220px to 50px smoothly
- [ ] ScrollToolbar appears in right column on article pages
- [ ] No toolbar on non-article pages
- [ ] Content is centered, max-width 1200px
- [ ] AppLoaderLayout renders correctly
- [ ] Light/dark themes work correctly
- [ ] Layout is more standard/accessible than before

### Automated Testing

1. Create Storybook stories for AppShellLayout
   - Default state
   - Collapsed sidebar
   - With toolbar
   - Without toolbar
2. Update existing tests if App.test.tsx exists
3. Run Loki visual regression tests

### Test Scenarios

1. Navigate to article page - verify toolbar appears
2. Navigate to non-article page - verify no toolbar
3. Toggle sidebar - verify smooth collapse animation
4. Check scrolling behavior - main content scrolls, sections stay fixed
5. Refresh during loading - verify skeleton layout

## Rollback Plan

If issues arise:

1. Revert App.tsx to use MainLayout
2. Revert AppLoaderLayout.tsx
3. Revert Sidebar.tsx prop changes
4. Keep AppShellLayout for future use
5. MainLayout remains fully functional

## Benefits

1. **Leverages Mantine Design System**: Built-in responsive behavior and theming
2. **Better Maintainability**: Standard component instead of custom CSS Grid
3. **Improved Performance**: Mantine's optimized layout engine
4. **Future-Proof**: Easy to extend with Mantine features (responsive breakpoints, etc.)
5. **Type Safety**: Full TypeScript support from Mantine
6. **Backward Compatible**: MainLayout remains available during transition

## Potential Issues & Mitigations

### Issue: Fixed positioning changes scroll behavior

- **Mitigation**: Test thoroughly, may be UX improvement
- **Fallback**: Can configure AppShell to use different positioning if needed

### Issue: Sidebar width animation might differ

- **Mitigation**: Use AppShell's `transitionDuration` and `transitionTimingFunction` props
- **Fallback**: Override CSS variables for exact match

### Issue: Z-index conflicts with modals

- **Mitigation**: AppShell default z-index is 100, modals use 1000 - should be fine
- **Fallback**: Adjust AppShell `zIndex` prop if needed

## Critical Files

📝 **Core Implementation**:

- `src/shared/layouts/AppShellLayout/AppShellLayout.tsx`

🔧 **Integration Points**:

- `src/app/App.tsx`
- `src/widgets/Sidebar/ui/Sidebar/Sidebar.tsx`

🎨 **Styling**:

- `src/shared/layouts/AppShellLayout/AppShellLayout.module.css`
- `src/widgets/Sidebar/ui/Sidebar/Sidebar.module.css`

## Dependencies

- ✓ @mantine/core@^8.3.13 (already installed)
- ✓ @mantine/hooks@^8.3.13 (already installed)
- ✓ MantineProvider already configured in ThemeProvider
