"use client";

import { getYoutubeVideoTitle } from "@/app/(preview)/actions";
import PageTransition from "@/components/PageTransition";
import Quiz from "@/components/quiz";
import { YoutubeIcon } from "@/components/shared/Icons";
import { questionSchema, questionsSchema } from "@/lib/schemas";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle,
    ClipboardPaste,
    FileText,
    HelpCircle,
    Loader2,
    Play,
    Sparkles,
    Trash2,
    Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

function extractYoutubeVideoId(url: string): string | null {
    if (!url) return null;
    const trimmed = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        return trimmed;
    }
    const match =
        trimmed.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/i
        ) || trimmed.match(/v=([a-zA-Z0-9_-]{11})/i);

    return match ? match[1] : null;
}

const SAMPLE_VIDEOS = [
    {
        title: "Vectors & Linear Algebra",
        channel: "3Blue1Brown",
        url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
        color: "bg-[#5cd0ff]",
    },
    {
        title: "CS50 Computer Science",
        channel: "Harvard CS50",
        url: "https://www.youtube.com/watch?v=LfaMVlDaQ24",
        color: "bg-[#ffd83f]",
    },
    {
        title: "DNA & Genetics Basics",
        channel: "CrashCourse",
        url: "https://www.youtube.com/watch?v=8m6hHRlKwxY",
        color: "bg-[#f78bb0]",
    },
];

