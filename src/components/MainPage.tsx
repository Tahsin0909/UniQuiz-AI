/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    FileText,
    Sparkles,
    Video,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ==========================================
// CUSTOM SVG ICONS MATCHING DEMO ILLUSTRATIONS
// ==========================================

const AgendaIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Spiral Binder Header */}
        <rect
            x="12"
            y="8"
            width="40"
            height="12"
            rx="3"
            fill="#FCD34D"
            stroke="#000"
            strokeWidth="2.5"
        />
        <line x1="18" y1="5" x2="18" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="5" x2="26" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="34" y1="5" x2="34" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="5" x2="42" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        {/* Paper Body */}
        <rect
            x="12"
            y="18"
            width="40"
            height="38"
            rx="2"
            fill="#FFFFFF"
            stroke="#000"
            strokeWidth="2.5"
        />
        {/* Lined content */}
        <line x1="19" y1="28" x2="45" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="36" x2="45" y2="36" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="44" x2="38" y2="44" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const ResourcesIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Magnifying Glass Glass Ring */}
        <circle
            cx="27"
            cy="27"
            r="16"
            fill="#FCE7F3"
            stroke="#000"
            strokeWidth="2.5"
        />
        {/* Inner rim */}
        <circle
            cx="27"
            cy="27"
            r="12"
            fill="#FDE68A"
            stroke="#000"
            strokeWidth="2"
        />
        {/* Glass shine */}
        <path
            d="M21 21A8 8 0 0 1 31 19"
            stroke="#FFF"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        {/* Diagonal Handle */}
        <rect
            x="36"
            y="38"
            width="8"
            height="18"
            rx="3"
            transform="rotate(-45 36 38)"
            fill="#F472B6"
            stroke="#000"
            strokeWidth="2.5"
        />
        {/* Collar */}
        <rect
            x="35"
            y="35"
            width="7"
            height="4"
            rx="1"
            transform="rotate(-45 35 35)"
            fill="#FCD34D"
            stroke="#000"
            strokeWidth="2"
        />
    </svg>
);

const NewsIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Document with Dog-ear */}
        <path
            d="M16 10H48V42L36 54H16V10Z"
            fill="#FFFFFF"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        {/* Folded corner */}
        <path
            d="M36 42H48L36 54V42Z"
            fill="#E2E8F0"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        {/* Text Lines */}
        <line x1="22" y1="20" x2="42" y2="20" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="28" x2="42" y2="28" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="36" x2="38" y2="36" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const TimerIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Top Button / Loop */}
        <rect x="27" y="6" width="10" height="6" rx="2" fill="#FCD34D" stroke="#000" strokeWidth="2" />
        <line x1="23" y1="9" x2="27" y2="9" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="37" y1="9" x2="41" y2="9" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        {/* Main Watch Body */}
        <circle cx="32" cy="36" r="20" fill="#FF7043" stroke="#000" strokeWidth="2.5" />
        {/* Inner Screen */}
        <rect
            x="18"
            y="26"
            width="28"
            height="18"
            rx="4"
            fill="#FFFFFF"
            stroke="#000"
            strokeWidth="2"
        />
        {/* 60:00 Digital Text */}
        <text
            x="32"
            y="39"
            textAnchor="middle"
            fill="#000"
            fontSize="8.5"
            fontFamily="monospace"
            fontWeight="900"
        >
            60:00
        </text>
    </svg>
);

const PoliciesIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Outer badge circle */}
        <circle cx="32" cy="32" r="20" fill="#FCD34D" stroke="#000" strokeWidth="2.5" />
        {/* Inner dashed ring */}
        <circle cx="32" cy="32" r="15" fill="#FEF08A" stroke="#000" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Green Checkmark */}
        <path
            d="M23 32L29 38L41 26"
            stroke="#16A34A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M23 32L29 38L41 26"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const StarIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Lightbulb glass */}
        <path
            d="M20 25C20 18.37 25.37 13 32 13C38.63 13 44 18.37 44 25C44 29.5 41.5 33.5 38 36V42H26V36C22.5 33.5 20 29.5 20 25Z"
            fill="#FCD34D"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        {/* Base Screw lines */}
        <rect x="26" y="42" width="12" height="4" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
        <rect x="28" y="46" width="8" height="4" rx="1" fill="#475569" stroke="#000" strokeWidth="2" />
        {/* Glow rays */}
        <line x1="32" y1="6" x2="32" y2="10" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="25" x2="16" y2="25" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        <line x1="48" y1="25" x2="52" y2="25" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="14" x2="21" y2="17" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
        <line x1="43" y1="17" x2="46" y2="14" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const TeacherIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Graduation cap top diamond */}
        <polygon
            points="32,14 56,24 32,34 8,24"
            fill="#334155"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        {/* Cap skull base */}
        <path
            d="M18 29V39C18 39 23 44 32 44C41 44 46 39 46 39V29"
            fill="#475569"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinejoin="round"
        />
        {/* Tassel */}
        <path d="M48 27V42L44 45" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="27" r="2.5" fill="#FCD34D" stroke="#000" strokeWidth="1.5" />
    </svg>
);

const CalendarCardIcon = () => (
    <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Red Binder Top */}
        <rect x="12" y="10" width="40" height="10" rx="3" fill="#EF4444" stroke="#000" strokeWidth="2.5" />
        {/* Hanging hooks */}
        <line x1="19" y1="7" x2="19" y2="12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="45" y1="7" x2="45" y2="12" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        {/* Calendar Sheet */}
        <rect x="12" y="20" width="40" height="34" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
        {/* Grid of Dots / Squares */}
        <rect x="18" y="28" width="5" height="4" fill="#334155" />
        <rect x="26" y="28" width="5" height="4" fill="#334155" />
        <rect x="34" y="28" width="5" height="4" fill="#334155" />
        <rect x="42" y="28" width="5" height="4" fill="#334155" />
        <rect x="18" y="36" width="5" height="4" fill="#334155" />
        <rect x="26" y="36" width="5" height="4" fill="#334155" />
        <rect x="34" y="36" width="5" height="4" fill="#334155" />
        <rect x="42" y="36" width="5" height="4" fill="#334155" />
        <rect x="18" y="44" width="5" height="4" fill="#334155" />
        <rect x="26" y="44" width="5" height="4" fill="#334155" />
        <rect x="34" y="44" width="5" height="4" fill="#EF4444" />
        <rect x="42" y="44" width="5" height="4" fill="#334155" />
    </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

