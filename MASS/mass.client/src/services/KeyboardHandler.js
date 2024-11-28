import { useState, useEffect } from 'react';

const useKeyTracker = () => {
    const [keys, setKeys] = useState({
        ArrowUp: false,
        ArrowDown: false,
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                setKeys((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: true,
                }));
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                setKeys((prevKeys) => ({
                    ...prevKeys,
                    [event.key]: false,
                }));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keys;
};

export default useKeyTracker;