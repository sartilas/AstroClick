# Implementation Plan - Disable Asteroid Shadows in RTX Mode

The user wants the asteroid belt to not cast shadows when RTX mode is enabled.
Currently, the `AsteroidBelt` component has `castShadow` enabled on its `instancedMesh`.
Since shadows are only active in the scene when RTX mode is enabled (via the main light source), simply disabling `castShadow` on the `AsteroidBelt` will achieve the desired effect ensuring they never cast shadows.

## Proposed Changes

### 1. Update `AsteroidBelt` Component

- **File**: `components/AsteroidBelt.tsx`
- **Change**: Set `castShadow={false}` on the `instancedMesh`.
- **Reasoning**: This prevents asteroids from casting shadows. Since shadows are only computed in RTX mode anyway, this effectively addresses the user's request for RTX mode specific behavior while being a general optimization.

## Verification Plan

### Automated Checks
- Run `npm run check` (tsc).

### Visual Verification
- Use Antigravity Browser Control to:
  - Toggle RTX mode ON.
  - Observe the asteroid belt.
  - Confirm asteroids do not cast shadows on themselves or other objects.
