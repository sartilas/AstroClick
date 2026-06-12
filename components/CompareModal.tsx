'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Scale, Thermometer, Ruler, Orbit, Eclipse } from 'lucide-react';
import { solarSystemData, SolarSystemObject } from '@/data/solarSystemData';
import { kerbolSystemData } from '@/data/kerbolSystemData';
import { objectTranslations } from '@/data/objectTranslations';
import { dictionary, Language } from '@/data/dictionary';
import { SystemType } from './types';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
    systemType: SystemType;
}

// Effective radius used for the visual size comparison (km)
function radiusKm(obj: SolarSystemObject): number {
    return obj.scientificRadius || obj.size * 6000;
}

function formatDiameter(obj: SolarSystemObject): string {
    if (!obj.scientificRadius) return 'N/A';
    return `${Math.round(obj.scientificRadius * 2).toLocaleString()} km`;
}

export function CompareModal({ isOpen, onClose, lang, systemType }: CompareModalProps) {
    const t = dictionary[lang];
    const tf = t.features || {};

    const objects = useMemo(() => {
        const data = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
        return data.filter(o => ['star', 'planet', 'dwarf-planet', 'satellite', 'comet'].includes(o.type) && !o.launchDate);
    }, [systemType]);

    const [idA, setIdA] = useState('');
    const [idB, setIdB] = useState('');

    // Sensible defaults per system
    useEffect(() => {
        if (systemType === 'kerbol') {
            setIdA('kerbin');
            setIdB('duna');
        } else {
            setIdA('earth');
            setIdB('mars');
        }
    }, [systemType]);

    if (!isOpen) return null;

    const objA = objects.find(o => o.id === idA) || objects[0];
    const objB = objects.find(o => o.id === idB) || objects[1];
    if (!objA || !objB) return null;

    const getName = (obj: SolarSystemObject) => objectTranslations[obj.id]?.[lang]?.name || obj.name;
    const getTrans = (obj: SolarSystemObject) => objectTranslations[obj.id]?.[lang];

    // Visual relative sizes (largest one caps at 150px)
    const rA = radiusKm(objA);
    const rB = radiusKm(objB);
    const maxR = Math.max(rA, rB);
    const MAX_PX = 150;
    const pxA = Math.max((rA / maxR) * MAX_PX, 8);
    const pxB = Math.max((rB / maxR) * MAX_PX, 8);
    const ratio = maxR / Math.min(rA, rB);

    const planetCircle = (obj: SolarSystemObject, px: number) => (
        <div
            className="rounded-full shrink-0 shadow-2xl"
            style={{
                width: px,
                height: px,
                background: `radial-gradient(circle at 32% 30%, ${obj.color}ee, ${obj.color} 55%, #00000088)`,
                boxShadow: `0 0 ${Math.max(px * 0.25, 10)}px ${obj.color}55`
            }}
        />
    );

    const statRow = (icon: React.ReactNode, label: string, valA: string | number | undefined, valB: string | number | undefined) => (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2 border-b border-white/5 last:border-0">
            <span className="text-sm text-gray-200 text-right font-mono">{valA ?? 'N/A'}</span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 font-bold px-2 whitespace-nowrap">
                {icon}{label}
            </span>
            <span className="text-sm text-gray-200 text-left font-mono">{valB ?? 'N/A'}</span>
        </div>
    );

    const selector = (value: string, onChange: (v: string) => void) => (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-blue-400/60 w-full [color-scheme:dark]"
        >
            {objects.map(o => (
                <option key={o.id} value={o.id} className="bg-[#0b1026]">
                    {getName(o)}
                </option>
            ))}
        </select>
    );

    return (
        <div
            className="absolute inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#0b1026] border border-white/20 p-6 rounded-2xl max-w-xl w-full shadow-2xl relative m-4 max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={22} />
                </button>

                {/* Header - styled to match the site identity (gradient title + mono subtitle) */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-cyan-600/30 border border-cyan-500/40 rounded-xl text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                        <Scale size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">{tf.compareTitle || 'Planet Comparator'}</h2>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">AstroClick • {getName(objA)} vs {getName(objB)}</p>
                    </div>
                </div>

                {/* Selectors */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {selector(idA, setIdA)}
                    {selector(idB, setIdB)}
                </div>

                {/* Visual comparison */}
                <div className="flex items-end justify-center gap-8 min-h-[170px] mb-2 px-4">
                    <div className="flex flex-col items-center gap-2">
                        {planetCircle(objA, pxA)}
                        <span className="text-xs font-bold text-white" translate="no">{getName(objA)}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        {planetCircle(objB, pxB)}
                        <span className="text-xs font-bold text-white" translate="no">{getName(objB)}</span>
                    </div>
                </div>

                {/* Size ratio badge */}
                {isFinite(ratio) && ratio > 1.05 && (
                    <div className="flex justify-center mb-4">
                        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
                            ≈ {ratio.toFixed(1)}× {rA > rB ? getName(objA) : getName(objB)} &gt; {rA > rB ? getName(objB) : getName(objA)}
                        </span>
                    </div>
                )}

                {/* Stats */}
                <div className="bg-white/5 rounded-xl border border-white/10 px-4 py-2">
                    {statRow(<Ruler size={11} />, tf.compareDiameter || 'Diameter', formatDiameter(objA), formatDiameter(objB))}
                    {statRow(<Thermometer size={11} />, t.temperature || 'Temperature', getTrans(objA)?.temperature || objA.temperature, getTrans(objB)?.temperature || objB.temperature)}
                    {statRow(<Eclipse size={11} />, t.moons || 'Moons', objA.moons, objB.moons)}
                    {statRow(<Orbit size={11} />, t.orbit || 'Orbit', getTrans(objA)?.orbitalPeriod || objA.orbitalPeriod, getTrans(objB)?.orbitalPeriod || objB.orbitalPeriod)}
                    {statRow(<Ruler size={11} />, t.distance || 'Distance', getTrans(objA)?.realDistance || objA.realDistance, getTrans(objB)?.realDistance || objB.realDistance)}
                </div>
            </div>
        </div>
    );
}
