import React from 'react';
import { Rocket } from './types';

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
    // Merge active rockets and history, sort by score descending, take top 10
    const leaderboard = [...rockets, ...history].sort((a, b) => b.score - a.score).slice(0, 10);
    const hasData = leaderboard.length > 0;

    if (!hasData) return null;

    return (
        <div className="absolute top-28 left-6 bg-slate-900/90 p-4 rounded-xl border border-blue-500/30 text-blue-100 font-mono text-xs backdrop-blur-md shadow-2xl shadow-blue-500/20 w-72 transition-all duration-300 z-50 pointer-events-auto">
            <h3 className="text-sm font-bold mb-4 text-white border-b border-white/10 pb-3 flex justify-between items-center tracking-wider">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <span>TOP SATELLITES</span>
                </div>
                {rockets.length > 0 ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                        LIVE: {rockets.length}/10
                    </span>
                ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                        OFFLINE
                    </span>
                )}
            </h3>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
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
