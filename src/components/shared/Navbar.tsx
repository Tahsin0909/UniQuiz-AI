import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { GitIcon } from '../icons';

const Navbar = () => {
    return (
        <div className='max-w-6xl mx-auto w-full rounded-full'>
            <div className='text-white p-6 absolute max-w-6xl w-full mt-4 rounded-full bg-white/10 backdrop-blur-xl' >
                <Link href={"/"}>
                    <Home />
                </Link>
                <Link
                    target="_blank"
                    href="https://drive.google.com/drive/folders/1yLKtbtZpRErdulksb9W0wYae7xRjYj4S?usp=sharing"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="none" stroke="#ed8796" strokeLinecap="round" strokeLinejoin="round" d="M2.8 14.34c1.81-1.25 3.02-3.16 3.91-5.5c.9-2.33 1.86-4.33 1.44-6.63c-.06-.36-.57-.73-.83-.7c-1.02.06-.95 1.21-.85 1.9c.24 1.71 1.56 3.7 2.84 5.56c1.27 1.87 2.32 2.16 3.78 2.26c.5.03 1.25-.14 1.37-.58c.77-2.8-9.02-.54-12.28 2.08c-.4.33-.86 1-.6 1.46c.2.36.87.4 1.23.15h0Z" strokeWidth="1" /></svg>
                    Demo PDF
                </Link>
                <Link
                    target="_blank"
                    href="https://github.com/Tahsin0909?tab=repositories"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                    <GitIcon />
                    View Github
                </Link>
                <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/tahsin09/"
                    className="flex flex-row gap-2 items-center border px-2 py-1.5 rounded-md bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60" /><rect width="256" height="256" fill="#0a66c2" rx="60" /><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4" /></g></svg>
                    Linkedin
                </Link>
            </div>

        </div>
    );
};

export default Navbar;