
//import React from "react";
import ParameterPanel from "./ParameterPanel";
import SimulationView from "./SimulationView";
import SimulationControls from "./SimulationControls";
import SimulationScreen from "./SimulationScreen";

function Simulation() {

    return (

        <div className="simulation">
            {/* Parameter panel will be on the left, and take full height */}
            <ParameterPanel />

            {/* Simulator view and simulation controls components will be in a column to the right */}
            <div className="view-controls">
                <SimulationView />
                <SimulationControls />
            </div>
        </div>

    );

}

export default Simulation;

