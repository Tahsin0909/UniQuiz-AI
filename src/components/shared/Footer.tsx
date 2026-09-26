import {
    BookOpen,
    Briefcase,
    ExternalLink,
    FileText,
    Heart,
    Home,
    Video,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-[#fffbe0] border-t-[3.5px] border-black text-black select-none z-10 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-black/20">
                    {/* UniQuiz AI Brand */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                        <Link
                            href="/"
                            className="flex items-center gap-2 group shrink-0"
                        >
                            {/* UniQuiz Logo */}
                            <div className="flex items-center gap-1.5">
                                <div className="bg-[#ffd83f] border-2 border-black rounded-full px-3 py-1 shadow-[2px_2px_0px_0px_#000] -rotate-2 group-hover:rotate-0 transition-transform">
                                    <span className="font-black text-xs sm:text-sm tracking-wide text-black">
                                        UNI-QUIZ
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Divider */}
                        <div className="hidden sm:block h-6 w-px bg-black/20" />

                        {/* Tagline */}
                        <p className="max-w-md text-xs sm:text-sm leading-relaxed text-black/65 font-medium">
                            Turn lecture PDFs and YouTube videos into
                            <span className="font-bold text-black"> interactive quizzes.</span>
                        </p>
                    </div>

                    {/* Right: Quick Action Buttons & Highlighted Hire Me CTA */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <Link
                            href="/"
                            className="bg-white hover:bg-[#ffd83f] text-black font-extrabold px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                        >
                            <Home className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/pdf-to-quiz"
                            className="bg-white hover:bg-[#5cd0ff] text-black font-extrabold px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF to Quiz</span>
                        </Link>

                        <Link
                            href="/youtube-to-quiz"
                            className="bg-white hover:bg-[#fd8f51] text-black font-extrabold px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                        >
                            <Video className="w-3.5 h-3.5" />
                            <span>YouTube to Quiz</span>
                        </Link>

                        <a
                            href="https://drive.google.com/drive/folders/1yLKtbtZpRErdulksb9W0wYae7xRjYj4S?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-[#f78bb0] text-black font-extrabold px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                        >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Sample PDF</span>
                        </a>
                    </div>
                </div>

                {/* Bottom Strip: Author, Hire Me, Social Links & Copyright */}
                <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-black/70">
                    <div className="flex items-center gap-1.5">
                        <span>Made with</span>
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
                        <span>by</span>
                        <a
                            href="https://tahsinzamandev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black font-black underline decoration-2 decoration-[#ff5555] hover:text-[#ff5555] transition-colors"
                        >
                            Tahsin Zaman
                        </a>
                        <span>• Classroom Hub Edition</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        <a
                            href="https://tahsinzamandev.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#ffd83f] hover:bg-yellow-300 text-black p-1.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1.5 px-2.5 font-black animate-pulse hover:animate-none"
                            aria-label="Portfolio & Hire Me"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                            </span>
                            <Briefcase className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Hire Me</span>
                        </a>

                        <a
                            href="https://github.com/Tahsin0909?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-slate-200 text-black p-1.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1.5 px-2.5 font-bold"
                            aria-label="GitHub Repositories"
                        >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/tahsin09/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#5cd0ff] hover:bg-blue-400 text-black p-1.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1.5 px-2.5 font-bold"
                            aria-label="LinkedIn Profile"
                        >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                            <span>LinkedIn</span>
                        </a>

                        <span className="text-black/50 ml-1">© 2026 UniQuiz AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;