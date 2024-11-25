import React from "react";

const ParameterComponent = ({ title, subtitle, value }) => {
    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "2px", padding: "5px", textAlign: "center" }}>
            <h4>{title}</h4>
            <p style={{ fontSize: "0.7rem", color: "#666" }}>{subtitle}</p>
            <div
                style={{
                    border: "2px solid #000",
                    borderRadius: "2px",
                    padding: "5px",
                    fontSize: "1 rem",
                    fontWeight: "bold",
                }}
            >
                {value}
            </div>
        </div>
    );
};

export default ParameterComponent;
