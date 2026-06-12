'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { dictionary, Language } from '@/data/dictionary';

interface DrakeEquationCalculatorProps {
    lang: Language;
}

// Static config for ranges/steps (numbers don't need translation)
const config: Record<string, { min: number; max: number; step: number; default: number; logScale?: boolean }> = {
    R: { min: 1, max: 10, step: 0.5, default: 1.5 },
    fp: { min: 0, max: 1, step: 0.01, default: 0.9 },
    ne: { min: 0, max: 5, step: 0.1, default: 0.4 },
    fl: { min: 0, max: 1, step: 0.01, default: 0.5 },
    fi: { min: 0, max: 1, step: 0.001, default: 0.1 },
    fc: { min: 0, max: 1, step: 0.01, default: 0.2 },
    L: { min: 100, max: 10000000, step: 100, default: 10000, logScale: true }
};

export function DrakeEquationCalculator({ lang }: DrakeEquationCalculatorProps) {
    const t = dictionary[lang].drake;

    const variables = useMemo(() => [
        { id: 'R', symbol: 'R*', ...t.variables.R, ...config.R },
        { id: 'fp', symbol: 'fp', ...t.variables.fp, ...config.fp },
        { id: 'ne', symbol: 'ne', ...t.variables.ne, ...config.ne },
        { id: 'fl', symbol: 'fl', ...t.variables.fl, ...config.fl },
        { id: 'fi', symbol: 'fi', ...t.variables.fi, ...config.fi },
        { id: 'fc', symbol: 'fc', ...t.variables.fc, ...config.fc },
        { id: 'L', symbol: 'L', ...t.variables.L, ...config.L }
    ], [t]);

    const [values, setValues] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        Object.keys(config).forEach(key => initial[key] = config[key].default);
        return initial;
    });

    const result = useMemo(() => {
        return Object.values(values).reduce((acc, curr) => acc * curr, 1);
    }, [values]);

    const handleChange = (id: string, val: number) => {
        setValues(prev => ({ ...prev, [id]: val }));
    };

    const loadPreset = (type: 'skeptical' | 'optimistic' | 'scientific') => {
        const presets: Record<string, Record<string, number>> = {
            skeptical: { R: 1, fp: 0.5, ne: 0.1, fl: 0.01, fi: 0.01, fc: 0.01, L: 100 },
            optimistic: { R: 2, fp: 1, ne: 1, fl: 1, fi: 0.5, fc: 0.5, L: 1000000 },
            scientific: { R: 1.5, fp: 0.9, ne: 0.4, fl: 0.5, fi: 0.1, fc: 0.2, L: 10000 }
        };
        setValues(presets[type]);
    };

    // Format large numbers
    const formatNumber = (num: number) => {
        if (num > 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num > 1000) return (num / 1000).toFixed(1) + 'k';
        if (num < 0.01) return num.toExponential(2);
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    return (
        <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-bold text-green-300 mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-400">{t.description}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => loadPreset('skeptical')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-red-300 border border-red-500/30 transition-colors">{t.presets.skeptical}</button>
                    <button onClick={() => loadPreset('scientific')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-blue-300 border border-blue-500/30 transition-colors">{t.presets.scientific}</button>
                    <button onClick={() => loadPreset('optimistic')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-green-300 border border-green-500/30 transition-colors">{t.presets.optimistic}</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {variables.map((v) => (
                    <div key={v.id} className="relative group">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                                <span className="font-mono text-green-500 bg-green-900/20 px-1.5 py-0.5 rounded">{v.symbol}</span>
                                {v.name}
                            </label>
                            <span className="text-sm font-mono text-green-400">
                                {v.logScale ? formatNumber(values[v.id]) : values[v.id]} {v.unit}
                            </span>
                        </div>

                        <input
                            type="range"
                            min={v.logScale ? Math.log10(v.min) : v.min}
                            max={v.logScale ? Math.log10(v.max) : v.max}
                            step={v.logScale ? 0.1 : v.step}
                            value={v.logScale ? Math.log10(values[v.id]) : values[v.id]}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                handleChange(v.id, v.logScale ? Math.pow(10, val) : val);
                            }}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                        />

                        <div className="mt-1 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {v.desc}
                        </div>
                    </div>
                ))}
            </div>

            {/* Result Area */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
                <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">{t.result.detectableCivilizations}</div>
                <motion.div
                    key={result}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] font-mono"
                >
                    N = {Math.round(result).toLocaleString()}
                </motion.div>
                <div className="mt-4 text-sm text-gray-400 max-w-lg">
                    {result < 1
                        ? t.result.empty
                        : result < 100
                            ? t.result.lonely
                            : t.result.crowded}
                </div>
            </div>
        </div>
    );
}
