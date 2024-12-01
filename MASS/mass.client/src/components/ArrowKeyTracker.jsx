import React, { createContext, useState, useEffect } from 'react';

export const ArrowKeyContext = createContext();

const ArrowKeyProvider = ({ children }) => {
    const [isUpPressed, setIsUpPressed] = useState(false);
    const [isDownPressed, setIsDownPressed] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setIsUpPressed(true);
        }
        if (event.key === 'ArrowDown') {
            setIsDownPressed(true);
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowUp') {
            setIsUpPressed(false);
        }
        if (event.key === 'ArrowDown') {
            setIsDownPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <ArrowKeyContext.Provider value={{ isUpPressed, isDownPressed }}>
            {children}
        </ArrowKeyContext.Provider>
    );
};

export default ArrowKeyProvider;
