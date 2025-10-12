"use client";
import React, { useState } from "react";

const LinkInput = () => {
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResult("");

        const res = await fetch("/api/generate-youtube-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoUrl: link }),
        });

        const data = await res.text();
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
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

            {result && (
                <div className="mt-4 border p-2 bg-gray-50 rounded">
                    <h2 className="font-semibold mb-2">Generated Quiz:</h2>
                    <pre className="text-sm whitespace-pre-wrap">{result}</pre>
                </div>
            )}
        </div>
    );
};

export default LinkInput;
