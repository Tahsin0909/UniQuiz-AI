"use client";
import React, { useState } from "react";

const LinkInput = () => {
    const [link, setLink] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Your link is: ${link}`);
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your link"
                    value={link}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
            <p className="mt-2">Current Link: {link}</p>
        </div>
    );
};

export default LinkInput;
