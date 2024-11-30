<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import ParameterGrid from './ParameterGrid';
=======
import React, { useState, useEffect } from "react";
//Components
import ParameterGrid from './ParameterGrid';
//Services
import useKeyTracker from '../services/KeyboardHandler.js';
>>>>>>> 1a326962d464b6482ca00e4d5ab4b1586582242e

function VariableParameters() {
    // Track if user is pressing up/down arrow keys
    const { ArrowUp, ArrowDown } = useKeyTracker();

    const [data, setData] = useState([
        { title: "Upward Thrusters", subtitle: "Newtons", value: 0 },
        { title: "Downward Thrusters", subtitle: "Newtons", value: 0 },
    ]);

    useEffect(() => {
        setData([
            { title: "Upward Thrusters", subtitle: "Newtons", value: ArrowUp ? 250 : 0 },
            { title: "Downward Thrusters", subtitle: "Newtons", value: ArrowDown ? 250 : 0 },
        ]);
    }, [ArrowUp, ArrowDown]);


    const [data, setData] = useState([
        { title: "Acceleration", subtitle: "Kilometers", value: 1 },
        { title: "Velocity", subtitle: "Kilometers", value: 1 },
        { title: "Thrust", subtitle: "Hours", value: 1},
        { title: "Fuel", subtitle: "Kilotons", value:  1},
        { title: "Damage", subtitle: "Kilotons", value:  1},
        { title: "Distance", subtitle: "m/s", value:  1},
        { title: "Time Elapsed", subtitle: "Centimeters", value: 1 },
    ]);

    return (
        <div>
<<<<<<< HEAD
            <h2 style={{ padding: "0px", marginBottom: "20px", marginTop: "0px" }}> Constant Parameters </h2>
            <ParameterGrid items={data} />
=======
            <h2>
                Variable Parameters
            </h2>

            {/* Here are the parameters which will go here:
            
                •	Current acceleration of the lander (float)
                •	Current velocity of the lander (float)
                •	Current level of thrust (float)
                •	Amount of fuel remaining (int)
                •	Amount of damage the lander has sustained (int)
                •	Distance between the lander and Psyche (float)
                •	Time elapsed (float)
            */}
            <ParameterGrid items={data} />

>>>>>>> 1a326962d464b6482ca00e4d5ab4b1586582242e
        </div>
    );
}

export default VariableParameters