/* eslint-disable react/no-unescaped-entities */
"use client";

import { Question } from "@/lib/schemas";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lightbulb,
  RefreshCw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type QuizProps = {
  questions: Question[];
  clearPDF: () => void;
  title: string;
  showhint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
};

// 4 distinct card colors matching the demo reference image
const optionColors = [
  {
    bg: "#5cd0ff", // Sky Blue (Option A)
    hover: "#46c5f7",
    labelBg: "#ffffff",
  },
  {
    bg: "#fd8f51", // Coral / Orange (Option B)
    hover: "#f77d3b",
    labelBg: "#ffffff",
  },
  {
    bg: "#f78bb0", // Pastel Pink (Option C)
    hover: "#f2759e",
    labelBg: "#ffffff",
  },
  {
    bg: "#9b8bed", // Lavender / Purple (Option D)
    hover: "#8774e6",
    labelBg: "#ffffff",
  },
];

export default function Quiz({
  questions,
  clearPDF,
  showhint,
  setShowHint,
  title = "Quiz",
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const answerLabels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleSelectAnswer = (answer: string) => {
    if (!isSubmitted) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer;
      setAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setShowHint(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowHint(false);
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowHint(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctCount = questions.reduce((acc, q, index) => {
      return acc + (q.answer === answers[index] ? 1 : 0);
    }, 0);
    setScore(correctCount);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setScore(null);
    setCurrentQuestionIndex(0);
    setProgress(0);
    setShowHint(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! You're a true Quiz Master! 🌟";
    if (percentage >= 70) return "Great job! You really know this material! 👏";
    if (percentage >= 50) return "Good effort! Review the notes below to level up! 📚";
    return "Keep practicing! Review the explanations to master this topic! 💪";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 select-none">

      {/* ========================================================
          QUIZ IN PROGRESS: TWO-COLUMN REFERENCE DESIGN
         ======================================================== */}
      {!isSubmitted ? (
        <div className="space-y-6">

          {/* Top Banner (Yellow Box with Pink Icon Badge matching reference) */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-stretch bg-[#ffd83f] border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden">
              {/* Pink Icon Square Badge */}
              <div className="bg-[#f78bb0] border-r-[3px] border-black px-3 sm:px-4 py-2.5 flex items-center justify-center shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fef08a] border-2 border-black flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                </div>
              </div>

              {/* Title Text Banner */}
              <div className="flex-1 px-4 py-2.5 flex items-center justify-between">
                <h1 className="text-base sm:text-xl font-black text-black tracking-wider uppercase truncate">
                  {title || "CLASSROOM QUIZ"}
                </h1>
                <span className="text-xs sm:text-sm font-black bg-white border-2 border-black px-2.5 py-0.5 rounded-lg shrink-0 ml-2">
                  Q {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
            </div>

            {/* Exit to Main Hub Button */}
            <button
              onClick={clearPDF}
              className="bg-white hover:bg-slate-100 text-black p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
              title="Exit Quiz"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Progress Bar (Neo-brutalist) */}
          <div className="w-full bg-white border-2 border-black rounded-full h-4 overflow-hidden p-0.5 shadow-[2px_2px_0px_0px_#000]">
            <motion.div
              className="h-full bg-[#ffd83f] rounded-full border-r border-black"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Main Card Container (Ivory Cream Board) */}
          <div className="bg-[#fffbe0] border-[3.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >

                {/* ----------------------------------------------------
                    LEFT COLUMN: QUESTION PROMPT, BADGE & HINT
                   ---------------------------------------------------- */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Difficulty Badge & Question Number */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-black text-[#ffd83f] px-2.5 py-1 rounded-md border border-black">
                      Question {currentQuestionIndex + 1}
                    </span>

                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border-2 border-black ${currentQuestion.difficulty === "easy"
                          ? "bg-[#86efac] text-emerald-950"
                          : currentQuestion.difficulty === "medium"
                            ? "bg-[#ffd83f] text-amber-950"
                            : "bg-[#f87171] text-rose-950"
                        }`}
                    >
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  {/* Question Text (Bold, clean typography) */}
                  <h2 className="text-xl sm:text-2xl font-black text-black leading-snug tracking-tight">
                    {currentQuestion.question}
                  </h2>

                  {/* Hint Toggle Button */}
                  {currentQuestion.hint && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowHint(!showhint)}
                        className={`inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-xl border-2 border-black transition-all ${showhint
                            ? "bg-[#ffd83f] shadow-[2px_2px_0px_0px_#000]"
                            : "bg-white hover:bg-slate-100 shadow-[2px_2px_0px_0px_#000]"
                          }`}
                      >
                        <Lightbulb className={`w-4 h-4 ${showhint ? "text-amber-600 fill-amber-500" : "text-black"}`} />
                        <span>{showhint ? "Hide Hint" : "Need a Hint?"}</span>
                      </button>

                      {/* Expandable Hint Box */}
                      <AnimatePresence>
                        {showhint && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -5 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -5 }}
                            className="mt-3 bg-[#fef08a] border-2 border-black rounded-xl p-3.5 shadow-[2px_2px_0px_0px_#000] overflow-hidden"
                          >
                            <p className="text-xs font-extrabold text-black/80 mb-0.5 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              Teacher's Hint:
                            </p>
                            <p className="text-xs sm:text-sm text-black font-semibold">
                              {currentQuestion.hint}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Helper Tip */}
                  <p className="text-xs font-bold text-black/50 hidden lg:block pt-4">
                    Select the single best answer on the right to proceed.
                  </p>
                </div>

                {/* ----------------------------------------------------
                    RIGHT COLUMN: 4 COLORFUL OPTION BARS (MATCHING REFERENCE)
                   ---------------------------------------------------- */}
                <div className="lg:col-span-7 flex flex-col gap-3.5">
                  {currentQuestion.options.map((option, index) => {
                    const label = answerLabels[index];
                    const isSelected = selectedAnswer === label;
                    const color = optionColors[index % optionColors.length];

                    return (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => handleSelectAnswer(label)}
                        whileHover={{ scale: 1.015, x: 2, y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        className={`w-full text-left rounded-xl sm:rounded-2xl border-[2.5px] border-black transition-all flex items-center p-3 sm:p-4 shadow-[4px_4px_0px_0px_#000] ${isSelected
                            ? "ring-4 ring-black shadow-[6px_6px_0px_0px_#000] -translate-y-0.5 -translate-x-0.5"
                            : "hover:shadow-[6px_6px_0px_0px_#000]"
                          }`}
                        style={{ backgroundColor: color.bg }}
                      >
                        {/* Letter Identifier Badge */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-black flex items-center justify-center font-black text-sm sm:text-base shrink-0 mr-3.5 shadow-[1.5px_1.5px_0px_0px_#000] ${isSelected
                              ? "bg-black text-[#ffd83f]"
                              : "bg-white text-black"
                            }`}
                        >
                          {label}
                        </div>

                        {/* Option Text */}
                        <span className="flex-1 font-extrabold text-sm sm:text-base text-black leading-snug">
                          {option}
                        </span>

                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="ml-2 w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-[#ffd83f] stroke-[3]" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Controls (Previous & Next/Submit) */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t-2 border-black/15">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`font-black px-4 py-2.5 rounded-xl border-2 border-black text-sm transition-all flex items-center gap-1.5 ${currentQuestionIndex === 0
                    ? "bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none"
                    : "bg-white hover:bg-slate-100 text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                  }`}
              >
                <ChevronLeft className="w-4 h-4 stroke-[3]" />
                <span>Previous</span>
              </button>

              <span className="text-xs sm:text-sm font-black text-black/70">
                {selectedAnswer ? "Answer Selected ✓" : "Choose an option"}
              </span>

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`font-black px-6 py-2.5 rounded-xl border-[2.5px] border-black text-sm transition-all flex items-center gap-1.5 ${selectedAnswer === null
                    ? "bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none"
                    : currentQuestionIndex === questions.length - 1
                      ? "bg-[#22c55e] hover:bg-emerald-400 text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                      : "bg-[#ffd83f] hover:bg-amber-300 text-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                  }`}
              >
                <span>{currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next"}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      ) : (

        /* ========================================================
            QUIZ COMPLETED: RESULTS & DETAILED REVIEW SCREEN
           ======================================================== */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Score Card Banner */}
          <div className="bg-[#fffbe0] border-[3.5px] border-black rounded-3xl p-8 sm:p-12 text-center shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">

            {/* Tilted Trophy / Star Badge */}
            <div className="w-20 h-20 bg-[#ffd83f] border-[3px] border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#000] transform -rotate-3 hover:rotate-0 transition-transform">
              <Trophy className="w-10 h-10 text-black stroke-[2.5]" />
            </div>

            <div className="inline-block bg-[#f78bb0] border-2 border-black rounded-full px-4 py-1 mb-3 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-xs font-black uppercase tracking-wider text-black">
                Quiz Complete
              </span>
            </div>

            {/* Score Percentage */}
            <h2 className="text-5xl sm:text-6xl font-black text-black tracking-tight mb-2">
              {Math.round(((score ?? 0) / questions.length) * 100)}%
            </h2>

            <p className="text-lg sm:text-xl font-black text-black">
              You got {score} out of {questions.length} questions correct!
            </p>

            <p className="text-sm sm:text-base font-bold text-black/70 max-w-md mx-auto mt-2">
              {getScoreMessage(Math.round(((score ?? 0) / questions.length) * 100))}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-8 mt-6 border-t-2 border-black/15">
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#ffd83f] hover:bg-amber-300 text-black font-black px-6 py-3 rounded-2xl border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                <span>Retake Quiz</span>
              </button>

              <button
                type="button"
                onClick={clearPDF}
                className="bg-white hover:bg-slate-100 text-black font-black px-6 py-3 rounded-2xl border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Upload Another PDF</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-[#fffbe0] border-[3.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black/15">
              <div className="w-10 h-10 rounded-xl bg-[#5cd0ff] border-2 border-black flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-black">
                  Detailed Answers & Explanations
                </h3>
                <p className="text-xs sm:text-sm font-bold text-black/60">
                  Review the correct answers and verified source text
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {questions.map((question, qIdx) => {
                const userAnswer = answers[qIdx];
                const isCorrect = userAnswer === question.answer;

                return (
                  <div
                    key={qIdx}
                    className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000]"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded-md">
                          #{qIdx + 1}
                        </span>
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded-md border border-black ${isCorrect
                              ? "bg-[#86efac] text-emerald-950"
                              : "bg-[#f87171] text-rose-950"
                            }`}
                        >
                          {isCorrect ? "Correct ✓" : "Incorrect ✕"}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-black/50 capitalize">
                        {question.difficulty}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base sm:text-lg text-black mb-4">
                      {question.question}
                    </h4>

                    {/* Options Review */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      {question.options.map((opt, optIdx) => {
                        const optLabel = answerLabels[optIdx];
                        const isThisCorrect = optLabel === question.answer;
                        const isThisUserSelection = optLabel === userAnswer;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border-2 border-black flex items-center justify-between text-xs sm:text-sm font-bold ${isThisCorrect
                                ? "bg-[#86efac] text-emerald-950"
                                : isThisUserSelection
                                  ? "bg-[#f87171] text-rose-950"
                                  : "bg-slate-50 text-black/70"
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-white border border-black flex items-center justify-center font-black text-xs text-black">
                                {optLabel}
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isThisCorrect && (
                              <Check className="w-4 h-4 text-emerald-800 stroke-[3] shrink-0" />
                            )}
                            {isThisUserSelection && !isThisCorrect && (
                              <X className="w-4 h-4 text-rose-800 stroke-[3] shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Source Text / Explanation */}
                    {question.sourceText && (
                      <div className="bg-[#fffbe0] border border-black rounded-xl p-3 text-xs">
                        <span className="font-black text-black uppercase tracking-wider block mb-0.5">
                          📖 Source Context:
                        </span>
                        <p className="text-black/80 font-medium leading-relaxed">
                          {question.sourceText}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}

