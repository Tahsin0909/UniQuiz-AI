import React from "react";
import { Loader2 } from "lucide-react";

interface SharedButtonProps {
    title?: string; // button text
    loadingText?: string; // text while loading
    isLoading?: boolean; // optional loading state
    disabled?: boolean; // optional disabled
    onClick?: () => void; // click handler
}

const SharedButton: React.FC<SharedButtonProps> = ({
    title = "Submit",
    loadingText = "Loading...",
    isLoading = false,
    disabled = false,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 w-full ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
        >
            <span className="text-lg">
                {isLoading ? (
                    <span className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{loadingText}</span>
                    </span>
                ) : (
                    title
                )}
            </span>

            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative h-full w-10 bg-white/20"></div>
            </div>
        </button>
    );
};

export default SharedButton;