const MainPage = () => {
    const router = useRouter();

    // Feature Cards for Column 1 (5 Cards)
    const col1Cards = [
        {
            id: "pdf-quiz",
            title: "PDF to Quiz",
            subtitle: "Upload notes, slides & textbooks",
            badge: "Instant AI",
            bgColor: "#5cd0ff",
            icon: <AgendaIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
        {
            id: "youtube-quiz",
            title: "YouTube to Quiz",
            subtitle: "Turn video links into 10 MCQs",
            badge: "Multi-Format",
            bgColor: "#fd8f51",
            icon: <Video className="w-9 h-9 text-white stroke-[2.5]" />,
            onClick: () => router.push("/youtube-to-quiz"),
        },
        {
            id: "gemini-engine",
            title: "Gemini 2.5 Flash",
            subtitle: "Ultra-fast neural intelligence",
            badge: "Google AI",
            bgColor: "#9b8bed",
            icon: <StarIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
        {
            id: "exam-mode",
            title: "Interactive Exam",
            subtitle: "4-color choice bars with live score",
            badge: "Active Recall",
            bgColor: "#f78bb0",
            icon: <PoliciesIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
        {
            id: "smart-hints",
            title: "Teacher's Hints",
            subtitle: "Context clues & reasoning steps",
            badge: "Smart Help",
            bgColor: "#ffd83f",
            icon: <ResourcesIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
    ];

    // Feature Cards for Column 2 (4 Cards)
    const col2Cards = [
        {
            id: "streaming",
            title: "Live Streaming",
            subtitle: "Zero-wait question formulation",
            badge: "Vercel AI",
            bgColor: "#5cd0ff",
            icon: <TimerIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
        {
            id: "multilingual",
            title: "Global Captions",
            subtitle: "English, Hindi, Spanish & more",
            badge: "Multi-Lang",
            bgColor: "#f78bb0",
            icon: <NewsIcon />,
            onClick: () => router.push("/youtube-to-quiz"),
        },
        {
            id: "scorecard",
            title: "Score & Analytics",
            subtitle: "Detailed answers & solution breakdown",
            badge: "Mastery",
            bgColor: "#fd8f51",
            icon: <TeacherIcon />,
            onClick: () => router.push("/pdf-to-quiz"),
        },
        {
            id: "fallback",
            title: "Fail-Safe Syllabus",
            subtitle: "Auto-topic test if captions off",
            badge: "Smart Fallback",
            bgColor: "#9b8bed",
            icon: <CalendarCardIcon />,
            onClick: () => router.push("/youtube-to-quiz"),
        },
    ];

    return (
        <div className="min-h-screen bg-[#3ea66b] text-black font-sans selection:bg-[#ffd83f] selection:text-black pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* ========================================================
                        LEFT COLUMN: TILTED PILL BANNER ("CLASSROOM HUB")
                       ======================================================== */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-center text-center space-y-6">

                        {/* Tilted Yellow Capsule ("UNI-QUIZ") */}
                        <motion.div
                            initial={{ scale: 0.8, rotate: -12, opacity: 0 }}
                            animate={{ scale: 1, rotate: -6, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            whileHover={{ rotate: -3, scale: 1.03 }}
                            className="relative cursor-pointer select-none"
                            onClick={() => router.push("/pdf-to-quiz")}
                        >
                            <div className="bg-[#ffd83f] border-[3.5px] border-black rounded-full px-8 py-3.5 sm:px-12 sm:py-4 shadow-[5px_5px_0px_0px_#000] flex items-center justify-center">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider text-[#ff5555] whitespace-nowrap leading-none [text-shadow:2px_2px_0px_#000,-2px_-2px_0px_#000,2px_-2px_0px_#000,-2px_2px_0px_#000,3px_3px_0px_#000]">
                                    UNI-QUIZ
                                </h1>
                            </div>
                        </motion.div>

                        {/* Cream Pill Capsule ("AI") */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer select-none"
                            onClick={() => router.push("/youtube-to-quiz")}
                        >
                            <div className="bg-[#fffbe0] border-[3.5px] border-black rounded-full px-12 py-2 sm:px-14 sm:py-3 shadow-[5px_5px_0px_0px_#000] flex items-center justify-center">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-widest text-[#ff5555] whitespace-nowrap leading-none [text-shadow:2px_2px_0px_#000,-2px_-2px_0px_#000,2px_-2px_0px_#000,-2px_2px_0px_#000,3px_3px_0px_#000]">
                                    AI
                                </h2>
                            </div>
                        </motion.div>

                        {/* Subtitle */}
                        <div className="pt-2">
                            <p className="text-black/85 font-bold text-sm sm:text-base mt-1 max-w-sm">
                                Turn your lecture PDFs and YouTube educational videos into interactive, high-yield quizzes within seconds.
                            </p>
                        </div>

                        {/* Quick Generator Launch Buttons */}
                        <div className="pt-3 flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => router.push("/pdf-to-quiz")}
                                className="bg-[#fffbe0] hover:bg-[#ffd83f] text-black font-extrabold px-5 py-2.5 rounded-xl border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 text-sm sm:text-base"
                            >
                                <FileText className="w-5 h-5 text-black" />
                                <span>PDF to Quiz</span>
                            </button>
                            <button
                                onClick={() => router.push("/youtube-to-quiz")}
                                className="bg-[#fd8f51] hover:bg-[#ff7043] text-black font-extrabold px-5 py-2.5 rounded-xl border-[2.5px] border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 text-sm sm:text-base"
                            >
                                <Video className="w-5 h-5 text-black" />
                                <span>YouTube Quiz</span>
                            </button>
                        </div>

                        {/* Key Pillars Badge */}
                        <div className="pt-1 flex items-center justify-center gap-2 text-xs font-black text-black/75">
                            <span className="bg-white/80 border border-black px-2 py-1 rounded-md shadow-[1px_1px_0px_0px_#000] flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                Gemini 2.5
                            </span>
                            <span className="bg-white/80 border border-black px-2 py-1 rounded-md shadow-[1px_1px_0px_0px_#000]">
                                10 MCQs
                            </span>
                            <span className="bg-white/80 border border-black px-2 py-1 rounded-md shadow-[1px_1px_0px_0px_#000]">
                                Instant Hints
                            </span>
                        </div>
                    </div>

                    {/* ========================================================
                        RIGHT SECTION: FEATURES LIST (2 COLUMNS, NO MODALS)
                       ======================================================== */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-xl mx-auto lg:max-w-none">

                            {/* COLUMN 1 (5 Cards) */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                {col1Cards.map((card, idx) => (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.08 * idx }}
                                        whileHover={{ scale: 1.02, x: 2, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={card.onClick}
                                        className="bg-[#fffbe0] border-[2.5px] border-black rounded-xl sm:rounded-2xl overflow-hidden flex items-center shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all cursor-pointer group"
                                    >
                                        {/* Left Icon Square with Distinct Color */}
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-r-[2.5px] border-black flex items-center justify-center p-2 transition-transform group-hover:scale-105 duration-200"
                                            style={{ backgroundColor: card.bgColor }}
                                        >
                                            {card.icon}
                                        </div>

                                        {/* Right Label & Details */}
                                        <div className="flex-1 px-3 sm:px-4 py-2.5 flex flex-col justify-center text-left">
                                            <div className="flex items-center justify-between gap-1.5">
                                                <span className="text-black font-black text-sm sm:text-base tracking-tight leading-snug group-hover:text-[#ff5555] transition-colors">
                                                    {card.title}
                                                </span>
                                                {/* {card.badge && (
                                                    <span className="text-[9px] sm:text-[10px] font-black uppercase bg-white border border-black px-1.5 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] shrink-0 text-black">
                                                        {card.badge}
                                                    </span>
                                                )} */}
                                            </div>
                                            <span className="text-black/70 font-bold text-xs mt-0.5 block leading-tight">
                                                {card.subtitle}
                                            </span>
                                        </div>

                                        {/* Small Arrow indicator on hover */}
                                        <div className="pr-3 text-black/40 group-hover:text-black group-hover:translate-x-0.5 transition-all">
                                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* COLUMN 2 (4 Cards) */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                {col2Cards.map((card, idx) => (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.12 * idx }}
                                        whileHover={{ scale: 1.02, x: 2, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={card.onClick}
                                        className="bg-[#fffbe0] border-[2.5px] border-black rounded-xl sm:rounded-2xl overflow-hidden flex items-center shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all cursor-pointer group"
                                    >
                                        {/* Left Icon Square with Distinct Color */}
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-r-[2.5px] border-black flex items-center justify-center p-2 transition-transform group-hover:scale-105 duration-200"
                                            style={{ backgroundColor: card.bgColor }}
                                        >
                                            {card.icon}
                                        </div>

                                        {/* Right Label & Details */}
                                        <div className="flex-1 px-3 sm:px-4 py-2.5 flex flex-col justify-center text-left">
                                            <div className="flex items-center justify-between gap-1.5">
                                                <span className="text-black font-black text-sm sm:text-base tracking-tight leading-snug group-hover:text-[#ff5555] transition-colors">
                                                    {card.title}
                                                </span>
                                                {/* {card.badge && (
                                                    <span className="text-[9px] sm:text-[10px] font-black uppercase bg-white border border-black px-1.5 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] shrink-0 text-black">
                                                        {card.badge}
                                                    </span>
                                                )} */}
                                            </div>
                                            <span className="text-black/70 font-bold text-xs mt-0.5 block leading-tight">
                                                {card.subtitle}
                                            </span>
                                        </div>

                                        {/* Small Arrow indicator on hover */}
                                        <div className="pr-3 text-black/40 group-hover:text-black group-hover:translate-x-0.5 transition-all">
                                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MainPage;