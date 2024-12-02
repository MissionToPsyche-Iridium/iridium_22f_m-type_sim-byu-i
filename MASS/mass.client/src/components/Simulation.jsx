import React, { useContext, useState, useEffect } from 'react';
import ParameterPanel from "./ParameterPanel";
import SimulationView from "./SimulationView";
import SimulationControls from "./SimulationControls";
import { SharedContext } from "./SharedContext";
import { ControlProvider } from "./ControlContext";

function Simulation() {

    // Import parameters for use
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param17, setParam17,
        param18, setParam18,
    } = useContext(SharedContext);

    const [items, setItems] = useState([
        param13,
        param14,
        param15,
        param17,
        param18,
    ]);


    {/*

    //Code to build the JSON
    const missionJSON = {{
        "user_id": [{
            "time": {param18},
            "current": {currentTime},         // This should hold the current system time 
            "last": {lastBackendTime},        // This should hold the value of a time object from when the back-end last sent data, or current time if first call
            "upperThruster": {param19},
            "lowerThruster": {param20},
            "altitude": {param17},
            "prior": {backendLanderAltitude}, // This holds the altitude of the last backend response or current altitude if first call
            "fuel": {param15},
        }]
    }

    */}

    const [parameters, setParameters] = useState();

    //useEffect(() => {
    //    updateParameters({ /* JSON data to send to the server */ });
    //}, []);

    //const contents = parameters === undefined
    //    ? <div>
    //        <h1>Simulation</h1>
    //        <p>Parameters:</p>
    //        <ul>
    //            <li>Id: {parameters.Id}</li>
    //            <li>Calculation: {parameters.Calculation}</li>
    //            <li>Velocity: {parameters.Velocity}</li>
    //            <li>Fuel: {parameters.Fuel}</li>
    //            <li>Height: {parameters.Height}</li>
    //            <li>Elapsed: {parameters.Elapsed}</li>
    //        </ul>
    //    </div>
    //    : <p><em>Loading...</em></p>;

    return (

        <div className="simulation">
            {/* Parameter panel will be on the left, and take full height */}
            <ParameterPanel />
            {/*{contents}*/}

            {/* Simulator view and simulation controls components will be in a column to the right */}
            <div className="view-controls">
                <ControlProvider>
                    <SimulationView />
                    <SimulationControls />
                </ControlProvider>

            </div>
        </div>

    );

    //async function updateParameters(jsonData) {
    //    // Test data to send to the server
    //    const isoStringDate = new Date().toISOString();
    //    jsonData = {
    //        Id: 1234,
    //        TimeStart: isoStringDate,
    //        CurrentTime: isoStringDate,
    //        LastTime: isoStringDate,
    //        ThrustOn: true,
    //        ShipAltitude: 300,
    //        PriorAltitude: 400,
    //        FuelRemaining: 200
    //    }

    //    try {
    //        const response = await fetch("https://localhost:7248/api/parameters", {
    //            method: "POST",
    //            headers: {
    //                "Content-Type": "application/json"
    //            },
    //            body: JSON.stringify(jsonData)
    //        });

    //        if (!response.ok) {
    //            throw new Error(`HTTP error! status: ${response.status}`);
    //        }

    //        const result = await response.json();
    //        console.log("Response from the server:", result);


    //        setParameters(result);

    //    } catch (error) {
    //        console.log("Error fetching data from the server:", error);
    //    }
    //}
}

export default Simulation;

