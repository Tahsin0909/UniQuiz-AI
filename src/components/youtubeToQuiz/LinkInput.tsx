"use client";
import React, { useState } from "react";
import Quiz from "../quiz";
import { questionsSchema } from "@/lib/schemas";
import { z } from "zod";

const LinkInput = () => {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>([]);
    // const [title, setTitle] = useState<string>();
    const [showhint, setShowHint] = useState(false)

    const clearPDF = () => {
        setQuestions([]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/generate-link-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoUrl: link }),
        });

        const data = await res.json();
        setQuestions(data);
        setLoading(false);
    };

    if (questions?.length > 1) {
        // setQuestions(partialQuestions as [])
        return (
            <Quiz showhint={showhint} setShowHint={setShowHint} title={"Quiz"} questions={questions as []} clearPDF={clearPDF} />
        );
    }

    return (
        <div className="p-4 max-w-md mx-auto pt-40">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter YouTube video link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
                >
                    {loading ? "Generating Quiz..." : "Generate Quiz"}
                </button>
            </form>
        </div>
    );
};

export default LinkInput;
