'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { InfoCard } from '@/components/InfoCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import Image from 'next/image';
import { SolarSystemObject } from '@/data/solarSystemData';
import { Moon, Sun, Minimize2, Maximize2, Ruler, Orbit, Rocket, Music, VolumeX, Volume2, Info, X, Eye, EyeOff, Layers, Ban, Leaf, Magnet, Network } from 'lucide-react';
import { LayerMode } from '@/components/types';

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

    const audioRef = useRef<HTMLAudioElement>(null);

    const t = dictionary[lang];

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
                            v1.0.0 • Open Source
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
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <p className="text-xs text-gray-500">
                                    Code source disponible librement pour l&apos;éducation.
                                </p>
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
                />

                {/* UI Controls - Top Right */}
                <div className="absolute top-4 right-4 z-50 flex flex-col gap-4 items-end">
                    {/* HUD Toggle Button - Always Visible */}
                    <button
                        onClick={() => setIsHudVisible(!isHudVisible)}
                        className={`bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all ${!isHudVisible ? 'opacity-50 hover:opacity-100' : ''}`}
                        title={isHudVisible ? "Masquer l'interface" : "Afficher l'interface"}
                    >
                        {isHudVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>

                    {/* Main HUD Container - Animated Visibility */}
                    <div className={`flex flex-col gap-4 items-end transition-all duration-500 ${isHudVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none absolute right-0 top-12'}`}>

                        {/* GROUP 1: General Settings (Language, Theme, About) */}
                        <div className="flex items-center gap-2">
                            {/* Language Selector */}
                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
                                {(['fr', 'en', 'es', 'zh', 'hi'] as Language[]).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`px-2 py-1 rounded-lg text-lg transition-all ${lang === l ? 'bg-white/20 scale-110 shadow-lg' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                                        title={l.toUpperCase()}
                                    >
                                        {l === 'en' && '🇺🇸'}
                                        {l === 'fr' && '🇫🇷'}
                                        {l === 'es' && '🇪🇸'}
                                        {l === 'zh' && '🇨🇳'}
                                        {l === 'hi' && '🇮🇳'}
                                    </button>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 h-fit">
                                <button
                                    onClick={() => setTheme('black')}
                                    className={`p-2 rounded-full transition-all ${theme === 'black' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Moon size={20} />
                                </button>
                                <button
                                    onClick={() => setTheme('gradient')}
                                    className={`p-2 rounded-full transition-all ${theme === 'gradient' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Sun size={20} />
                                </button>
                            </div>

                            {/* About Button */}
                            <button
                                onClick={() => setShowAbout(true)}
                                className="bg-black/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all h-full"
                                title="À propos"
                            >
                                <Info size={20} />
                            </button>
                        </div>

                        {/* GROUP 2: Audio Control */}
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 group">
                            <button
                                onClick={toggleMusic}
                                className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                                title="Music"
                            >
                                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                            </button>
                            {/* Volume Slider */}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 opacity-60 hover:opacity-100 transition-opacity"
                                title={`Volume: ${Math.round(volume * 100)}%`}
                            />
                        </div>

                        {/* GROUP 3: Simulation Controls */}
                        <div className="flex gap-2">
                            {/* Time Scale Controls */}
                            <div className="flex flex-col gap-1 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                                <span className="text-xs text-center text-gray-400 font-mono mb-1">{t.timeControl}</span>
                                <div className="flex gap-1">
                                    {[0, 1, 2, 5].map((scale) => (
                                        <button
                                            key={scale}
                                            onClick={() => setTimeScale(scale)}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${timeScale === scale ? 'bg-purple-600 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                                        >
                                            {scale === 0 ? '||' : `${scale}x`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Orbit Mode Toggle */}
                            <div className="flex flex-col gap-1 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-red-500/80 text-[8px] font-bold px-1 rounded-bl-lg text-white">DEV</div>
                                <span className="text-xs text-center text-gray-400 font-mono mb-1 pt-1">{t.orbitScale} & {t.layers}</span>
                                <div className="flex flex-col gap-2">
                                    {/* Orbit Scale Row */}
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => setOrbitMode('simplified')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${orbitMode === 'simplified' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                                            title={t.simplified}
                                        >
                                            <Orbit size={16} />
                                            <span className="hidden xl:inline">{t.simplified}</span>
                                        </button>
                                        <button
                                            onClick={() => setOrbitMode('real')}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${orbitMode === 'real' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                                            title={t.realScale}
                                        >
                                            <Ruler size={16} />
                                            <span className="hidden xl:inline">{t.realScale}</span>
                                        </button>
                                    </div>

                                    {/* Layers Row */}
                                    <div className="flex gap-1 justify-center bg-white/5 p-1 rounded-lg">
                                        <button
                                            onClick={() => setLayerMode('none')}
                                            className={`p-1.5 rounded-md transition-all ${layerMode === 'none' ? 'bg-gray-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.layerNone}
                                        >
                                            <Ban size={14} />
                                        </button>
                                        <button
                                            onClick={() => setLayerMode('habitable')}
                                            className={`p-1.5 rounded-md transition-all ${layerMode === 'habitable' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.layerHabitable}
                                        >
                                            <Leaf size={14} />
                                        </button>
                                        <button
                                            onClick={() => setLayerMode('gravity')}
                                            className={`p-1.5 rounded-md transition-all ${layerMode === 'gravity' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.layerGravity}
                                        >
                                            <Magnet size={14} />
                                        </button>
                                        <button
                                            onClick={() => setLayerMode('lagrange')}
                                            className={`p-1.5 rounded-md transition-all ${layerMode === 'lagrange' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                            title={t.layerLagrange}
                                        >
                                            <Network size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GROUP 4: Visual Tools */}
                        <div className="flex items-center gap-2">
                            {/* RTX Toggle */}
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 relative overflow-hidden group h-full">
                                <div className="absolute top-0 right-0 bg-red-500/80 text-[8px] font-bold px-1 rounded-bl-lg text-white">DEV</div>
                                <span className={`text-xs font-bold pl-1 ${rtxMode ? 'text-yellow-400' : 'text-gray-400'}`}>RTX</span>
                                <button
                                    onClick={() => setRtxMode(!rtxMode)}
                                    className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${rtxMode ? 'bg-yellow-500' : 'bg-gray-600'}`}
                                >
                                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 ${rtxMode ? 'left-4.5' : 'left-0.5'}`} />
                                </button>
                            </div>

                            {/* Rocket Cursor Toggle */}
                            <button
                                onClick={() => setShowCursor(!showCursor)}
                                className={`p-3 rounded-xl border border-white/10 transition-all ${showCursor ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'}`}
                                title="Rocket Cursor"
                            >
                                <Rocket size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Title Overlay - Hidden when HUD is hidden */}
                <div className={`absolute top-4 left-4 z-10 pointer-events-none transition-opacity duration-500 ${isHudVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
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

                {/* Instructions - Hidden when HUD is hidden */}
                {!selectedObject && (
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
                />
            </div>
        </main>
    );
}
