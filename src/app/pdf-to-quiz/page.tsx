"use client";

import { GitIcon } from "@/components/icons";
import PageTransition from "@/components/PageTransition";
import Quiz from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { questionSchema, questionsSchema } from "@/lib/schemas";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { AnimatePresence, motion } from "framer-motion";
import { DoorClosed, FileUp, Loader2 } from "lucide-react";
import NextLink from "next/link";
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




            <motion.div
                className="flex flex-row gap-4 items-center justify-between fixed bottom-6 text-xs right-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <NextLink
                    target="_blank"
                    href="https://drive.google.com/drive/folders/1yLKtbtZpRErdulksb9W0wYae7xRjYj4S?usp=sharing"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="none" stroke="#ed8796" strokeLinecap="round" strokeLinejoin="round" d="M2.8 14.34c1.81-1.25 3.02-3.16 3.91-5.5c.9-2.33 1.86-4.33 1.44-6.63c-.06-.36-.57-.73-.83-.7c-1.02.06-.95 1.21-.85 1.9c.24 1.71 1.56 3.7 2.84 5.56c1.27 1.87 2.32 2.16 3.78 2.26c.5.03 1.25-.14 1.37-.58c.77-2.8-9.02-.54-12.28 2.08c-.4.33-.86 1-.6 1.46c.2.36.87.4 1.23.15h0Z" strokeWidth="1" /></svg>
                    Demo PDF
                </NextLink>

                <NextLink
                    target="_blank"
                    href="https://github.com/Tahsin0909?tab=repositories"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                    <GitIcon />
                    View Github
                </NextLink>
                <NextLink
                    target="_blank"
                    href="https://www.linkedin.com/in/tahsin09/"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0a66c2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" /></g></svg>
                    Linkedin
                </NextLink>
            </motion.div>
        </div>

    );
}
