'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { X, GraduationCap, Trophy, RotateCcw } from 'lucide-react';
import { solarSystemData, SolarSystemObject } from '@/data/solarSystemData';
import { kerbolSystemData } from '@/data/kerbolSystemData';
import { objectTranslations } from '@/data/objectTranslations';
import { dictionary, Language } from '@/data/dictionary';
import { SystemType } from './types';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
    systemType: SystemType;
}

interface Question {
    text: string;
    subtitle?: string; // e.g. the fun fact to identify
    options: string[];
    correctIndex: number;
}

const QUESTION_COUNT = 8;
const BEST_SCORE_KEY = 'astroclick-quiz-best';

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickN<T>(arr: T[], n: number): T[] {
    return shuffle(arr).slice(0, n);
}

export function QuizModal({ isOpen, onClose, lang, systemType }: QuizModalProps) {
    const t = dictionary[lang];
    const tf = useMemo(() => t.features || {}, [t]);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    const getName = useCallback((obj: SolarSystemObject) =>
        objectTranslations[obj.id]?.[lang]?.name || obj.name, [lang]);

    const generateQuestions = useCallback((): Question[] => {
        const data = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
        const named = data.filter(o => o.type !== 'asteroid-belt');
        const planets = named.filter(o => o.type === 'planet' || o.type === 'dwarf-planet');
        const primaries = named.filter(o => !o.orbiting && o.distance > 0);
        const qs: Question[] = [];

        // Type A: "How many moons does X have?"
        for (const p of pickN(planets.filter(p => p.moons !== undefined), 3)) {
            const correct = String(p.moons);
            const distractors = pickN(
                Array.from(new Set(planets.map(o => String(o.moons)))).filter(v => v !== correct),
                3
            );
            if (distractors.length < 3) continue;
            const options = shuffle([correct, ...distractors]);
            qs.push({
                text: (tf.quizQMoons || 'How many moons does {name} have?').replace('{name}', getName(p)),
                options,
                correctIndex: options.indexOf(correct)
            });
        }

        // Type B: "Which object matches this fact?"
        for (const p of pickN(planets, 3)) {
            let fact = objectTranslations[p.id]?.[lang]?.funFact || p.funFact;
            if (!fact) continue;
            // Mask the object's name (translated + english) so the answer isn't in the question
            for (const name of [getName(p), p.name]) {
                const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                fact = fact.replace(new RegExp(escaped, 'gi'), '???');
            }
            const others = pickN(planets.filter(o => o.id !== p.id), 3);
            if (others.length < 3) continue;
            const options = shuffle([getName(p), ...others.map(getName)]);
            qs.push({
                text: tf.quizQFact || 'Which object matches this fact?',
                subtitle: fact,
                options,
                correctIndex: options.indexOf(getName(p))
            });
        }

        // Type C: "Which of these objects is closest to the star?"
        for (let i = 0; i < 2; i++) {
            const sample = pickN(primaries, 4);
            if (sample.length < 4) break;
            const closest = sample.reduce((a, b) => (a.distance < b.distance ? a : b));
            const options = sample.map(getName);
            qs.push({
                text: tf.quizQClosest || 'Which of these objects is closest to the star?',
                options,
                correctIndex: options.indexOf(getName(closest))
            });
        }

        // Type D: "What is the temperature of X?"
        for (const p of pickN(planets, 2)) {
            const temp = objectTranslations[p.id]?.[lang]?.temperature || p.temperature;
            if (!temp) continue;
            const others = pickN(planets.filter(o => o.id !== p.id), 3)
                .map(o => objectTranslations[o.id]?.[lang]?.temperature || o.temperature)
                .filter((v, idx, arr) => v && v !== temp && arr.indexOf(v) === idx);
            if (others.length < 3) continue;
            const options = shuffle([temp, ...others.slice(0, 3)]);
            qs.push({
                text: (tf.quizQTemp || 'What is the temperature of {name}?').replace('{name}', getName(p)),
                options,
                correctIndex: options.indexOf(temp)
            });
        }

        return shuffle(qs).slice(0, QUESTION_COUNT);
    }, [systemType, lang, tf, getName]);

    const restart = useCallback(() => {
        setQuestions(generateQuestions());
        setIndex(0);
        setScore(0);
        setAnswered(null);
        setFinished(false);
    }, [generateQuestions]);

    // (Re)generate questions each time the modal opens
    useEffect(() => {
        if (isOpen) {
            restart();
            try {
                setBestScore(parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0', 10));
            } catch { /* localStorage unavailable */ }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const question = questions[index];

    const handleAnswer = (optIndex: number) => {
        if (answered !== null) return;
        setAnswered(optIndex);
        if (question && optIndex === question.correctIndex) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (index + 1 >= questions.length) {
            setFinished(true);
            const finalScore = score;
            try {
                if (finalScore > bestScore) {
                    localStorage.setItem(BEST_SCORE_KEY, String(finalScore));
                    setBestScore(finalScore);
                }
            } catch { /* localStorage unavailable */ }
        } else {
            setIndex(i => i + 1);
            setAnswered(null);
        }
    };

    const ratio = questions.length > 0 ? score / questions.length : 0;
    const resultMessage = ratio === 1 ? (tf.quizPerfect || 'Perfect!')
        : ratio >= 0.7 ? (tf.quizGood || 'Great!')
        : ratio >= 0.4 ? (tf.quizOk || 'Not bad!')
        : (tf.quizBad || 'Try again!');

    return (
        <div
            className="absolute inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#0b1026] border border-white/20 p-6 rounded-2xl max-w-lg w-full shadow-2xl relative m-4 max-h-[85vh] overflow-y-auto"
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
                    <div className="p-2.5 bg-purple-600/30 border border-purple-500/40 rounded-xl text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        <GraduationCap size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{tf.quizTitle || 'Space Quiz'}</h2>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                            {tf.quizScore || 'Score'}: {score}/{questions.length} • {tf.quizBest || 'Best'}: {bestScore}
                        </p>
                    </div>
                </div>

                {!finished && question && (
                    <>
                        {/* Progress */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                                    style={{ width: `${((index + (answered !== null ? 1 : 0)) / questions.length) * 100}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap">
                                {tf.quizQuestion || 'Question'} {index + 1}/{questions.length}
                            </span>
                        </div>

                        {/* Question */}
                        <h3 className="text-white font-bold mb-2 leading-snug">{question.text}</h3>
                        {question.subtitle && (
                            <p className="text-sm text-blue-200/80 italic bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-3">
                                &quot;{question.subtitle}&quot;
                            </p>
                        )}

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-2 mt-3">
                            {question.options.map((opt, i) => {
                                let style = 'bg-white/5 border-white/10 hover:bg-white/15 text-gray-200';
                                if (answered !== null) {
                                    if (i === question.correctIndex) style = 'bg-green-600/40 border-green-400/60 text-white';
                                    else if (i === answered) style = 'bg-red-600/40 border-red-400/60 text-white';
                                    else style = 'bg-white/5 border-white/5 text-gray-500';
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        disabled={answered !== null}
                                        className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${style}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback + Next */}
                        {answered !== null && (
                            <div className="flex items-center justify-between mt-4">
                                <span className={`text-sm font-bold ${answered === question.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                                    {answered === question.correctIndex ? (tf.quizCorrect || 'Correct!') : (tf.quizWrong || 'Wrong!')}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
                                >
                                    {index + 1 >= questions.length ? (tf.quizFinish || 'See result') : (tf.quizNext || 'Next question')}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Final screen */}
                {finished && (
                    <div className="text-center py-6">
                        <div className="flex justify-center mb-4 text-yellow-400">
                            <Trophy size={48} />
                        </div>
                        <div className="text-5xl font-black text-white mb-2">
                            {score}<span className="text-2xl text-gray-400">/{questions.length}</span>
                        </div>
                        <p className="text-gray-300 mb-1">{resultMessage}</p>
                        <p className="text-xs text-gray-500 font-mono mb-6">
                            {tf.quizBest || 'Best score'}: {bestScore}/{QUESTION_COUNT}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={restart}
                                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
                            >
                                <RotateCcw size={16} />
                                {tf.quizRestart || 'Play again'}
                            </button>
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors"
                            >
                                {t.backToSpace || 'Back to space'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
