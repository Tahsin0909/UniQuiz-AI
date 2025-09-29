/* eslint-disable react/no-unescaped-entities */
"use client"
import { motion } from 'framer-motion';
import { FileText, Link2, Upload, Youtube } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MainPage = () => {
    const router = useRouter()
    const handleCardSelect = (page: string) => {
        console.log(page)
        router.push(page)
    }
    return (
        <div>
            <div

                className="min-h-screen  p-4 md:p-8 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        >
                            Quiz Generator
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
                        >
                            Choose your content source to create engaging quizzes
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* PDF Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCardSelect('pdf-to-quiz')}
                            className="cursor-pointer group"
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full shadow-2xl hover:bg-white/15 ">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <FileText className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Generate Quiz from PDF</h2>
                                    <p className="text-slate-300 text-lg mb-8">
                                        Upload your PDF document and we'll create interactive quizzes from the content
                                    </p>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-center gap-3 text-slate-300">
                                            <Upload className="w-5 h-5" />
                                            <span>Drag & Drop or Browse</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* YouTube Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCardSelect('youtube')}
                            className="cursor-pointer group"
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full shadow-2xl hover:bg-white/15 transition-all duration-300">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Youtube className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Generate Quiz from YouTube</h2>
                                    <p className="text-slate-300 text-lg mb-8">
                                        Paste a YouTube video URL and we'll analyze the content to create quizzes
                                    </p>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-center gap-3 text-slate-300">
                                            <Link2 className="w-5 h-5" />
                                            <span>Enter YouTube URL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MainPage;