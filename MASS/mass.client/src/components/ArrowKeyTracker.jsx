import React, { useState, useEffect } from 'react';

const ArrowKeyTracker = () => {
    const [isUpPressed, setIsUpPressed] = useState(false);
    const [isDownPressed, setIsDownPressed] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setIsUpPressed(true);  // Up arrow key is pressed
        }
        if (event.key === 'ArrowDown') {
            setIsDownPressed(true);  // Down arrow key is pressed
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowUp') {
            setIsUpPressed(false);  // Up arrow key is released
        }
        if (event.key === 'ArrowDown') {
            setIsDownPressed(false);  // Down arrow key is released
        }
    };

    // Set up event listeners on mount and clean up on unmount
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up event listeners when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);  // Empty dependency array means this effect runs only once on mount/unmount

    return (
        <div>
            <p>Press the up or down arrow keys:</p>
            <p>Up Arrow Pressed: {isUpPressed ? 'Yes' : 'No'}</p>
            <p>Down Arrow Pressed: {isDownPressed ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ArrowKeyTracker;