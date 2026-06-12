// Approximate heliocentric mean longitudes at epoch J2000 (Jan 1, 2000, 12:00 TT)
// and sidereal orbital periods. Source: NASA/JPL approximate planetary elements.
// Good enough for an educational "where were the planets on this date?" view —
// relative configurations are correct to within a few degrees.

const ELEMENTS: Record<string, { L0: number; periodDays: number }> = {
    mercury: { L0: 252.25, periodDays: 87.969 },
    venus: { L0: 181.98, periodDays: 224.701 },
    earth: { L0: 100.46, periodDays: 365.256 },
    mars: { L0: 355.43, periodDays: 686.980 },
    jupiter: { L0: 34.35, periodDays: 4332.589 },
    saturn: { L0: 50.08, periodDays: 10759.22 },
    uranus: { L0: 314.05, periodDays: 30688.5 },
    neptune: { L0: 304.35, periodDays: 60182 },
    pluto: { L0: 238.93, periodDays: 90560 }
};

export const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);

/**
 * Returns the orbital angle (radians) of each planet at the given date,
 * keyed by object id. James Webb follows Earth (L2 point).
 */
export function getPlanetAnglesAtDate(date: Date): Record<string, number> {
    const days = (date.getTime() - J2000_MS) / 86400000;
    const angles: Record<string, number> = {};
    for (const id of Object.keys(ELEMENTS)) {
        const { L0, periodDays } = ELEMENTS[id];
        let deg = (L0 + (360 * days) / periodDays) % 360;
        if (deg < 0) deg += 360;
        angles[id] = deg * (Math.PI / 180);
    }
    angles['james-webb'] = angles['earth'];
    return angles;
}
