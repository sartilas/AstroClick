'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SolarSystemObject } from '@/data/solarSystemData';
import { objectTranslations } from '@/data/objectTranslations';
import { X, Thermometer, Ruler, Orbit, Info, Eclipse, Globe, Image as ImageIcon, BookOpen } from 'lucide-react';
import { dictionary, Language } from '@/data/dictionary';
import { useNasaImage } from '@/hooks/useNasaImage';

interface InfoCardProps {
    selectedObject: SolarSystemObject | null;
    onClose: () => void;
    lang: Language;
}

export function InfoCard({ selectedObject, onClose, lang }: InfoCardProps) {
    // Determine query for NASA API
    const query = selectedObject ? (selectedObject.id === 'iss' ? 'International Space Station' : selectedObject.name) : '';
    const { images, loading: imageLoading, error: imageError } = useNasaImage(query);

    if (!selectedObject) return null;
    const data = selectedObject;
    const t = dictionary[lang];

    // Get translations
    const translation = objectTranslations[data.id]?.[lang];

    // Use translated strings or fallback to data (which is English default)
    const displayName = translation?.name || data.name;
    const displayDesc = translation?.description || data.description;
    const displayFact = translation?.funFact || data.funFact;
    const displayTemp = translation?.temperature || data.temperature;
    const displayDist = translation?.realDistance || data.realDistance;
    const displayAvgDist = translation?.averageDistanceToEarth || data.averageDistanceToEarth;
    const displayOrbit = translation?.orbitalPeriod || data.orbitalPeriod;

    // Wikipedia URL
    const wikiUrl = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(displayName)}`;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                className="absolute top-20 left-4 w-96 max-h-[85vh] overflow-y-auto bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl z-50 custom-scrollbar"
            >
                {/* Header Image/Color */}
                <div
                    className="h-32 mb-4 relative overflow-hidden"
                    style={{ background: `linear-gradient(to bottom, ${data.color}44, transparent)` }}
                >
                    <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold font-mono px-2 py-1 rounded bg-white/10 uppercase tracking-widest border border-white/10">
                            {data.type === 'planet' && t.planet}
                            {data.type === 'dwarf-planet' && t.dwarfPlanet}
                            {data.type === 'telescope' && t.telescope}
                            {data.type === 'satellite' && t.satellite}
                            {data.type === 'star' && t.star}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer pointer-events-auto"
                    >
                        <X size={18} />
                    </button>

                    {/* Giant Background Icon/Text */}
                    <h1 className="absolute -bottom-6 -right-6 text-9xl font-black text-white/5 select-none overflow-hidden">
                        {data.id.substring(0, 2).toUpperCase()}
                    </h1>
                </div>

                <div className="px-6 pb-6 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {displayName}
                            </h2>
                            <a
                                href={wikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-blue-300 transition-colors"
                                title="Wikipedia"
                            >
                                <BookOpen size={20} />
                            </a>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            {displayDesc}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-blue-300 mb-1">
                                <Thermometer size={16} />
                                <span className="text-xs font-bold uppercase">{t.temperature}</span>
                            </div>
                            <span className="text-xl font-mono text-sm">{displayTemp}</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-green-300 mb-1">
                                <Ruler size={16} />
                                <span className="text-xs font-bold uppercase">{t.distance}</span>
                            </div>
                            <span className="text-xl font-mono text-sm">{displayDist}</span>
                        </div>

                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors col-span-2">
                            <div className="flex items-center gap-2 text-cyan-300 mb-1">
                                <Globe size={16} />
                                <span className="text-xs font-bold uppercase">{t.distanceEarth}</span>
                            </div>
                            <span className="text-xl font-mono">{displayAvgDist || "N/A"}</span>
                        </div>

                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-purple-300 mb-1">
                                <Orbit size={16} />
                                <span className="text-xs font-bold uppercase">{t.orbitalPeriod ? t.orbitalPeriod : t.orbit}</span>
                            </div>
                            <span className="text-xl font-mono text-sm">{displayOrbit}</span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2 text-yellow-300 mb-1">
                                <Eclipse size={16} />
                                <span className="text-xs font-bold uppercase">{t.moons}</span>
                            </div>
                            <span className="text-xl font-mono">{data.moons}</span>
                        </div>
                    </div>

                    {/* Fun Fact */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Info size={40} />
                        </div>
                        <h3 className="text-blue-300 font-bold mb-2 flex items-center gap-2">
                            {t.didYouKnow}
                        </h3>
                        <p className="text-sm text-gray-300 italic">
                            &quot;{displayFact}&quot;
                        </p>
                    </div>

                    {/* NASA Gallery (4 images) */}
                    <div className="space-y-2">
                        <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
                            <ImageIcon size={14} /> NASA Gallery
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {imageLoading && (
                                <div className="col-span-2 h-32 flex items-center justify-center text-gray-500 bg-white/5 rounded-xl">
                                    <span className="animate-pulse">Loading NASA Images...</span>
                                </div>
                            )}
                            {imageError && (
                                <div className="col-span-2 h-32 flex items-center justify-center text-gray-500 text-sm p-4 text-center bg-white/5 rounded-xl">
                                    Gallery unavailable
                                </div>
                            )}
                            {!imageLoading && !imageError && images.map((img, idx) => (
                                <div key={idx} className="aspect-square bg-black/30 rounded-xl overflow-hidden border border-white/10 relative group">
                                    <img
                                        src={img}
                                        alt={`${displayName} ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button onClick={onClose} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        {t.backToSpace}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
