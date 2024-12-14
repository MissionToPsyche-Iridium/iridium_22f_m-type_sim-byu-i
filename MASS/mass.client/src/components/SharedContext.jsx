import React, { createContext, useState } from "react";

// Create Context
export const SharedContext = createContext();

// Provider Component
export const SharedProvider = ({ children }) => {

    // Create a random ID variable to store the user id
    const randomID = useState(Math.floor(Math.random() * 50000));

    // Define 28 parameters as objects with title, sub-title, and value
    const [param1, setParam1] = useState({ title: "Surface Gravity", subtitle: "Newtons", value: 309 });
    const [param2, setParam2] = useState({ title: "Average Diameter", subtitle: "Kilometers", value: 113.4 });
    const [param3, setParam3] = useState({ title: "Rotation Speed", subtitle: "Hours", value: 4.2 });
    const [param4, setParam4] = useState({ title: "Lander Mass", subtitle: "Kilograms", value: 1500 });
    const [param5, setParam5] = useState({ title: "Max Fuel", subtitle: "Kilograms", value: 500 });
    const [param6, setParam6] = useState({ title: "Max Impact", subtitle: "m/s²", value: 1 });
    const [param7, setParam7] = useState({ title: "Landing Feet Size", subtitle: "Centimeters", value: 22.86 });
    const [param8, setParam8] = useState({ title: "Starting Altitude", subtitle: "Kilometers", value: 400 });
    const [param9, setParam9] = useState({ title: "Max Thrust", subtitle: "Newtons", value: 500 });
    const [param10, setParam10] = useState({ title: "Lander Angle", subtitle: "Degrees", value: 90 });
    const [param11, setParam11] = useState({ title: "Lwr Thrust Angle", subtitle: "Degrees", value: 180 });
    const [param12, setParam12] = useState({ title: "Upr Thrust Angle", subtitle: "Degrees", value: 0 });
    const [param13, setParam13] = useState({ title: "Orbital Speed", subtitle: "m/s", value: 72.1 });
    const [param14, setParam14] = useState({ title: "Fall Velocity", subtitle: "m/s²", value: 0.0 });
    const [param15, setParam15] = useState({ title: "Fuel Remaining", subtitle: "Kilograms", value: "200" });                     // Normally 200 to start
    const [param16, setParam16] = useState({ title: "Lander Damage", subtitle: "Percentage", value: 0.0 });
    const [param17, setParam17] = useState({ title: "Lander Altitude", subtitle: "Kilometers", value: 400.0 });
    const [param18, setParam18] = useState({ title: "Simulation Time", subtitle: "h:m:s:fraction", value: "00:00:00:000" });
    const [param19, setParam19] = useState({ title: "Upr Thruster", subtitle: "On/Off", value: "Off" });
    const [param20, setParam20] = useState({ title: "Lwr Thruster", subtitle: "On/Off", value: "Off" });
    const [param21, setParam21] = useState({ title: "Running ", subtitle: "True/False", value: "False" });
    const [param22, setParam22] = useState({ title: "Paused", subtitle: "True/False", value: "True" });
    const [param23, setParam23] = useState({ title: "UprThrusterOn", subtitle: "Upper Thruster On", value: false });
    const [param24, setParam24] = useState({ title: "LwrThrusterOn", subtitle: "Lower Thruster On", value: false });
    const [param25, setParam25] = useState({ title: "Start Time", subtitle: "Time Sim Began", value: "Press Start" });              // Set in SimulationControls component
    const [param26, setParam26] = useState({ title: "LastTime", subtitle: "Last Backend Response Time", value: "" });
    const [param27, setParam27] = useState({ title: "Prior Altitude", subtitle: "Last Backend Response Altitude", value: 400.0 });
    const [param28, setParam28] = useState({ title: "User ID", subtitle: "User ID number", value: randomID });

    // Share the context with children
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
                param21, setParam21,
                param22, setParam22,
                param23, setParam23,
                param24, setParam24,
                param25, setParam25,
                param26, setParam26,
                param27, setParam27,
                param28, setParam28,
            }}
        >
            {children}
        </SharedContext.Provider>

    );
};
