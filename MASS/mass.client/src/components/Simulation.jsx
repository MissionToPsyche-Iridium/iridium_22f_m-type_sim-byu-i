import React, { useContext, useState, useEffect } from 'react';
import ParameterPanel from "./ParameterPanel";
import SimulationView from "./SimulationView";
import SimulationControls from "./SimulationControls";
import { SharedContext } from "./SharedContext";

function Simulation() {

    const [parameters, setParameters] = useState();
    
    useEffect(() => {
        updateParameters({ /* JSON data to send to the server */ });
    }, []);

    // Import parameters from SharedContext
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19,
        param20, setParam20
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
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
        }
    
        if (event.key === "ArrowUp") {
            setIsUpPressed(true);
            console.log("Up key pressed");
        }
    
        if (event.key === "ArrowDown") {
            setIsDownPressed(true);
            console.log("Down key pressed");
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsUpPressed(false);
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
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
        setParam20((prev) => ({
            ...prev,
            value: isDownPressed ? "On" : "Off",
        }));
    }, [isDownPressed, setParam20]);

    // Update param20 when the up arrow key is pressed
    useEffect(() => {
        setParam19((prev) => ({
            ...prev,
            value: isUpPressed ? "On" : "Off",
        }));
    }, [isUpPressed, setParam19]);



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

async function updateParameters(jsonData) {
    // Test data to send to the server
    const isoStringDate = new Date().toISOString();
    jsonData = {
        Id: 1234,
        TimeStart: isoStringDate,
        CurrentTime: isoStringDate,
        LastTime: isoStringDate,
        ThrustOn: true,
        ShipAltitude: 300,
        PriorAltitude: 400,
        FuelRemaining: 200
    }

    try {
        const response = await fetch("https://localhost:7248/api/parameters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response from the server:", result);


        setParameters(result);

    } catch (error) {
        console.error("Error fetching data from the server:", error);
    }
}

export default Simulation;
