# Implementation Plan - Chargeable Satellite Launch with Trajectory

The user wants to upgrade the satellite launch mechanism.
Current Behavior: Pressing SPACE instantly spawns a satellite with 0 velocity (pulled by an attractor).
New Behavior: 
1.  **Hold SPACE** to charge "launch power" (initial velocity).
2.  **Visual Trajectory**: While holding SPACE, show a predicted path of the satellite.
3.  **Release SPACE** to launch the satellite with the accumulated velocity.

## Proposed Changes

### 1. Modify `PhysicsManager.tsx`

#### State Management
- Add `isCharging` state (boolean).
- Add `chargeStartTime` (number) or `chargePower` (number).
- Use `useRef` for the trajectory line geometry to update it performantly without full re-renders.

#### Event Handling
- **KeyDown ('Space')**: 
    - Set `isCharging = true`.
    - Initialize `chargePower = 0`.
- **KeyUp ('Space')**: 
    - Set `isCharging = false`.
    - Spawn `Rocket` with `velocity = aimDirection * chargePower`.
    - (Optional) Disable or tweak the "attractor" logic for these manually launched rockets, as the user now provides the initial force.

#### Trajectory Simulation (Prediction)
- Inside `useFrame`, if `isCharging` is true:
    1.  Calculate start position (in front of camera).
    2.  Calculate launch vector (raycast from pointer).
    3.  Calculate accumulation of power based on time held.
    4.  **Run Simulation**:
        - Clone start position and velocity.
        - Loop $N$ steps (e.g., 200 simulation ticks).
        - Apply Gravity (Sun + Planets) at each step.
        - Store positions.
    5.  Update the `TrajectoryLine` geometry with these positions.

#### Visuals
- Add a `<Line />` (from `@react-three/drei`) or a raw `THREE.Line` to render the prediction path.
- Colorize it (e.g., gradient or dashed) to look "techy".

### 2. Physics Adjustments
- The existing physics uses `G = 50`.
- The existing logic spawns with velocity `(0,0,0)` and `attractorEnabled: true`.
- **New Logic**:
    - Spawn with calculated velocity.
    - Set `attractorEnabled: false` (or maybe true but with delay? The user prompt implies a skill-shot style launch ("vitesse initiale"), so the attractor might be undesirable or should be a secondary mechanic. I will disable the attractor for charged shots to respect the "trajectory" prediction, otherwise the prediction is useless if an arbitrary attractor pulls it away).

## Verification Plan

### Manual Test
1.  Launch App.
2.  Hold SPACE.
3.  Verify a line appears and curves according to gravity (aim near the Sun or Jupiter).
4.  Verify the line gets longer/straighter as charge increases (higher velocity = flatter arc).
5.  Release SPACE.
6.  Verify satellite follows the predicted path.

## Math/Physics Sync
- The prediction loop MUST use the exact same physics math (Gravity formulas) as the actual update loop to be accurate.
- I will extract the force calculation logic into a helper or ensure identical implementation.

