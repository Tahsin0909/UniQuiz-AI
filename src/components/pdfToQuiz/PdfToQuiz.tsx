"use client";

import { generateQuizTitle } from "@/app/(preview)/actions";
import PageTransition from "@/components/PageTransition";
import Quiz from "@/components/quiz";
import { questionSchema, questionsSchema } from "@/lib/schemas";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle,
    Download,
    FileCheck2,
    FileText,
    FileUp,
    HelpCircle,
    Loader2,
    Sparkles,
    Trash2,
    Video,
    Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function PdfToQuiz() {
    const [files, setFiles] = useState<File[]>([]);
    const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [title, setTitle] = useState<string>();
    const [showhint, setShowHint] = useState(false);

    const { object, submit, isLoading } = useObject({
        api: "/api/generate-quiz",
        schema: questionSchema,
        onError: (err) => {
            console.error("Quiz generation error:", err);
            toast.error(err.message || "Failed to generate quiz. Please check your document and try again.");
        },
    });

    useEffect(() => {
        if (object) {
            setQuestions(object as []);
        }
    }, [object]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari && isDragging) {
            toast.error(
                "Safari does not support drag & drop. Please use the file picker."
            );
            return;
        }

        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter(
            (file) =>
                file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
        );

        if (validFiles.length !== selectedFiles.length) {
            toast.error("Only PDF files under 5MB are allowed.");
        }

        setFiles(validFiles);
    };

    const encodeFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (files.length === 0) return;

        const encodedFiles = await Promise.all(
            files.map(async (file) => ({
                name: file.name,
                type: file.type,
                data: await encodeFileAsBase64(file),
            }))
        );
        submit({ files: encodedFiles });

        try {
            const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
            setTitle(generatedTitle);
        } catch {
            setTitle(encodedFiles[0].name.replace(/\.pdf$/i, "") || "Quiz");
        }
    };

    const clearPDF = () => {
        setFiles([]);
        setQuestions([]);
        setTitle(undefined);
    };

    if (questions?.length > 4) {
        return (
            <Quiz
                showhint={showhint}
                setShowHint={setShowHint}
                title={title ?? "Lecture Notes Quiz"}
                questions={questions as []}
                clearPDF={clearPDF}
            />
        );
    }

    return (
        <div
            className="w-full max-w-6xl mx-auto px-4 pt-28 md:pt-32 pb-20 select-none"
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragExit={() => setIsDragging(false)}
            onDragEnd={() => setIsDragging(false)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange({
                    target: { files: e.dataTransfer.files },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
        >
            <PageTransition>
                {/* 12-Column Responsive Classroom Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* ========================================================
                        LEFT COLUMN: TILTED HERO, INSTRUCTIONS & QUICK NAVIGATION
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
                                href="/youtube-to-quiz"
                                className="bg-[#fd8f51] hover:bg-[#ff7043] text-black font-extrabold px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 text-xs sm:text-sm"
                            >
                                <Video className="w-4 h-4" />
                                <span>YouTube Quiz</span>
                            </Link>
                        </div>

                        {/* Tilted Capsule Badge ("PDF TO QUIZ") */}
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
                                        PDF TO QUIZ
                                    </h1>
                                </div>
                            </motion.div>

                            {/* Secondary Capsule ("DOCUMENT EXAM") */}
                            <div>
                                <div className="inline-block bg-[#fffbe0] border-[3px] border-black rounded-full px-5 sm:px-6 py-1.5 shadow-[4px_4px_0px_0px_#000]">
                                    <h2 className="text-lg sm:text-xl font-black tracking-widest text-[#ff5555] whitespace-nowrap leading-none [text-shadow:1px_1px_0px_#000]">
                                        DOCUMENT EXAM
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-black/85 font-bold text-sm sm:text-base leading-relaxed">
                            Upload your lecture slides, syllabus, or textbook chapters. Gemini 2.5 Flash analyzes your documents and generates 10 high-yield multiple-choice questions with hints.
                        </p>

                        {/* Guidelines Corkboard Card */}
                        <div className="w-full bg-[#fffbe0] border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000] text-left space-y-3">
                            <div className="flex items-center gap-2 font-black text-sm text-black">
                                <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
                                <span>Exam Formulation Rules:</span>
                            </div>
                            <ul className="text-xs font-bold text-black/75 space-y-1.5 list-disc pl-4">
                                <li>Supports standard PDF documents up to 5MB.</li>
                                <li>Extracts key definitions, formulas & concepts.</li>
                                <li>Includes 4 colorful options and teacher's hint drawer.</li>
                                <li>Provides immediate score review and solutions.</li>
                            </ul>
                        </div>

                        {/* Sample Materials Card */}
                        <div className="w-full bg-[#5cd0ff] border-[2.5px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-between text-left">
                            <div>
                                <h4 className="font-black text-xs sm:text-sm text-black">Need sample study notes?</h4>
                                <p className="text-[11px] font-bold text-black/70">Test with a pre-configured university PDF</p>
                            </div>
                            <a
                                href="https://drive.google.com/drive/folders/1yLKtbtZpRErdulksb9W0wYae7xRjYj4S?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white hover:bg-slate-100 text-black font-extrabold px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs flex items-center gap-1.5 shrink-0"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Sample PDF</span>
                            </a>
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
                                    <div className="w-8 h-8 rounded-lg bg-[#ffd83f] border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000]">
                                        <FileText className="w-4 h-4 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-base sm:text-lg text-black leading-tight">
                                            Document Upload Studio
                                        </h3>
                                        <p className="text-xs font-bold text-black/60">
                                            Drag & drop your file or click to browse
                                        </p>
                                    </div>
                                </div>

                                <span className="hidden sm:inline-flex text-[11px] font-black uppercase bg-emerald-100 border border-black text-emerald-800 px-2.5 py-1 rounded-full shadow-[1px_1px_0px_0px_#000]">
                                    PDF Up to 5MB
                                </span>
                            </div>

                            {/* Dropzone Form */}
                            <form onSubmit={handleSubmitWithFiles} className="space-y-6">
                                <div
                                    className={`relative border-[3px] border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${isDragging
                                        ? "bg-[#5cd0ff]/20 border-black scale-[1.01] shadow-[4px_4px_0px_0px_#000]"
                                        : files.length > 0
                                            ? "bg-[#eafbf0] border-emerald-600 border-solid shadow-[3px_3px_0px_0px_#000]"
                                            : "bg-white border-black hover:bg-[#fff9d2] shadow-[4px_4px_0px_0px_#000]"
                                        }`}
                                >
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="application/pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                        disabled={isLoading}
                                    />

                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        {files.length > 0 ? (
                                            <div className="space-y-3.5">
                                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl border-[2.5px] border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
                                                    <FileCheck2 className="w-8 h-8 text-emerald-600 stroke-[2.5]" />
                                                </div>
                                                <div>
                                                    <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-white border border-black px-2.5 py-0.5 rounded-full mb-1.5 shadow-[1px_1px_0px_0px_#000]">
                                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>Ready for AI Analysis</span>
                                                    </div>
                                                    <h4 className="font-black text-base sm:text-lg text-black break-all max-w-sm mx-auto">
                                                        {files[0].name}
                                                    </h4>
                                                    <p className="text-xs font-bold text-black/60 mt-1">
                                                        {(files[0].size / (1024 * 1024)).toFixed(2)} MB • Ready to Generate 10 Questions
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3.5">
                                                <div className="w-16 h-16 bg-[#ffd83f] rounded-2xl border-[2.5px] border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#000]">
                                                    <FileUp className="w-8 h-8 text-black stroke-[2.5]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-base sm:text-lg text-black">
                                                        Drop your lecture PDF here, or click to browse
                                                    </h4>
                                                    <p className="text-xs font-bold text-black/60 mt-1">
                                                        Supports PDF files up to 5MB (Notes, Chapters, Slides)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Remove File Button */}
                                    {files.length > 0 && !isLoading && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFiles([]);
                                            }}
                                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-rose-600 hover:text-rose-700 bg-white border-2 border-black px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_#000] relative z-20 hover:bg-rose-50 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove File</span>
                                        </button>
                                    )}
                                </div>

                                {/* Feature Badges */}
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">10 Questions</span>
                                        <span className="text-[10px] font-bold text-black/60">Multiple Choice</span>
                                    </div>
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">Active Hints</span>
                                        <span className="text-[10px] font-bold text-black/60">Step Explanations</span>
                                    </div>
                                    <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_0px_#000]">
                                        <span className="block text-xs font-black text-black">Scorecard</span>
                                        <span className="text-[10px] font-bold text-black/60">Full Review</span>
                                    </div>
                                </div>

                                {/* Submit Action Button */}
                                <button
                                    type="submit"
                                    disabled={files.length === 0 || isLoading}
                                    className={`w-full py-4 px-6 rounded-2xl border-[3px] border-black font-black text-lg tracking-wide transition-all flex items-center justify-center gap-3 ${files.length === 0 || isLoading
                                        ? "bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none"
                                        : "bg-[#22c55e] hover:bg-emerald-400 text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000]"
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin text-black" />
                                            <span>Analyzing Document & Generating Quiz...</span>
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
                                                Live Quiz Formulation
                                            </span>
                                            <span>{questions?.length ? `${questions.length} / 10 Questions` : "Analyzing"}</span>
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
                                                : "Reading PDF notes and identifying core examination concepts..."}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Quick Classroom Help Tip */}
                            <div className="mt-6 pt-5 border-t-2 border-black/10 flex items-start gap-2.5 text-xs font-bold text-black/70">
                                <HelpCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
                                <p>
                                    Tip: For the highest quality test, upload clean lecture slides, textbook summaries, or problem sheets with headings and bullet points.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </PageTransition>
        </div>
    );
}
