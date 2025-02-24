'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', // Starts hidden at top
                    opacity: 0
                }}
                animate={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Expands down to reveal content
                    opacity: 1
                }}
                exit={{
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', // Closes from bottom
                    opacity: 0
                }}
                transition={{
                    clipPath: { duration: 1.2, ease: [0.45, 0.05, 0.55, 0.95] }, // Longer duration for clipPath
                    opacity: { duration: 0.6, delay: 0.2 } // Delay for more visible wipe effect
                }}
                style={{ overflow: 'hidden' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}