export default function LinkInput() {
    const [link, setLink] = useState("");
    const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
    const [title, setTitle] = useState<string>();
    const [showhint, setShowHint] = useState(false);

    const activeVideoId = extractYoutubeVideoId(link);

    const { object, submit, isLoading, error } = useObject({
        api: "/api/generate-link-quiz",
        schema: questionSchema,
        onError: (err) => {
            console.error("AI quiz generation error:", err);
            toast.error(err.message || "Failed to generate quiz. Please check the video URL and try again.");
        },
    });

    useEffect(() => {
        if (object) {
            setQuestions(object as []);
        }
    }, [object]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to generate quiz from this video.");
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = link.trim();
        if (!trimmed) {
            toast.error("Please enter a YouTube video URL.");
            return;
        }

        const videoId = extractYoutubeVideoId(trimmed);
        if (!videoId) {
            toast.error("Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)");
            return;
        }

        submit({ videoUrl: trimmed });

        try {
            const videoTitle = await getYoutubeVideoTitle(trimmed);
            setTitle(videoTitle);
        } catch {
            setTitle("YouTube Video Quiz");
        }
    };

    const handlePasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                setLink(text);
                toast.success("Link pasted from clipboard!");
            }
        } catch {
            toast.error("Could not access clipboard. Please paste manually.");
        }
    };

    const clearQuiz = () => {
        setLink("");
        setQuestions([]);
        setTitle(undefined);
    };

    if (questions?.length > 4) {
        return (
            <Quiz
                showhint={showhint}
                setShowHint={setShowHint}
                title={title ?? "YouTube Video Quiz"}
                questions={questions as []}
                clearPDF={clearQuiz}
            />
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pt-28 md:pt-32 pb-20 select-none">
            <PageTransition>
                {/* 12-Column Responsive Classroom Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* ========================================================
                        LEFT COLUMN: TILTED HERO, INSTRUCTIONS & SAMPLE PRESETS
                       ======================================================== */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

                        {/* Navigation Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start w-full">
                            <Link
                                href="/"
                                className="bg-[#fffbe0] hover:bg-[#ffd83f] text-black font-extrabold px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 text-xs sm:text-sm"
                            >
                                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                                <span>Back to Classroom</span>
                            </Link>

                            <Link
                                href="/pdf-to-quiz"
                                className="bg-[#5cd0ff] hover:bg-blue-300 text-black font-extrabold px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 text-xs sm:text-sm"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Upload PDF Quiz</span>
                            </Link>
                        </div>

                        {/* Tilted Capsule Badge ("YOUTUBE QUIZ") */}
                        <div className="space-y-3 pt-2">
                            <motion.div
                                initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                                animate={{ scale: 1, rotate: -4, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                whileHover={{ rotate: -1, scale: 1.02 }}
                                className="inline-block cursor-pointer select-none origin-center p-1"
                            >
                                <div className="bg-[#ffd83f] border-[3.5px] border-black rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 shadow-[5px_5px_0px_0px_#000] flex items-center justify-center">
                                    <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black tracking-wide text-[#ff5555] whitespace-nowrap leading-none [text-shadow:2px_2px_0px_#000,-2px_-2px_0px_#000,2px_-2px_0px_#000,-2px_2px_0px_#000,3px_3px_0px_#000]">
                                        YOUTUBE QUIZ
                                    </h1>
                                </div>
                            </motion.div>

                            {/* Secondary Capsule ("VIDEO TO EXAM") */}
                            <div>
                                <div className="inline-block bg-[#fffbe0] border-[3px] border-black rounded-full px-5 sm:px-6 py-1.5 shadow-[4px_4px_0px_0px_#000]">
                                    <h2 className="text-lg sm:text-xl font-black tracking-widest text-[#ff5555] whitespace-nowrap leading-none [text-shadow:1px_1px_0px_#000]">
                                        VIDEO TO EXAM
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-black/85 font-bold text-sm sm:text-base leading-relaxed">
                            Turn any educational YouTube video, tutorial, or conference talk into an interactive test. UniQuiz extracts subtitles (English, Hindi, Spanish & more) or analyzes the video syllabus.
                        </p>

                        {/* Sample Educational Videos Corkboard Card */}
                        <div className="w-full bg-[#fffbe0] border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000] text-left space-y-3">
                            <div className="flex items-center gap-2 font-black text-sm text-black">
                                <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
                                <span>Try 1-Click Sample Lectures:</span>
                            </div>

                            <div className="space-y-2">
                                {SAMPLE_VIDEOS.map((sample, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setLink(sample.url)}
                                        className={`w-full ${sample.color} hover:opacity-90 text-left p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-between group`}
                                    >
                                        <div className="min-w-0 pr-2">
                                            <p className="text-xs sm:text-sm font-black text-black leading-tight truncate">
                                                {sample.title}
                                            </p>
                                            <p className="text-[11px] font-bold text-black/60 mt-0.5">
                                                {sample.channel}
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-black uppercase bg-white border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] shrink-0 text-black">
                                            Use Link
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Multi-Language & Fail-Safe Notice */}
                        <div className="w-full bg-[#9b8bed] border-[2.5px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] text-left">
                            <h4 className="font-black text-xs sm:text-sm text-black">Automatic Multi-Language & Fallback</h4>
                            <p className="text-[11px] font-bold text-black/80 mt-1">
                                Supports English, Hindi, Spanish and auto-captions. If captions are disabled by the creator, questions are formulated from the video overview and syllabus.
                            </p>
                        </div>

                    </div>

                    {/* ========================================================
                        RIGHT COLUMN: MAIN INTERACTIVE STUDIO WORKSPACE
                       ======================================================== */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#fffbe0] border-[3.5px] border-black rounded-3xl p-6 sm:p-9 shadow-[8px_8px_0px_0px_#000] relative">

                            {/* Studio Header Bar */}
                            <div className="flex items-center justify-between border-b-2 border-black/15 pb-4 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-red-600 border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000]">
                                        <YoutubeIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-base sm:text-lg text-black leading-tight">
                                            YouTube Quiz Studio
                                        </h3>
                                        <p className="text-xs font-bold text-black/60">
                                            Paste any public video URL or video ID
                                        </p>
                                    </div>
                                </div>

                                <span className="hidden sm:inline-flex text-[11px] font-black uppercase bg-red-100 border border-black text-red-800 px-2.5 py-1 rounded-full shadow-[1px_1px_0px_0px_#000]">
                                    Watch & Shorts
                                </span>
                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* URL Input Box */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-wider text-black">
                                        Enter YouTube Video Link:
                                    </label>

                                    <div className="relative flex items-center bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] focus-within:shadow-[6px_6px_0px_0px_#000] transition-all">
                                        <div className="pl-4 pr-2 text-red-600 flex items-center justify-center shrink-0">
                                            <YoutubeIcon className="w-6 h-6" />
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            disabled={isLoading}
                                            className="w-full py-4 pr-24 bg-transparent text-sm sm:text-base font-bold text-black placeholder:text-black/40 focus:outline-none"
                                        />

                                        {/* Action buttons inside input */}
                                        <div className="absolute right-2.5 flex items-center gap-1.5">
                                            {link ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setLink("")}
                                                    disabled={isLoading}
                                                    title="Clear link"
                                                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-black transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handlePasteFromClipboard}
                                                    disabled={isLoading}
                                                    title="Paste from clipboard"
                                                    className="inline-flex items-center gap-1 bg-[#ffd83f] hover:bg-amber-300 text-black font-extrabold text-xs px-2.5 py-1.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                                                >
                                                    <ClipboardPaste className="w-3.5 h-3.5" />
                                                    <span className="hidden sm:inline">Paste</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Live YouTube Video Thumbnail Preview */}
                                {activeVideoId && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white border-2 border-black rounded-2xl p-3.5 shadow-[3px_3px_0px_0px_#000] flex items-center gap-4"
                                    >
                                        <div className="relative w-28 h-18 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 border-black bg-slate-900 shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://img.youtube.com/vi/${activeVideoId}/mqdefault.jpg`}
                                                alt="Video Thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                <div className="w-7 h-7 rounded-full bg-red-600 border border-white flex items-center justify-center shadow">
                                                    <Play className="w-3.5 h-3.5 text-white fill-current translate-x-0.5" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 mb-0.5">
                                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                <span>Video Detected & Verified</span>
                                            </div>
                                            <p className="text-xs font-bold text-black/70 truncate">
                                                Video ID: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-black/20">{activeVideoId}</span>
                                            </p>
                                            <p className="text-[11px] font-semibold text-black/50 mt-1">
                                                Ready to extract transcript and create test questions
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Feature Badges */}
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">10 MCQs</span>
                                        <span className="text-[10px] font-bold text-black/60">4 Options Each</span>
                                    </div>
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">Multi-Lang</span>
                                        <span className="text-[10px] font-bold text-black/60">Auto Captions</span>
                                    </div>
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">Teacher Hints</span>
                                        <span className="text-[10px] font-bold text-black/60">Explanations</span>
                                    </div>
                                </div>

                                {/* Submit Action Button */}
                                <button
                                    type="submit"
                                    disabled={!link.trim() || isLoading}
                                    className={`w-full py-4 px-6 rounded-2xl border-[3px] border-black font-black text-lg tracking-wide transition-all flex items-center justify-center gap-3 ${!link.trim() || isLoading
                                        ? "bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none"
                                        : "bg-[#22c55e] hover:bg-emerald-400 text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000]"
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin text-black" />
                                            <span>Analyzing Video & Generating Quiz...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 text-black fill-current" />
                                            <span>Generate 10-Question Quiz</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Progress / Loading State Widget */}
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        className="mt-6 bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000]"
                                    >
                                        <div className="flex items-center justify-between text-sm font-black text-black mb-2">
                                            <span className="flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full bg-amber-400 animate-ping inline-block" />
                                                Live Video Quiz Formulation
                                            </span>
                                            <span>{questions?.length ? `${questions.length} / 10 Questions` : "Extracting Transcript"}</span>
                                        </div>

                                        {/* Neo-brutalist Progress Bar */}
                                        <div className="w-full bg-slate-100 border-2 border-black rounded-full h-5 overflow-hidden p-0.5">
                                            <motion.div
                                                className="h-full bg-[#ffd83f] rounded-full border-r border-black"
                                                initial={{ width: "10%" }}
                                                animate={{
                                                    width: questions?.length ? `${Math.min(questions.length * 10, 100)}%` : "30%",
                                                }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                        <p className="text-xs font-bold text-black/70 text-center mt-3">
                                            {questions?.length
                                                ? `Formulating multiple-choice question #${questions.length + 1}...`
                                                : "Reading video closed captions & identifying core examination concepts..."}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Quick Classroom Help Tip */}
                            <div className="mt-6 pt-5 border-t-2 border-black/10 flex items-start gap-2.5 text-xs font-bold text-black/70">
                                <HelpCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
                                <p>
                                    Tip: Works with any public YouTube video, lecture course, or tutorial. If closed captions are disabled, UniQuiz automatically formulates questions from the video outline and topic.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </PageTransition>
        </div>
    );
}

