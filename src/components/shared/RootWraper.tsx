import React from 'react';

const RootWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default RootWrapper;