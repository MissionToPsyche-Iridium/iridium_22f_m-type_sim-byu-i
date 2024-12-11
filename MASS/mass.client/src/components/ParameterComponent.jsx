import React from "react";

const ParameterComponent = ({ title, subtitle, value }) => {

    return (

        <div style={{ border: "1px solid #555", borderRadius: "3px", padding: "2px" }}>
            <h6 style={{ padding: "0px", marginTop: "2px", marginBottom: "2px" }}>{title}</h6>
            <p style={{ fontSize: "0.5rem", color: "#444" }}>{subtitle}</p>
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
