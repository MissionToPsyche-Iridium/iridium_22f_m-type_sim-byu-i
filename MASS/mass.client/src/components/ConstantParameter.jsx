import React, { useState } from "react";
import ParameterGrid from './ParameterGrid';

function ConstantParameter() {

    const [data, setData] = useState([
        { title: "Surface Gravity", subtitle: "Newtons", value: 309 },
        { title: "Average Diameter", subtitle: "Kilometers", value: 113.4 },
        { title: "Rotation Speed", subtitle: "Hours", value: 4.2 },
        { title: "Lander Mass", subtitle: "Kilotons", value: 1500 },
        { title: "Max Fuel", subtitle: "Kilotons", value: 500 },
        { title: "Max Impact", subtitle: "m/s", value: 1 },
        { title: "Landing Feet Size", subtitle: "Centimeters", value: 22.86 },
        { title: "Starting Altitude", subtitle: "Kilometers", value: 400 },
        { title: "Max Thrust", subtitle: "Newtons", value: 500 },
        { title: "Lander Angle", subtitle: "Degrees", value: 90 },
        { title: "Lwr Thrust Angle", subtitle: "Degrees", value: 180 },
        { title: "Upr Thrust Angle", subtitle: "Degrees", value: 0 },
    ]);

    return (
        <div>
            <h4> Constant Parameters </h4>
            <ParameterGrid items={data} />
        </div>
    );
}

    export default ConstantParameter