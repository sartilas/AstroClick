# Implementation Plan: Redesign UI to Bottom Dock

The goal is to redesign the User Interface (HUD) into a modern, responsive "Dock" at the bottom of the screen.

## Proposed Changes

### 1. `app/page.tsx`
- **New State**: `isHudMinimized` (boolean) to handle the dock's visibility.
- **Dock Container**:
    - Position: `fixed bottom-0 left-0 w-full`.
    - Style: `bg-black/60 backdrop-blur-xl border-t border-white/10`.
    - Transition: Slide up/down based on `isHudMinimized`.
- **Toggle Arrow**:
    - Position: Absolute top center of the dock.
    - Component: A small chevron or arrow button.
    - Action: Toggle `isHudMinimized`.
- **Dock Content**:
    - Flex container to organize groups:
        - **Group 1 (Navigation)**: Language selection (adding it back), Theme toggle, About.
        - **Group 2 (Audio)**: Volume and Mute.
        - **Group 3 (Controls)**: Time Scale buttons.
        - **Group 4 (Modes)**: Orbit Scale and Layers.
        - **Group 5 (Tools)**: RTX, Reset View, Rocket Cursor.
- **Responsiveness**:
    - Use `flex-wrap` for medium screens.
    - On mobile, simplify the layout (icons only or horizontal scrolling).

### 2. Styling
- Update `index.css` or use Tailwind classes for the new dock look.
- Ensure smooth animations for opening/closing.

## Elements to Integrate
- [x] Language Selection (FR, EN, ES, ZH, HI) - *Re-adding these as they seem to be missing in the current JSX*
- [x] Theme Toggle (Sun/Moon)
- [x] About Button (Info)
- [x] Audio Controls (Volume + Mute)
- [x] Time Scale (||, 1x, 2x, 5x)
- [x] Orbit Scale (Simplified/Real)
- [x] Layers (None, Habitable, Gravity, Lagrange)
- [x] RTX Toggle
- [x] Reset View
- [x] Rocket Cursor

## Verification
- Run `npm run check` to ensure no TypeScript errors.
- Test on different screen sizes using browser tools.
- Verify all buttons still work as expected.
