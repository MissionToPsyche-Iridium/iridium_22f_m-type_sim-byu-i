import SimulationScreen from "./SimulationScreen"; // Import the SimulationScreen component

function SimulationView() {
    return (
        <div
            style={{
                border: "1px solid #000", // Optional: border for visualization
                overflow: "hidden", // Prevent overflow in case of misalignment
            }}
        >
                <SimulationScreen />
        </div>
    );
}

export default SimulationView;
