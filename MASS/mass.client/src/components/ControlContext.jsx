import React, { createContext, useState } from "react";

// Create the context
export const ControlContext = createContext();

// Create the provider component
export const ControlProvider = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);

    // Define state management functions
    const start = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const exit = () => {
        // Placeholder for navigation
    };

    return (
        <ControlContext.Provider
            value={{
                isRunning,
                isPaused,
                hoveredButton,
                setHoveredButton,
                start,
                pause,
                resume,
                exit,
            }}
        >
            {children}
        </ControlContext.Provider>
    );
};
