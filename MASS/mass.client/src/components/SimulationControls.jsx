import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { SharedContext } from "./SharedContext";

const ControlButtons = () => {
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

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null); // For hover effects
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

    const start = () => {
        setIsRunning(true);
        if (param25.value === "Press Start") {
            param25.value = new Date().toLocaleTimeString();
        }
        //setIsPaused(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const exit = () => {
        const fallingVelocity = param14.value;
        const landerAltitude = param17.value;
        param14.value = fallingVelocity;
        param17.value = landerAltitude;
        //setParam14(...prev, value = param14);
        //setParam17(...prev, value = param17);
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