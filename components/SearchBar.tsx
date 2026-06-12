'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { SolarSystemObject } from '@/data/solarSystemData';
import { objectTranslations } from '@/data/objectTranslations';
import { dictionary, Language } from '@/data/dictionary';

interface SearchBarProps {
    lang: Language;
    objects: SolarSystemObject[];
    onPick: (obj: SolarSystemObject) => void;
}

// Accent-insensitive, case-insensitive matching ("comete" finds "Comète")
const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');
function normalize(s: string): string {
    return s.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase();
}

function typeEmoji(obj: SolarSystemObject): string {
    if (obj.type === 'star') return '☀️';
    if (obj.type === 'planet') return '🪐';
    if (obj.type === 'dwarf-planet') return '⭐';
    if (obj.type === 'telescope') return '🔭';
    if (obj.type === 'comet') return '☄️';
    if (obj.type === 'satellite') return obj.launchDate ? '🛰️' : '🌙';
    return '✨';
}

export function SearchBar({ lang, objects, onPick }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = dictionary[lang];
    const tf = t.features || {};

    const results = useMemo(() => {
        const q = normalize(query.trim());
        if (!q) return [];
        return objects
            .map(obj => ({ obj, name: objectTranslations[obj.id]?.[lang]?.name || obj.name }))
            .filter(({ obj, name }) => normalize(name).includes(q) || normalize(obj.name).includes(q))
            .slice(0, 8);
    }, [query, objects, lang]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener('mousedown', handler);
        return () => window.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={containerRef} className="relative w-52 md:w-60">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-2 focus-within:border-blue-400/50 transition-colors">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    placeholder={tf.searchPlaceholder || 'Search an object…'}
                    className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
                />
                {query && (
                    <button onClick={() => { setQuery(''); setOpen(false); }} className="text-gray-500 hover:text-white transition-colors shrink-0">
                        <X size={14} />
                    </button>
                )}
            </div>

            {open && query.trim() && (
                <div className="absolute top-full mt-2 w-full bg-[#0b1026]/95 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl z-50">
                    {results.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-gray-500">{tf.searchNoResult || 'No result'}</div>
                    ) : (
                        results.map(({ obj, name }) => (
                            <button
                                key={obj.id}
                                onClick={() => {
                                    onPick(obj);
                                    setQuery('');
                                    setOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-white/10 transition-colors"
                            >
                                <span className="text-base">{typeEmoji(obj)}</span>
                                <span className="text-sm text-white font-medium" translate="no">{name}</span>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
