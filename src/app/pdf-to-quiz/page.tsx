"use client";

import PageTransition from "@/components/PageTransition";
import Quiz from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { questionSchema, questionsSchema } from "@/lib/schemas";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { AnimatePresence, motion } from "framer-motion";
import { DoorClosed, FileUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { generateQuizTitle } from "../(preview)/actions";



export default function ChatWithFiles() {
    const [files, setFiles] = useState<File[]>([]);
    const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [title, setTitle] = useState<string>();
    const [showhint, setShowHint] = useState(false)



    const { object, submit, isLoading } = useObject({
        api: '/api/generate-quiz',
        schema: questionSchema,
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
                "Safari does not support drag & drop. Please use the file picker.",
            );
            return;
        }

        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter(
            (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024,
        );
        // console.log(validFiles);

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
        const encodedFiles = await Promise.all(
            files.map(async (file) => ({
                name: file.name,
                type: file.type,
                data: await encodeFileAsBase64(file),
            })),
        );
        submit({ files: encodedFiles });

        const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
        setTitle(generatedTitle);
    };

    const clearPDF = () => {
        setFiles([]);
        setQuestions([]);
    };


    console.log(questions);

    if (questions?.length > 4) {
        // setQuestions(partialQuestions as [])
        return (
            <Quiz showhint={showhint} setShowHint={setShowHint} title={title ?? "Quiz"} questions={questions as []} clearPDF={clearPDF} />
        );
    }
    return (

        <div
            className="min-h-[100vh] w-full flex justify-center items-center container"
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
                console.log(e.dataTransfer.files);
                handleFileChange({
                    target: { files: e.dataTransfer.files },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
        >
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div>Drag and drop files here</div>
                        <div className="text-sm dark:text-zinc-400 text-zinc-500">
                            {"(PDFs only)"}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <PageTransition>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full shadow-2xl hover:bg-transparent transition-all duration-300">
                    <div className="text-center space-y-6">
                        <div className="mx-auto flex items-center justify-center space-x-2 ">
                            <div className="flex  items-center gap-2 p-2">
                                <DoorClosed className="text-white" />
                                <p className="text-lf font-semibold text-white">
                                    UniQuiz Ai
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white">
                                PDF Quiz Generator
                            </h1>
                            <div className="text-base text-white">
                                Upload a PDF to generate an interactive quiz based on its content
                                using.
                            </div>
                        </div>
                    </div>


                    <div>
                        <form onSubmit={handleSubmitWithFiles} className="space-y-4 my-8">
                            <div
                                className={`relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 transition-colors hover:border-muted-foreground/50  `}
                            >
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="application/pdf"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <FileUp className="h-8 w-8 mb-2  !text-white" />
                                <p className="text-sm  text-center !text-white">
                                    {files.length > 0 ? (
                                        <span className="font-medium text-foreground">
                                            {files[0].name}
                                        </span>
                                    ) : (
                                        <span>Drop your PDF here or click to browse.</span>
                                    )}
                                </p>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={files.length === 0}
                            >
                                {isLoading ? (
                                    <span className="flex items-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Generating Quiz...</span>
                                    </span>
                                ) : (
                                    "Generate Quiz"
                                )}
                            </Button>
                        </form>
                    </div>
                    {isLoading && (
                        <div className="flex flex-col space-y-4">
                            <div className="w-full space-y-1">
                                <div className="flex justify-between text-sm ">
                                    <span>Progress</span>
                                    {/* <span>{Math.round(progress)}%</span>  */}
                                </div>
                                {/* <Progress value={progress} className="h-2" /> */}
                            </div>
                            <div className="w-full space-y-2">
                                <div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
                                    <div
                                        className={`h-2 w-2 rounded-full ${isLoading ? "bg-yellow-500/50 animate-pulse" : "bg-muted"
                                            }`}
                                    />
                                    <span className=" text-nowrap text-center col-span-4 sm:col-span-2">
                                        {questions
                                            ? `Generating question ${questions.length + 1} of 10`
                                            : "Analyzing PDF content"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PageTransition>
        </div>

    );
}
