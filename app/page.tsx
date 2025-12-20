'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { InfoCard } from '@/components/InfoCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import Image from 'next/image';
import { SolarSystemObject } from '@/data/solarSystemData';
import { Moon, Sun, Minimize2, Maximize2, Ruler, Orbit, Rocket, Music, VolumeX, Volume2, Info, X, Eye, EyeOff, Layers, Ban, Leaf, Magnet, Network, RotateCcw, ChevronUp, ChevronDown, Languages, Globe } from 'lucide-react';
import { LayerMode, SystemType } from '@/components/types';

import { dictionary, Language } from '@/data/dictionary';

const SolarSystem = dynamic(() => import('@/components/SolarSystem'), {
    ssr: false,
    loading: () => null // We handle loading with our custom screen
});

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedObject, setSelectedObject] = useState<SolarSystemObject | null>(null);
    const [theme, setTheme] = useState<'gradient' | 'black'>('gradient');
    const [orbitMode, setOrbitMode] = useState<'simplified' | 'real'>('simplified');
    const [lang, setLang] = useState<Language>('fr');
    const [showCursor, setShowCursor] = useState(false);
    const [timeScale, setTimeScale] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showAbout, setShowAbout] = useState(false);
    const [isHudVisible, setIsHudVisible] = useState(true);
    const [rtxMode, setRtxMode] = useState(false);
    const [layerMode, setLayerMode] = useState<LayerMode>('none');
    const [resetCameraTrigger, setResetCameraTrigger] = useState(0);
    const [systemType, setSystemType] = useState<SystemType>('solar');

    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        // Auto-detect language from browser
        const browserLang = navigator.language.split('-')[0];
        if (['fr', 'en', 'es', 'zh', 'hi'].includes(browserLang)) {
            setLang(browserLang as Language);
        } else {
            setLang('en'); // Default fallback
        }

        // Hide instructions after 5 seconds
        const timer = setTimeout(() => {
            setShowInstructions(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const audioRef = useRef<HTMLAudioElement>(null);

    const t = dictionary[lang];

    // Disable Rocket Cursor in Real Scale mode
    useEffect(() => {
        if (orbitMode === 'real') {
            setShowCursor(false);
        }
    }, [orbitMode]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const [blackHoleActive, setBlackHoleActive] = useState(false);
    const logoClickRef = useRef<{ count: number, lastClick: number }>({ count: 0, lastClick: 0 });

    const handleLogoClick = () => {
        const now = Date.now();
        if (now - logoClickRef.current.lastClick < 1000) {
            logoClickRef.current.count += 1;
        } else {
            logoClickRef.current.count = 1;
        }
        logoClickRef.current.lastClick = now;

        if (logoClickRef.current.count >= 3) {
            setBlackHoleActive(true);
            logoClickRef.current.count = 0;
        }
    };

    const handleSelectObject = (obj: SolarSystemObject | null) => {
        setSelectedObject(obj);
    };

    return (
        <main className={`relative w-full h-screen overflow-hidden transition-colors duration-500 ${theme === 'black' ? 'bg-black' : 'bg-[#0b1026]'}`}
            style={{
                background: theme === 'gradient' ? 'radial-gradient(circle at center, #1a2350 0%, #0b1026 100%)' : '#000000'
            }}
        >
            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
                /* Firefox */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.2);
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite ease-in-out;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Custom Loading Screen */}
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

            {/* About Modal */}
            {showAbout && (
                <div
                    className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setShowAbout(false)}
                >
                    <div
                        className="bg-[#0b1026] border border-white/20 p-8 rounded-2xl max-w-md w-full shadow-2xl relative animate-scale-in m-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowAbout(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="relative w-24 h-24 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <Image src="/logo.png" alt="AstroClick" width={96} height={96} className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            AstroClick
                        </h2>
                        <p className="text-gray-500 text-center text-xs font-mono mb-6 uppercase tracking-widest">
                            v1.3.1 • Open Source
                        </p>

                        <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-center">
                            <p>
                                <strong>AstroClick</strong> est un projet éducatif gratuit et à but non lucratif.
                            </p>
                            <p>
                                Développé avec l&apos;aide de l&apos;IA
                                <span className="text-blue-400 font-bold"> Gemini 3 Pro</span> et
                                <span className="text-purple-400 font-bold"> Claude 4.5</span>.
                            </p>



                            <p className="text-xs text-yellow-500/80 italic mt-2 animate-pulse">
                                Psst... Cliquez 3 fois sur le logo pour une surprise cosmique !
                            </p>
                            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-2 items-center">
                                <p className="text-xs text-gray-500">
                                    Code source disponible librement pour l&apos;éducation.
                                </p>
                                <a
                                    href="https://github.com/sartilas/AstroClick"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-400 text-xs flex items-center gap-1 transition-colors"
                                >
                                    <Network size={12} />
                                    github.com/sartilas/AstroClick
                                </a>
                                <a
                                    href="https://astroclick.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-300 hover:text-blue-400 text-xs flex items-center gap-1 transition-colors"
                                >
                                    <Globe size={12} />
                                    astroclick.org
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Content - Hidden while loading but mounted to preload assets */}
            <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

                {/* Background Music - Science Documentary Background */}
                <audio ref={audioRef} id="bg-music" loop>
                    <source src="/cinematic-ambient-sci-fi.mp3" type="audio/mpeg" />
                </audio>

                {/* 3D Solar System */}
                <SolarSystem
                    selectedObject={selectedObject}
                    onSelectObject={handleSelectObject}
                    orbitMode={orbitMode}
                    showCursor={showCursor}
                    timeScale={timeScale}
                    lang={lang}
                    rtxMode={rtxMode}
                    layerMode={layerMode}
                    isHudVisible={isHudVisible}
                    resetCameraTrigger={resetCameraTrigger}
                    blackHoleActive={blackHoleActive}
                    onBlackHoleComplete={() => setBlackHoleActive(false)}
                    systemType={systemType}
                />

                {/* UI Controls - Bottom Dock */}
                <div className={`fixed bottom-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out ${isHudVisible ? 'translate-y-0' : 'translate-y-[calc(100%-16px)]'}`}>
                    {/* Toggle Arrow */}
                    <div className="flex justify-center -mb-5 relative z-10">
                        <button
                            onClick={() => setIsHudVisible(!isHudVisible)}
                            className="bg-[#1a2350] border border-white/30 p-2.5 rounded-full text-white hover:bg-blue-600 transition-all shadow-[0_-5px_25px_rgba(0,0,0,0.8)] group hover:scale-110 active:scale-95"
                            title={isHudVisible ? "Masquer" : "Afficher"}
                        >
                            {isHudVisible ? <ChevronDown size={24} className="animate-bounce-subtle" /> : <ChevronUp size={24} className="animate-bounce-subtle" />}
                        </button>
                    </div>

                    {/* Dock Content */}
                    <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4 pt-6 pb-6 px-4 overflow-x-auto scrollbar-hide shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                        <div className="max-w-7xl mx-auto flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-4 min-w-max md:min-w-0 px-2">

                            {/* GROUP 1: Time & Simulation */}
                            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="flex flex-col gap-1 items-center px-1">
                                    <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">{t.timeControl}</span>
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 5].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setTimeScale(s)}
                                                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center ${timeScale === s ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            >
                                                {s === 0 ? '||' : `${s}x`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-px h-8 bg-white/10" />

                                <div className="flex flex-col gap-1 items-center px-1">
                                    <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">{t.orbitScale}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setOrbitMode('simplified')}
                                            className={`p-2 rounded-lg transition-all ${orbitMode === 'simplified' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.simplified}
                                        >
                                            <Orbit size={18} />
                                        </button>
                                        <button
                                            onClick={() => setOrbitMode('real')}
                                            className={`p-2 rounded-lg transition-all ${orbitMode === 'real' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.realScale}
                                        >
                                            <Ruler size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-px h-8 bg-white/10" />

                                {/* System Toggle - Solar vs Kerbol */}
                                <div className="flex flex-col gap-1 items-center px-1">
                                    <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">{t.systemToggle}</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => { setSystemType('solar'); setSelectedObject(null); }}
                                            className={`p-2 rounded-lg transition-all flex items-center gap-1 ${systemType === 'solar' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.solarSystem}
                                        >
                                            <Sun size={16} />
                                            <span className="text-[9px] font-bold hidden sm:inline">☀️</span>
                                        </button>
                                        <div className="relative">
                                            <div className="absolute -top-2 -right-1 bg-gradient-to-r from-purple-600 to-pink-500 text-[6px] font-black px-1 py-0.5 rounded-full text-white shadow-lg border border-purple-400 pointer-events-none z-10 animate-pulse">NEW</div>
                                            <button
                                                onClick={() => { setSystemType('kerbol'); setSelectedObject(null); }}
                                                className={`p-2 rounded-lg transition-all flex items-center gap-1 ${systemType === 'kerbol' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                                title={t.kerbolSystem}
                                            >
                                                <Rocket size={16} />
                                                <span className="text-[9px] font-bold hidden sm:inline">KSP</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* GROUP 2: Visuals (Layers, Theme, RTX) */}
                            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/10 backdrop-blur-sm relative">
                                <div className="absolute -top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white shadow-lg border border-purple-400 pointer-events-none animate-pulse">NEW</div>

                                <div className="flex flex-col gap-1 items-center px-1">
                                    <span className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">{t.layers}</span>
                                    <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
                                        {(['none', 'habitable', 'gravity', 'lagrange'] as LayerMode[]).map((mode) => {
                                            const icons = { none: Ban, habitable: Leaf, gravity: Magnet, lagrange: Network };
                                            const Icon = icons[mode];
                                            const colors = { none: 'bg-gray-500', habitable: 'bg-green-600', gravity: 'bg-blue-500', lagrange: 'bg-purple-600' };
                                            return (
                                                <button
                                                    key={mode}
                                                    onClick={() => setLayerMode(mode)}
                                                    className={`p-1.5 rounded-md transition-all ${layerMode === mode ? `${colors[mode]} text-white scale-110 shadow-sm shadow-black/40` : 'text-gray-500 hover:text-gray-300'}`}
                                                    title={mode}
                                                >
                                                    <Icon size={16} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="w-px h-8 bg-white/10" />

                                <div className="flex items-center gap-2">
                                    {/* Theme Toggle Button */}
                                    <button
                                        onClick={() => setTheme(prev => prev === 'black' ? 'gradient' : 'black')}
                                        className={`p-2 rounded-xl transition-all ${theme === 'black' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                        title={theme === 'black' ? "Mode Gradient" : "Mode Noir"}
                                    >
                                        {theme === 'black' ? <Moon size={18} /> : <Sun size={18} />}
                                    </button>

                                    {/* RTX Toggle */}
                                    <button
                                        onClick={() => setRtxMode(!rtxMode)}
                                        className={`px-3 py-2 rounded-xl font-black text-[10px] tracking-widest transition-all ${rtxMode ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                        title="RTX Mode"
                                    >
                                        RTX
                                    </button>
                                </div>
                            </div>

                            {/* GROUP 3: Tools & System */}
                            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                                {/* Music Toggle */}
                                <button
                                    onClick={toggleMusic}
                                    className={`p-2.5 rounded-xl transition-all ${isPlaying ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                    title="Music On/Off"
                                >
                                    {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                                </button>

                                <div className="w-px h-6 bg-white/10" />

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setResetCameraTrigger(prev => prev + 1)}
                                        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                        title="Reset View"
                                    >
                                        <RotateCcw size={20} />
                                    </button>


                                    {orbitMode !== 'real' && (
                                        <button
                                            onClick={(e) => {
                                                setShowCursor(!showCursor);
                                                // Remove focus to prevent spacebar from toggling button
                                                (e.target as HTMLButtonElement).blur();
                                            }}
                                            onKeyDown={(e) => {
                                                // Prevent spacebar from triggering button click (used for launching satellites)
                                                if (e.code === 'Space') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className={`p-2 rounded-xl transition-all ${showCursor ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title="Rocket Mode"
                                        >
                                            <Rocket size={20} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setShowAbout(true)}
                                        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                        title="À propos"
                                    >
                                        <Info size={20} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Title Overlay - Hidden when HUD is hidden */}
                <div className={`absolute top-4 left-4 z-10 pointer-events-none transition-opacity duration-500 ${isHudVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <div
                            className="relative w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer pointer-events-auto hover:scale-110 transition-transform active:scale-90"
                            onClick={handleLogoClick}
                        >
                            <Image
                                src="/logo.png"
                                alt="AstroClick Logo"
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
                                {t.title}
                            </h1>
                            <p className="text-blue-200/60 text-sm font-mono tracking-wide">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Instructions - Hidden when HUD is hidden or after 5s */}
                {!selectedObject && showInstructions && (
                    <div className={`absolute top-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/10 text-sm animate-fade-in pointer-events-none z-10 transition-opacity duration-500 ${isHudVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            {t.clickInstruction}
                        </div>
                    </div>
                )}

                {/* Info Card Overlay */}
                <InfoCard
                    selectedObject={selectedObject}
                    onClose={() => setSelectedObject(null)}
                    lang={lang}
                    systemType={systemType}
                />
            </div>
        </main>
    );
}
