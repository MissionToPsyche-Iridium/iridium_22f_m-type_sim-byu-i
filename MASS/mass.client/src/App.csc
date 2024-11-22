/* This is the container which holds all components of the Simulator Screen*/
.simulation {
    display: flex; /* Creates a flexbox container */
    margin-left: 10px;
    height: 100vh; /* Full height of the screen */
    width: 100%;
}

.parameter-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

/* The parameter panel will be placed on the left side, taking full height */
.parameter-panel {
    background-color: lightblue;
    width: 450px; /* Set the width of the parameter panel */
    height: 98vh; /* Set it to take full height */
    padding: 20px;
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* This is the container which holds the simulator view and simulator controls components */
.view-controls {
    display: flex;
    flex-direction: column; /* Stack right and bottom components vertically */
    flex: 1; /* This will take up the remaining width of the screen */
    padding: 10px;
}

/* The simulator view canvas*/
.simulator-view {
    background-color: lightgreen;
    padding: 10px;
    margin-bottom: 20px; /* Space between simulator view and simulator controls components */
    box-sizing: border-box;
    flex: 0 1 auto;
    display: flex;
    justify-content: center; /* Center the canvas horizontally */
    align-items: center; /* Center the canvas vertically */
    height: 400px; /* Make the simulator component take full height of its parent */
}

    /* Ensuring the canvas fits well within the container */
    .simulator-view canvas {
        max-width: 100%; /* Make canvas responsive to container width */
        height: auto; /* Maintain aspect ratio */
        border: 1px solid #000; /* Optional: add border to canvas for visibility */
    }


/* The simulator controls panel */
.simulator-controls {
    background-color: lightcoral;
    padding: 20px;
    margin-top: 10px;
    height: 120px;
    box-sizing: border-box;
    /* flex: 1;  Allow it to take the remaining space */
}
S