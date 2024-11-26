import { useRef } from "react";
import SimulationScreen from "./SimulationScreen"; // Adjust the path as needed

function SimulationView() {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            style={{
                width: "500px", // Container width
                height: "300px", // Container height
                border: "1px solid #000", // Optional: border to see container area
            }}
        >
            <SimulationScreen />
        </div>
    );
}

export default SimulationView;
