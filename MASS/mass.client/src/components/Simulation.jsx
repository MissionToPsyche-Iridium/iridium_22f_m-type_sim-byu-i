import React, { useContext, useState, useEffect } from 'react';
import ParameterPanel from "./ParameterPanel";
import SimulationView from "./SimulationView";
import SimulationControls from "./SimulationControls";
import { SharedContext } from "./SharedContext";

function Simulation() {
    // Import parameters from SharedContext
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19
    } = useContext(SharedContext);

    const [items, setItems] = useState([
        param13,
        param14,
        param15,
        param17,
        param18,
    ]);

    // Arrow Key States
    const [isUpPressed, setIsUpPressed] = useState(false);
    const [isDownPressed, setIsDownPressed] = useState(false);

    // Arrow Key Handlers
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setIsUpPressed(true);
        }
        if (event.key === 'ArrowDown') {
            setIsDownPressed(true);
            console.log("Down key pressed");
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

    // Set up and clean up event listeners for arrow keys
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Update param19 when the down arrow key is pressed
    useEffect(() => {
        setParam19((prev) => ({
            ...prev,
            value: isDownPressed ? "On" : "Off",
        }));
    }, [isDownPressed, setParam19]);

    return (
        <div className="simulation">
            {/* Parameter panel will be on the left */}
            <ParameterPanel />

            {/* Simulator view and simulation controls */}
            <div className="view-controls">
                <SimulationView />
                <SimulationControls />
            </div>
        </div>
    );
}

export default Simulation;
