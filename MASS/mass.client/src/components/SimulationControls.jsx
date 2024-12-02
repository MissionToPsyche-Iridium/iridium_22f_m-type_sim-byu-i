import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ControlButtons = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null); // For hover effects
    const navigate = useNavigate();
    useEffect(() => {
    console.log("isRunning:", isRunning);
    console.log("isPaused:", isPaused);
    }, [isRunning, isPaused]);

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

    const start = () => {
        setIsRunning(true);
        //setIsPaused(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const exit = () => {
        navigate('/main-menu-page');
    };

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