'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SolarSystemObject } from '@/data/solarSystemData';
import { objectTranslations } from '@/data/objectTranslations';
import { X, Thermometer, Ruler, Orbit, Info, Eclipse, Globe, Image as ImageIcon, BookOpen } from 'lucide-react';
import { dictionary, Language } from '@/data/dictionary';
import { SystemType } from './types';
import { useNasaImage } from '@/hooks/useNasaImage';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { VoxelSphere } from './VoxelSphere';

import { VoxelModel } from './VoxelModel';

// Wrapper for the 3D Header to handle hydration/sizing nicely
const Object3DPreview = ({ data, onClose, lang }: { data: SolarSystemObject, onClose: () => void, lang: Language }) => {
    // Determine type for Visualization
    let type = 'rocky';
    let isCustomModel = false;
    let customModelType: 'iss' | 'hubble' | 'james-webb' = 'iss';

    if (['iss', 'hubble', 'james-webb'].includes(data.id)) {
        isCustomModel = true;
        customModelType = data.id as any;
    } else {
        if (data.type === 'star') type = 'star';
        else if (['jupiter', 'saturn', 'uranus', 'neptune', 'jool'].includes(data.id)) type = 'gas-giant';
        else if (data.id === 'earth') type = 'earth';
        else if (data.id === 'kerbin') type = 'kerbin'; // KSP Earth analog
        else if (data.id === 'duna') type = 'duna'; // KSP Mars analog with ice caps
    }

    const t = dictionary[lang];

    return (
        <div className="h-64 mb-4 relative overflow-hidden bg-black/40 rounded-t-2xl border-b border-white/10">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                    <pointLight position={[-8, -5, -8]} intensity={0.8} color="#4a90e2" />
                    <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffd700" />

                    <group rotation={[0.25, 0, 0.1]}>
                        {isCustomModel ? (
                            <VoxelModel type={customModelType} scale={1} />
                        ) : (
                            <VoxelSphere
                                radius={1}
                                color={data.color}
                                resolution={36}
                                type={type}
                                castShadow={false}
                            />
                        )}
                    </group>

                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={1.5}
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            </div>

            {/* Overlays */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="text-xs font-bold font-mono px-2 py-1 rounded bg-black/50 backdrop-blur-md uppercase tracking-widest border border-white/20 text-white/90 shadow-lg">
                    {data.type === 'planet' && (t?.planet || 'Planet')}
                    {data.type === 'dwarf-planet' && (t?.dwarfPlanet || 'Dwarf Planet')}
                    {data.type === 'telescope' && (t?.telescope || 'Telescope')}
                    {data.type === 'satellite' && (t?.satellite || 'Satellite')}
                    {data.type === 'star' && (t?.star || 'Star')}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer pointer-events-auto backdrop-blur-sm border border-white/10"
                aria-label="Close"
            >
                <X size={18} />
            </button>
        </div>
    );
}

interface InfoCardProps {
    selectedObject: SolarSystemObject | null;
    onClose: () => void;
    lang: Language;
    systemType?: SystemType;
}

const StatCard = ({ icon: Icon, label, value, colorClass }: { icon: any, label: string, value: string | number | undefined, colorClass: string }) => (
    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
        <div className={`flex items-center gap-2 ${colorClass} mb-1`}>
            <Icon size={16} />
            <span className="text-xs font-bold uppercase">{label}</span>
        </div>
        <span className="text-xl font-mono text-sm">{value || "N/A"}</span>
    </div>
);

export function InfoCard({ selectedObject, onClose, lang, systemType = 'solar' }: InfoCardProps) {
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

    // For Kerbol system, show 'Distance to Kerbin' instead of 'Distance to Earth'
    const distanceLabel = systemType === 'kerbol' ? (t.distanceKerbin || t.distanceEarth) : t.distanceEarth;

    // Disable NASA gallery for Kerbol system (fictional objects)
    const showNasaGallery = systemType === 'solar';

    // Wikipedia URL - Only for real objects
    const wikiUrl = systemType === 'solar'
        ? `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(displayName)}`
        : null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                className="fixed bottom-0 left-0 w-full h-[66vh] md:h-auto md:max-h-[85vh] md:absolute md:top-20 md:left-4 md:w-full md:max-w-md overflow-y-auto bg-black/60 backdrop-blur-xl border-t md:border border-white/20 rounded-t-2xl md:rounded-2xl text-white shadow-2xl z-50 custom-scrollbar"
            >
                {/* 3D Header */}
                <Object3DPreview data={data} onClose={onClose} lang={lang} />

                <div className="px-6 pb-6 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400" translate="no">
                                {displayName}
                            </h2>
                            {wikiUrl && (
                                <a
                                    href={wikiUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-blue-300 transition-colors"
                                    title="Wikipedia"
                                >
                                    <BookOpen size={20} />
                                </a>
                            )}
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            {displayDesc}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <StatCard icon={Thermometer} label={t.temperature} value={displayTemp} colorClass="text-blue-300" />
                        <StatCard icon={Ruler} label={t.distance} value={displayDist} colorClass="text-green-300" />

                        <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors col-span-2">
                            <div className="flex items-center gap-2 text-cyan-300 mb-1">
                                <Globe size={16} />
                                <span className="text-xs font-bold uppercase">{distanceLabel}</span>
                            </div>
                            <span className="text-xl font-mono">{displayAvgDist || "N/A"}</span>
                        </div>

                        <StatCard icon={Orbit} label={t.orbitalPeriod ? t.orbitalPeriod : t.orbit} value={displayOrbit} colorClass="text-purple-300" />
                        <StatCard icon={Eclipse} label={t.moons} value={data.moons} colorClass="text-yellow-300" />
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

                    {/* NASA Gallery (4 images) - Only for Solar System objects */}
                    {showNasaGallery && (
                        <div className="space-y-2">
                            <h3 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
                                <ImageIcon size={14} /> {t.nasaGallery}
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {imageLoading && (
                                    <div className="col-span-2 h-32 flex items-center justify-center text-gray-500 bg-white/5 rounded-xl">
                                        <span className="animate-pulse">{t.loadingImages}</span>
                                    </div>
                                )}
                                {imageError && (
                                    <div className="col-span-2 h-32 flex items-center justify-center text-gray-500 text-sm p-4 text-center bg-white/5 rounded-xl">
                                        {t.galleryUnavailable}
                                    </div>
                                )}
                                {!imageLoading && !imageError && images.map((img, idx) => (
                                    <a
                                        key={idx}
                                        href={`https://images.nasa.gov/details/${img.nasaId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-square bg-black/30 rounded-xl overflow-hidden border border-white/10 relative group block cursor-pointer"
                                        title="View on NASA.gov"
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`${displayName} ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-black/50 p-2 rounded-full text-white/80 backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <button onClick={onClose} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        {t.backToSpace}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
