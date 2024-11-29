import React, { useEffect, useState } from "react";
import ParameterGrid from './ParameterGrid';

function VariableParameters() {


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
            <h2 style={{ padding: "0px", marginBottom: "20px", marginTop: "0px" }}> Constant Parameters </h2>
            <ParameterGrid items={data} />
        </div>
    );
}

export default VariableParameters