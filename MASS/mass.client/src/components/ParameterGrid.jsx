import React from "react";
import ParameterComponent from "./ParameterComponent";


// Display parameters in a 3 column grid by accepting parameters in items array
//  and calling the parameter component and passing the array elements to it for display
const ParameterGrid = ({ items }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", padding: "2px" }}>

            {/* Cycle through each parameter and call the parameter component to display it */}
            {items.map((item, index) => (
                <ParameterComponent
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    value={item.value}
                />
            ))}
        </div>
    );
};

export default ParameterGrid;
