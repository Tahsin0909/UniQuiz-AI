/* eslint-disable react/no-unescaped-entities */
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Youtube, FileText, Link2, ArrowLeft, CheckCircle, X } from 'lucide-react';

type CardType = 'pdf' | 'youtube' | null;

interface DragState {
    isDragging: boolean;
    isValidFile: boolean;
}

const QuizCards: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<CardType>(null);
    const [dragState, setDragState] = useState<DragState>({ isDragging: false, isValidFile: false });
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState<{ pdf: boolean; youtube: boolean }>({ pdf: false, youtube: false });

    const validateFile = (file: File): boolean => {
        return file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024; // 10MB limit
    };

    const validateYouTubeUrl = (url: string): boolean => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
        return youtubeRegex.test(url);
    };

    const handleCardSelect = (cardType: CardType) => {
        setSelectedCard(cardType);
    };

    const handleBackToCards = () => {
        setSelectedCard(null);
        setUploadedFile(null);
        setYoutubeUrl('');
        setIsProcessing({ pdf: false, youtube: false });
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.items[0]?.getAsFile();
        setDragState({ isDragging: true, isValidFile: file ? validateFile(file) : false });
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragState({ isDragging: false, isValidFile: false });
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file && validateFile(file)) {
            setUploadedFile(file);
            setIsProcessing({ ...isProcessing, pdf: true });

            // Simulate processing
            setTimeout(() => {
                setIsProcessing({ ...isProcessing, pdf: false });
            }, 2000);
        }

        setDragState({ isDragging: false, isValidFile: false });
    }, [isProcessing]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setUploadedFile(file);
            setIsProcessing({ ...isProcessing, pdf: true });

            setTimeout(() => {
                setIsProcessing({ ...isProcessing, pdf: false });
            }, 2000);
        }
    };

    const handleYouTubeSubmit = () => {
        if (validateYouTubeUrl(youtubeUrl)) {
            setIsProcessing({ ...isProcessing, youtube: true });

            setTimeout(() => {
                setIsProcessing({ ...isProcessing, youtube: false });
            }, 2000);
        }
    };

    const resetPdfCard = () => {
        setUploadedFile(null);
        setIsProcessing({ ...isProcessing, pdf: false });
    };

    const resetYouTubeCard = () => {
        setYoutubeUrl('');
        setIsProcessing({ ...isProcessing, youtube: false });
    };

    // Initial cards view
    if (!selectedCard) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
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
                            onClick={() => handleCardSelect('pdf')}
                            className="cursor-pointer group"
                        >
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full shadow-2xl hover:bg-white/15 transition-all duration-300">
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
        );
    }

    // Selected card view
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={handleBackToCards}
                    className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to options
                </motion.button>

                {/* PDF Selected Card */}
                {selectedCard === 'pdf' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">PDF to Quiz</h1>
                                <p className="text-slate-300 text-lg">Upload your PDF document to generate quizzes</p>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {uploadedFile && !isProcessing.pdf ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                                    <h3 className="text-2xl font-semibold text-white mb-4">File Uploaded Successfully!</h3>
                                    <p className="text-slate-300 mb-6 text-lg">{uploadedFile.name}</p>
                                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                        <button
                                            onClick={resetPdfCard}
                                            className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-colors duration-200"
                                        >
                                            Upload Another
                                        </button>
                                        <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-200">
                                            Generate Quiz
                                        </button>
                                    </div>
                                </motion.div>
                            ) : isProcessing.pdf ? (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
                                >
                                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                                    <h3 className="text-2xl font-semibold text-white mb-4">Processing PDF...</h3>
                                    <p className="text-slate-300 text-lg">This may take a few moments</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragState.isDragging
                                        ? dragState.isValidFile
                                            ? 'border-green-400 bg-green-500/10'
                                            : 'border-red-400 bg-red-500/10'
                                        : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                                        }`}
                                >
                                    <motion.div
                                        animate={dragState.isDragging ? { scale: 1.05 } : { scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <Upload className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300 ${dragState.isDragging
                                            ? dragState.isValidFile ? 'text-green-400' : 'text-red-400'
                                            : 'text-slate-400'
                                            }`} />
                                        <h3 className="text-2xl font-semibold text-white mb-4">
                                            {dragState.isDragging
                                                ? dragState.isValidFile
                                                    ? 'Drop to upload'
                                                    : 'Invalid file type'
                                                : 'Drag & drop your PDF here'
                                            }
                                        </h3>
                                        <p className="text-slate-300 mb-8 text-lg">
                                            {dragState.isDragging
                                                ? dragState.isValidFile
                                                    ? 'Release to upload your PDF'
                                                    : 'Only PDF files under 10MB are allowed'
                                                : 'or click to browse files (Max 10MB)'
                                            }
                                        </p>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                            id="pdf-upload"
                                        />
                                        <label
                                            htmlFor="pdf-upload"
                                            className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 text-lg font-medium"
                                        >
                                            <Upload className="w-5 h-5" />
                                            Browse Files
                                        </label>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* YouTube Selected Card */}
                {selectedCard === 'youtube' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl flex items-center justify-center">
                                <Youtube className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">YouTube to Quiz</h1>
                                <p className="text-slate-300 text-lg">Enter a YouTube video URL to generate quizzes</p>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {isProcessing.youtube ? (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-8 text-center"
                                >
                                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                                    <h3 className="text-2xl font-semibold text-white mb-4">Processing Video...</h3>
                                    <p className="text-slate-300 text-lg">Analyzing video content</p>
                                    <button
                                        onClick={resetYouTubeCard}
                                        className="mt-6 text-slate-300 hover:text-white transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="input"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <Link2 className="w-20 h-20 text-slate-400 mx-auto mb-6" />
                                        <h3 className="text-2xl font-semibold text-white mb-4">Enter YouTube URL</h3>
                                        <p className="text-slate-300 text-lg">Paste the link to any YouTube video</p>
                                    </div>

                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={youtubeUrl}
                                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-200 text-lg"
                                            />
                                            {youtubeUrl && (
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    onClick={() => setYoutubeUrl('')}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                                                >
                                                    <X className="w-5 h-5" />
                                                </motion.button>
                                            )}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleYouTubeSubmit}
                                            disabled={!validateYouTubeUrl(youtubeUrl)}
                                            className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl transition-all duration-200 font-medium text-lg"
                                        >
                                            Generate Quiz from Video
                                        </motion.button>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
                                        <h4 className="text-lg font-medium text-white mb-3">Supported formats:</h4>
                                        <ul className="text-slate-300 space-y-2">
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                YouTube video URLs
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                YouTube Shorts
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                Embedded YouTube links
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default QuizCards;