import React, { useState, useEffect } from 'react';
import LEDButton from '../buttons/ledButton';
import * as THREE from 'three'; // Import THREE to handle Vector3

function DebuggingPanel({
    name = "Debugger", // Default value for name
    velocity = 0,      // Default value for velocity
    acceleration = 0,  // Default value for acceleration
    rotation = 0,      // Default value for rotation
    thrust = 0,        // Default value for thrust
    coordinates = new THREE.Vector3(1, 2, 3), // Default value for coordinates
    updateCoordinates, // Callback function to update coordinates
}) {
    const panelStyle = {
        padding: '5px',
        border: '2px solid', 
        margin: '3px 5px', 
        borderRadius: '10px',
        backgroundColor: 'rgb(129, 115, 115)',
        flexGrow: 1,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        justifyContent: 'center',
    };

    useEffect(() => {
    }, []);

    // Convert THREE.Vector3 to an array for display
    const coordinatesArray = [coordinates.x, coordinates.y, coordinates.z];

    return (
        <div style={panelStyle}>
            <h3>{name}</h3>
            <div style={buttonContainerStyle}>
                <button onClick={() => updateCoordinates('x', -500)}>X Coord -500</button>
                <button onClick={() => updateCoordinates('x', 500)}>X Coord +500</button>
                <button onClick={() => updateCoordinates('y', -500)}>Y Coord -500</button>
                <button onClick={() => updateCoordinates('y', 500)}>Y Coord +500</button>
                <button onClick={() => updateCoordinates('z', -500)}>Z Coord -500</button>
                <button onClick={() => updateCoordinates('z', 500)}>Z Coord +500</button>
            </div>
            <div>
                <p>Velocity: {velocity} m/s</p>
                <p>Acceleration: {acceleration} m/s^2</p>
                <p>Rotation: {rotation} units</p>
                <p>Thrust: {thrust} units</p>
                <p>Coordinates: {coordinatesArray.join(', ')}</p>
            </div>
        </div>
    );
}

export default DebuggingPanel;