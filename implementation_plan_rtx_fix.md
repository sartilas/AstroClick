# Implementation Plan - Fix RTX Mode Lighting

The user reported that in RTX mode, the sun does not project light onto the objects of the system.
Investigation revealed that the `VoxelSphere` representing the Sun was casting shadows, effectively blocking the `pointLight` (located at the center of the sun) from illuminating the solar system.

## Proposed Changes

### 1. Update `VoxelSphere` Component

- **File**: `components/VoxelSphere.tsx`
- **Change**: Add a `castShadow` prop to the `VoxelSphere` component.
- **Default**: Defaults to `true` to maintain existing behavior for planets and other objects.
- **Implementation**: Pass this prop to the underlying `instancedMesh`.

### 2. Update `SolarSystem` Component

- **File**: `components/SolarSystem.tsx`
- **Change**: Pass `castShadow={false}` to the Sun's `VoxelSphere`.
- **Reasoning**: The Sun should emit light (visualized by the `pointLight` and `GodRays`), but its physical interaction mesh (the voxels) should not occlude that light.

## Verification Plan

### Automated Checks
- Run `npm run check` (or equivalent `tsc`) to ensure no type errors with the new prop.
- Verify `CelestialBody.tsx` usage of `VoxelSphere` remains valid (uses default).

### Visual Verification (Browser)
- Launch the application.
- Enable RTX mode via the HUD toggle.
- Confirm the scene is illuminated and planets are visible (not in shadow).
- Confirm shadows are still cast by planets (implicit, as their `castShadow` remains `true`).

## Impact Analysis
- **Aesthetics**: Drastic improvement in RTX mode; the scene will actually be visible.
- **Performance**: Negligible impact. Disabling shadow casting for one object is slightly cheaper.
- **Regressions**: Unlikely, as the change is additive and defaults to original behavior.
