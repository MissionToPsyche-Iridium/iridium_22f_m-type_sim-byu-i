import React, { createContext, useState } from "react";

// Create Context
export const SharedContext = createContext();

// Provider Component
export const SharedProvider = ({ children }) => {
    // Define 20 parameters as objects with title, sub-title, and value
    const [param1, setParam1] = useState({ title: "Surface Gravity", subtitle: "Newtons", value: 309 });
    const [param2, setParam2] = useState({ title: "Average Diameter", subtitle: "Kilometers", value: 113.4 });
    const [param3, setParam3] = useState({ title: "Rotation Speed", subtitle: "Hours", value: 4.2 });
    const [param4, setParam4] = useState({ title: "Lander Mass", subtitle: "Kilograms", value: 1500 });
    const [param5, setParam5] = useState({ title: "Max Fuel", subtitle: "Kilograms", value: 500 });
    const [param6, setParam6] = useState({ title: "Max Impact", subtitle: "m/s", value: 1 });
    const [param7, setParam7] = useState({ title: "Landing Feet Size", subtitle: "Centimeters", value: 22.86 });
    const [param8, setParam8] = useState({ title: "Starting Altitude", subtitle: "Kilometers", value: 400 });
    const [param9, setParam9] = useState({ title: "Max Thrust", subtitle: "Newtons", value: 500 });
    const [param10, setParam10] = useState({ title: "Lander Angle", subtitle: "Degrees", value: 90 });
    const [param11, setParam11] = useState({ title: "Lwr Thrust Angle", subtitle: "Degrees", value: 180 });
    const [param12, setParam12] = useState({ title: "Upr Thrust Angle", subtitle: "Degrees", value: 0 });
    const [param13, setParam13] = useState({ title: "Lander Speed", subtitle: "m/s^2", value: 56.1 });
    const [param14, setParam14] = useState({ title: "Fall Velocity", subtitle: "m/s^2", value: 0 });
    const [param16, setParam15] = useState({ title: "Upr Thruster", subtitle: "On/Off", value: "Off" });
    const [param15, setParam16] = useState({ title: "Lwr Thruster", subtitle: "On/Off", value: "Off" });
    const [param17, setParam17] = useState({ title: "Fuel Remaining", subtitle: "Kilograms", value: 500 });
    const [param18, setParam18] = useState({ title: "Lander Damage", subtitle: "Percentage", value: 0 });
    const [param19, setParam19] = useState({ title: "Lander Altitude", subtitle: "Kilometers", value: 400 });
    const [param20, setParam20] = useState({ title: "Simulation Time", subtitle: "h:m:s:fraction", value: 0 });

    return (

        <SharedContext.Provider
            value={{
                param1, setParam1,
                param2, setParam2,
                param3, setParam3,
                param4, setParam4,
                param5, setParam5,
                param6, setParam6,
                param7, setParam7,
                param8, setParam8,
                param9, setParam9,
                param10, setParam10,
                param11, setParam11,
                param12, setParam12,
                param13, setParam13,
                param14, setParam14,
                param15, setParam15,
                param16, setParam16,
                param17, setParam17,
                param18, setParam18,
                param19, setParam19,
                param20, setParam20,
            }}
        >
            {children}
        </SharedContext.Provider>

    );
};

{/*
import React, { createContext, useState } from "react";

// Create Context
export const SharedParameters = createContext();

// Provider Component
export const SharedProvider = ({ children }) => {
    // Define 20 variables as objects with title, sub-title, and value
    const [gravity, setGravity] = useState({ title: "Surface Gravity", subtitle: "Newtons", value: 309 });
    const [diameter, setDiameter] = useState({ title: "Average Diameter", subtitle: "Kilometers", value: 113.4 });
    const [rotation, setRotation] = useState({ title: "Rotation Speed", subtitle: "Hours", value: 4.2 });
    const [landerMass, setLanderMass] = useState({ title: "Lander Mass", subtitle: "Kilotons", value: 1500 });
    const [maxFuel, setMaxFuel] = useState({ title: "Max Fuel", subtitle: "Kilotons", value: 500 });
    const [maxImpact, setMaxImpact] = useState({ title: "Max Impact", subtitle: "m/s", value: 1 });
    const [landerFeet, setLanderFeet] = useState({ title: "Landing Feet Size", subtitle: "Centimeters", value: 22.86 });
    const [var8, setVar8] = useState({ title: "Starting Altitude", subtitle: "Kilometers", value: 400 });
    const [var9, setVar9] = useState({ title: "Max Thrust", subtitle: "Newtons", value: 500 });
    const [var10, setVar10] = useState({ title: "Lander Angle", subtitle: "Degrees", value: 90 });
    const [var11, setVar11] = useState({ title: "Lwr Thrust Angle", subtitle: "Degrees", value: 180 });
    const [var12, setVar12] = useState({ title: "Upr Thrust Angle", subtitle: "Degrees", value: 0 });
    const [var13, setVar13] = useState({ title: "Lander Speed", subtitle: "m/s^2", value: 56.1 });
    const [var14, setVar14] = useState({ title: "Fall Velocity", subtitle: "m/s^2", value: 0 });
    const [var15, setVar15] = useState({ title: "Lwr Thruster", subtitle: "On/Off", value: "Off" });
    const [var16, setVar16] = useState({ title: "Upr Thruster", subtitle: "On/Off", value: "Off" });
    const [var17, setVar17] = useState({ title: "Fuel Remaining", subtitle: "Kilotons", value: 500 });
    const [var18, setVar18] = useState({ title: "Lander Damage", subtitle: "Percentage", value: 0 });
    const [var19, setVar19] = useState({ title: "Lander Altitude", subtitle: "Kilometers", value: 400 });
    const [var20, setVar20] = useState({ title: "Simulation Time", subtitle: "h:m:s:fraction", value: 0 });



    return (

        <>
            <SharedParameters.Provider
                value={{
                    gravity, setGravity,
                    diameter, setDiameter,
                    rotation, setRotation,
                    landerMass, setLanderMass,
                    maxFuel, setMaxFuel,
                    maxImpact, setMaxImpact,
                    landerFeet, setLanderFeet,
                    var8, setVar8,
                    var9, setVar9,
                    var10, setVar10,
                    var11, setVar11,
                    var12, setVar12,
                    var13, setVar13,
                    var14, setVar14,
                    var15, setVar15,
                    var16, setVar16,
                    var17, setVar17,
                    var18, setVar18,
                    var19, setVar19,
                    var20, setVar20,
                }}
            >
                {children}
            </SharedParameters.Provider>
        </>
    );
};

    
*/}