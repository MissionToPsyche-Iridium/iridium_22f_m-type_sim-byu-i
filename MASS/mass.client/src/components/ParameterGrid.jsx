import React from "react";
import ParameterComponent from "./ParameterComponent";

const ParameterGrid = ({ items }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", padding: "2px" }}>
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
