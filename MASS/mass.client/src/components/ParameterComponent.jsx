import React from "react";

const ParameterComponent = ({ title, subtitle, value }) => {
    return (
        <div style={{ border: "1px solid #555", borderRadius: "3px", padding: "5px" }}>
            <h5 style={{ padding: "0px", marginTop: "5px", marginBottom: "5px" }}>{title}</h5>
            <p style={{ fontSize: "0.6rem", color: "#444" }}>{subtitle}</p>
            <div
                style={{
                    border: "2px solid #000",
                    borderRadius: "2px",
                    padding: "5px",
                    fontSize: ".8 rem",
                    fontWeight: "bold",
                }}
            >
                {value}
            </div>
        </div>
    );
};

export default ParameterComponent;
