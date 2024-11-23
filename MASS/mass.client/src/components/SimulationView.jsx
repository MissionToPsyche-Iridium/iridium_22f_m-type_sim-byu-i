import React, { useRef, useEffect } from "react";

function SimulationView() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Set font properties
        context.font = "40px Times"; // Font size and family
        context.fillStyle = "black"; // Text color
        context.textAlign = "center"; // Center text horizontally
        context.textBaseline = "middle"; // Center text vertically

        // Draw the text on the canvas
        context.fillText("Canvas - Simulation View", canvas.width / 2, canvas.height / 2);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={500} // Canvas width
            height={300} // Canvas height
            style={{ border: "1px solid #000" }} // Optional: border to see canvas area
        ></canvas>
    );
}

export default SimulationView;