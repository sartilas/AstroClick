# Implementation Plan - Fix Multi-Satellite Spawn Error

The user reported a runtime error `TypeError: Cannot read properties of null (reading 'alpha')` during "spawn of multi satellite".
Investigation suggests this is related to the `EffectComposer` in `components/Effects.tsx` interacting with scene updates (adding new objects/rockets to the scene) while RTX mode is active.
The error likely stems from rapid unmounting/remounting of effects or context loss issues often associated with `postprocessing` libraries when scene graph changes occur.
Specifically, `GodRays` depends on `sunRef.current`. If `Sun` re-renders or the ref updates, `Effects` might be trying to re-compose when the mesh is momentarily unavailable or the context is recycling.

## Proposed Changes

### 1. Optimize `Effects` Component

- **File**: `components/Effects.tsx`
- **Change**: 
  - Ensure `EffectComposer` is stable.
  - Disable `autoClear` on `EffectComposer` just in case (though usually handled by R3F).
  - Add a key to force full remount if necessary, OR enable/disable via props instead of unmounting the whole tree.
  - **CRITICAL FIX**: The `Effects` component body has `if (!rtxMode) return null;`. This causes the entire `EffectComposer` to unmount when RTX is off. When RTX is on, it mounts.
  - However, the error happens *during* use.
  - The usage of `{sunRef.current && (<GodRays ... />)}` means `GodRays` is conditionally rendered based on ref mutation. 
  - **Proposed Fix**: Use a `useEffect` or state to track `sunRef` availability to ensure we don't try to mount `GodRays` before the mesh is truly ready, or prevent `Effects` from re-rendering purely on prop changes that don't need re-initialization.
  - **Better Fix**: Ensure `Effects` is memoized so it doesn't re-render on every frame/update unless `rtxMode` changes.

### 2. Memoize `Effects` in `SolarSystem.tsx/Scene`

- **File**: `components/SolarSystem.tsx`
- **Change**: Memoize the `Effects` component or verify that it doesn't re-render excessively.
- The `Scene` component receives `rockets`. `rockets` changes when user spawns a satellite.
- `Scene` re-renders. `Effects` is a child of `Scene`, so it re-renders.
- `sunRef` is passed. It is stable (created with `useRef` in `Scene`).
- However, `Effects` component function runs again.
- In `Effects.tsx`:
  - `sunRef.current` access in render body: `{sunRef.current && ...}`
  - If `sunRef.current` is defined, `GodRays` is rendered.
  - `EffectComposer` re-renders its children.
  - Generally, R3F reconciles this without destroying the composer context.
  - **Exception**: If `sunRef.current` *changes* or is momentarily undefined (likely not).

**Root Cause Hypothesis**:
The `EffectComposer` from `@react-three/postprocessing` can be sensitive to re-renders of its children if the WebGL context is being used heavily.
But the specific error `reading 'alpha'` typically implies `multisampling` config or context attributes mismatch.
We currently have `multisampling={0}`.

**Alternative Fix**:
Upgrading `postprocessing` is not an option.
We can try to wrap `Effects` with `React.memo` to prevent re-rendering when `rockets` update `Scene`. `rockets` aren't passed to `Effects`, so it shouldn't need to re-render.

## Detailed Steps

1.  **Modify `components/Effects.tsx`**:
    - Wrap the component in `React.memo`.
    - This ensures that even if `Scene` re-renders due to `rockets` changing, `Effects` will NOT re-render (since `sunRef` and `rtxMode` are stable).
    - This should prevent `EffectComposer` from churning during gameplay.

2.  **Verify**:
    - Launch app.
    - Enable RTX.
    - Spawn multiple satellites (rockets) using Spacebar or UI.
    - Ensure no crash.

## Impact Analysis
- **Stability**: Prevents unnecessary re-renders of the heavy post-processing pipeline.
- **Performance**: Improved performance when spawning objects.
- **Visuals**: No change to visuals, just stability.
