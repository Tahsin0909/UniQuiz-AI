import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='max-w-6xl mx-auto w-full rounded-full'>
            <div className='text-white p-6 absolute max-w-6xl w-full mt-4 rounded-full bg-white/10 backdrop-blur-xl' >
                <Link href={"/"}>
                    <Home />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;