import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { SharedContext } from "./SharedContext";

// This component provides the buttons necessary for simulator control
const ControlButtons = () => {

    // Import the parameters for use
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param16, setParam16,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19,
        param20, setParam20,
        param21, setParam21,
        param22, setParam22,
        param25, setParam25,
    } = useContext(SharedContext);

    // Set variables for simulation state, button highlighting
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null); // For hover effects

    // Set object for useNavigate function, to move between components
    const navigate = useNavigate();


    useEffect(() => {
    console.log("isRunning:", isRunning);
    console.log("isPaused:", isPaused);
    }, [isRunning, isPaused]);

    //This allows me to make CSSest styles
    const styles = {
        button: {
            background: '#007bff',
            color: '#fff',
            fontSize: '16px',
            textAlign: 'center',
            margin: '5px 5px',
            padding: '10px 20px',
            width: "40%",
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s',
        },
        buttonHover: {
            background: '#0056b3', // to do DoubleCheck color, this should make button darker when hovered
        },
    };

    const getButtonStyle = (buttonName) =>
        hoveredButton === buttonName
            ? { ...styles.button, ...styles.buttonHover }
            : styles.button;

    // function for start button
    const start = () => {
        setIsRunning(true);

        // set start time parameter
        if (param25.value === "Press Start") {
            param25.value = new Date().toLocaleTimeString();
        }
        //setIsPaused(false);
    };

    // function for pause button
    const pause = () => {
        setIsPaused(true);
    };

    // function for resume button
    const resume = () => {
        setIsPaused(false);
    };

    // function for exit button
    const exit = () => {
        navigate('/main-menu-page');
    };

    // Update param21 when isRunning is changed
    useEffect(() => {
        setParam21((prev) => {
            const updated = {
                ...prev,
                value: isRunning ? "True" : "False",
            };
            console.log("Updated param21:", updated); // Log the updated param21
            return updated;
        });
    }, [isRunning, setParam21]);

    // Update param22 when isPaused is changed
    useEffect(() => {
        setParam22((prev) => {
            const updated = {
                ...prev,
                value: isPaused ? "True" : "False",
            };
            console.log("Updated param22:", updated); // Log the updated param22
            return updated;
        });
    }, [isPaused, setParam22]);

    // Display simulator controls in simulation component
    return (
        <div className="simulator-controls">
            <div>
                <button
                    style={getButtonStyle("start")}
                    onMouseEnter={() => setHoveredButton("start")}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={start}
                    disabled={isRunning}>
                    Start
                </button>
                <button
                    style={getButtonStyle("exit")}
                    onMouseEnter={() => setHoveredButton("exit")}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={exit}
                    disabled={!isRunning}>
                    Exit
                </button>
            </div>
            <div>
                <button
                    style={getButtonStyle("pause")}
                    onMouseEnter={() => setHoveredButton("pause")}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={pause}
                    disabled={!isRunning || isPaused}>
                    Pause
                </button>
                <button
                    style={getButtonStyle("resume")}
                    onMouseEnter={() => setHoveredButton("resume")}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={resume}
                    disabled={!isRunning || !isPaused}>
                    Resume
                </button>
            </div>
        </div>
    );
};

export default ControlButtons;