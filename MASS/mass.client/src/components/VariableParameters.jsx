import React, { useState, useEffect } from "react";
//Components
import ParameterGrid from './ParameterGrid';
//Services
import useKeyTracker from '../services/KeyboardHandler.js';

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

    return (
        <div>
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

        </div>
    );
}

export default VariableParameters