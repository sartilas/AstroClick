'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Radio, Brain, Globe2, AlertTriangle, MessageSquare } from 'lucide-react';
import { dictionary, Language } from '@/data/dictionary';
import { DrakeEquationCalculator } from './DrakeEquationCalculator';

interface FermiParadoxModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
}

export function FermiParadoxModal({ isOpen, onClose, lang }: FermiParadoxModalProps) {
    if (!isOpen) return null;

    const t = dictionary[lang]?.fermiModal;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#0a0a1a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/30 shadow-2xl shadow-green-900/20 custom-scrollbar"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-green-500/20 p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <HelpCircle className="text-green-400 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
                                    {t?.title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 space-y-8 text-gray-200">

                            {/* Intro Section */}
                            <section className="bg-green-900/5 rounded-2xl p-6 border border-green-500/10">
                                <p className="text-xl font-light leading-relaxed text-green-100">
                                    <span className="font-bold text-green-400">"{t?.intro}"</span>
                                    <br /><br />
                                    {t?.introDesc}
                                </p>
                            </section>

                            {/* The Grid of Theories */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <TheoryCard
                                    icon={Brain}
                                    title={t?.theories?.greatFilter?.title}
                                    description={t?.theories?.greatFilter?.description}
                                    color="text-red-400"
                                />
                                <TheoryCard
                                    icon={Globe2}
                                    title={t?.theories?.rareEarth?.title}
                                    description={t?.theories?.rareEarth?.description}
                                    color="text-blue-400"
                                />
                                <TheoryCard
                                    icon={Radio}
                                    title={t?.theories?.radioSilence?.title}
                                    description={t?.theories?.radioSilence?.description}
                                    color="text-yellow-400"
                                />
                                <TheoryCard
                                    icon={AlertTriangle}
                                    title={t?.theories?.darkForest?.title}
                                    description={t?.theories?.darkForest?.description}
                                    color="text-purple-400"
                                />
                            </div>

                            {/* Drake Equation - Interactive Calculator */}
                            <DrakeEquationCalculator lang={lang} />

                            <footer className="text-center text-sm text-gray-500 pt-8 border-t border-white/5">
                                <p>{t?.footer}</p>
                            </footer>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function TheoryCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
    return (
        <div className="bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/5 group">
            <div className={`mb-3 ${color}`}>
                <Icon size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
