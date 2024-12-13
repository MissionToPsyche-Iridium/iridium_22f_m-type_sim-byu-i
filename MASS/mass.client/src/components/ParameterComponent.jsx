import React from "react";


// Display each parameter within a square containing the name of the parameter, the units, and the parameter value
const ParameterComponent = ({ title, subtitle, value }) => {

    return (

        <div style={{ border: "1px solid #555", borderRadius: "3px", padding: "2px" }}>
            <h6 style={{ padding: "0px", marginTop: "5px", marginBottom: "5px" }}>{title}</h6>
            <p style={{ fontSize: "0.6rem", color: "#444" }}>{subtitle}</p>
            <div
                style={{
                    border: "2px solid #000",
                    borderRadius: "2px",
                    padding: "2px",
                    fontSize: ".7 rem",
                    fontWeight: "bold",
                }}
            >
                {value}
            </div>
        </div>

    );
};

export default ParameterComponent;
