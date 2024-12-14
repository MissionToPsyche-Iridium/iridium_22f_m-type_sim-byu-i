import React, { useContext, useState, useEffect } from 'react';
import ParameterPanel from "./ParameterPanel";
import SimulationView from "./SimulationView";
import SamplingResults from './SamplingResults';
import SimulationControls from "./SimulationControls";
import { SharedContext } from "./SharedContext";
import updateParameters from "../services/APIHandler";

// This component displays the Parameter Panel, Simulator View, and Simulator controls components
function Simulation() {

    // Import parameters from SharedContext
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19,
        param20, setParam20,
    } = useContext(SharedContext);

    const [items, setItems] = useState([
        param13,
        param14,
        param15,
        param17,
        param18,
    ]);

    {/* JSON and API instructions

    // Psyche Sampling Lander Simulator V2.4 Team solved the api 
    //  but was unable implement the solution prior to semester end

    // Create jsonData object:    
    const isoStringDate = new Date().toISOString();
    const jsonData = {
        Id: { param28 },
        TimeStart: { param25 },
        CurrentTime: isoStringDate,
        LastTime: { param26 },
        UprThrustOn: { param23 },
        LwrThrustOn: { param24 },
        ShipAltitude: { param17 },
        PriorAltitude: { param27 },
        FuelRemaining: { param15 }
    }
    
    // Create jsonReturn object:
    const jsonReturn = {
        Id: { param28 },
        Calculation: { param26 },
        Velocity: { param14 },
        Fuel: { param15 },
        Height: { param17 },
        Elapsed: { param18 }
    }
    
    // Call APIHandler to process data in back-end
    jsonReturn = updateParameters(jsonData);

    // Explanation of the jsonReturn object:
    Id: int (should equal {param28} or something went wrong on the back-end)
    Calculation: string // time calculations performed -> {param26}
    Velocity: double // falling velocity               -> {param14}
    Fuel: double // fuel remaining                     -> {param15}
    Height: double // new altitude                     -> {param17}
    Elapsed: string // time since simulation began     -> {param18}

    // This data should be assigned as noted when the data is returned from the back-end.

    */}

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

    // Display the simulation screen with the parameter panels on the left, 
    //  the simulation view over the simulation controls
    return (
        <div className="simulation">
            {/* Parameter panel will be on the left */}
            <ParameterPanel />

            {/* Simulator view and simulation controls on the right */}
            <div className="view-controls">
                <SimulationView />
                <SamplingResults />
                <SimulationControls />
            </div>
        </div>
    );
}



export default Simulation;
