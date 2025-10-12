import React from 'react';

const RootWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='pt-40 h-full'>
            {children}
        </div>
    );
};

export default RootWrapper;