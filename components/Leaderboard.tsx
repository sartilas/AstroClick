import React, { useState, useEffect, useMemo } from 'react';
import { Rocket } from './types';
import { Trophy, X, ChevronDown, ChevronUp } from 'lucide-react';

interface LeaderboardProps {
    rockets: Rocket[];
    history: Rocket[];
}

function formatScore(score: number): string {
    if (score >= 1000000) return (score / 1000000).toFixed(1) + 'M';
    if (score >= 1000) return (score / 1000).toFixed(1) + 'k';
    return Math.floor(score).toString();
}

export function Leaderboard({ rockets, history }: LeaderboardProps) {
    // Merge active rockets and history, removing duplicates (keep highest score version of each ID)
    const leaderboard = useMemo(() => {
        const combined = [...rockets, ...history];

        // Create a map to keep only the highest score for each unique ID
        const uniqueMap = new Map<number, Rocket>();
        for (const rocket of combined) {
            const existing = uniqueMap.get(rocket.id);
            if (!existing || rocket.score > existing.score) {
                uniqueMap.set(rocket.id, rocket);
            }
        }

        // Convert back to array, sort by score descending, take top 10
        return Array.from(uniqueMap.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    }, [rockets, history]);

    const hasData = leaderboard.length > 0;

    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-expand on desktop, collapse on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!hasData) return null;

    // Mobile/Collapsed View: Tiny Icon
    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-24 left-4 md:top-28 md:left-6 bg-slate-900/90 p-3 rounded-full border border-yellow-500/30 text-yellow-400 backdrop-blur-md shadow-lg shadow-yellow-500/10 z-50 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group"
                title="Show Leaderboard"
            >
                <Trophy size={20} />
                {rockets.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white animate-pulse">
                        {rockets.length}
                    </span>
                )}
            </button>
        );
    }

    // Expanded View (Full Scoreboard)
    return (
        <div className="absolute top-20 left-4 right-4 md:top-28 md:left-6 md:right-auto md:w-72 bg-slate-900/95 md:bg-slate-900/90 p-4 rounded-xl border border-blue-500/30 text-blue-100 font-mono text-xs backdrop-blur-xl md:backdrop-blur-md shadow-2xl shadow-blue-500/20 z-50 pointer-events-auto animate-fade-in origin-top-left">
            <h3 className="text-sm font-bold mb-4 text-white border-b border-white/10 pb-3 flex justify-between items-center tracking-wider">
                <div className="flex items-center gap-2" onClick={() => window.innerWidth < 768 && setIsExpanded(false)}>
                    <Trophy size={18} className="text-yellow-400" />
                    <span>TOP SATELLITES</span>
                </div>

                <div className="flex items-center gap-2">
                    {rockets.length > 0 ? (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse whitespace-nowrap">
                            LIVE: {rockets.length}/10
                        </span>
                    ) : (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                            OFFLINE
                        </span>
                    )}

                    {/* Close Button (Visible mainly on mobile or if user wants to hide it) */}
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors md:hidden"
                    >
                        <X size={16} />
                    </button>
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="hidden md:block p-1 hover:bg-white/10 rounded-full transition-colors opacity-50 hover:opacity-100"
                        title="Minimize"
                    >
                        <ChevronUp size={16} />
                    </button>
                </div>
            </h3>
            <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {leaderboard.map((r, index) => {
                    const isLive = rockets.some(active => active.id === r.id);
                    let rankColor = "text-gray-500";
                    let rankIcon = `#${index + 1}`;
                    let rowBg = "hover:bg-white/5";

                    if (index === 0) { rankColor = "text-yellow-400"; rankIcon = "🥇"; rowBg = "bg-yellow-500/10 border border-yellow-500/20"; }
                    if (index === 1) { rankColor = "text-gray-300"; rankIcon = "🥈"; rowBg = "bg-gray-400/10 border border-gray-400/20"; }
                    if (index === 2) { rankColor = "text-amber-600"; rankIcon = "🥉"; rowBg = "bg-amber-600/10 border border-amber-600/20"; }

                    return (
                        <div key={r.id} className={`flex justify-between items-center p-2 rounded-lg transition-all ${rowBg} ${!isLive ? 'opacity-70 grayscale-[0.5]' : ''} mb-1`}>
                            <div className="flex items-center gap-3">
                                <span className={`font-bold text-base w-6 text-center ${rankColor} drop-shadow-sm`}>
                                    {rankIcon}
                                </span>
                                <div className="flex flex-col">
                                    <span className={`font-bold text-sm ${isLive ? 'text-white' : 'text-gray-400 line-through decoration-red-500/50'}`}>
                                        {r.name}
                                    </span>
                                    {!isLive && <span className="text-[9px] text-orange-400/80 font-bold tracking-wider flex items-center gap-1">SIGNAL LOST <span className="text-[8px]">📡</span></span>}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-mono font-bold text-sm ${r.score > 1000 ? 'text-cyan-300' : 'text-blue-200'}`}>
                                    {formatScore(r.score)} <span className="text-[10px] opacity-60">km</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
