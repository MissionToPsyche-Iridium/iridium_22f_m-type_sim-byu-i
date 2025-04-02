import React, { useState } from 'react';
import * as THREE from 'three';

function DebuggingPanel({
    name = "Debugger",
    velocity = new THREE.Vector3(0, 0, 0),
    coordinates = new THREE.Vector3(0, 0, 0),
    updatePosition,
    updateVelocity
}) {
    // State for modal visibility and form values
    const [showPositionModal, setShowPositionModal] = useState(false);
    const [showVelocityModal, setShowVelocityModal] = useState(false);
    const [positionInput, setPositionInput] = useState({ x: 0, y: 0, z: 0 });
    const [velocityInput, setVelocityInput] = useState({ x: 0, y: 0, z: 0 });

    // Modal styles
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        color: 'black'
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '8px',
        width: '100%'
    };

    // Open position modal and set current values
    const openPositionModal = () => {
        setPositionInput({
            x: coordinates.x,
            y: coordinates.y,
            z: coordinates.z
        });
        setShowPositionModal(true);
    };

    // Open velocity modal and set current values
    const openVelocityModal = () => {
        setVelocityInput({
            x: velocity.x,
            y: velocity.y,
            z: velocity.z
        });
        setShowVelocityModal(true);
    };

    // Handle position form submission
    const handlePositionSubmit = (e) => {
        e.preventDefault();
        updatePosition('x', positionInput.x);
        updatePosition('y', positionInput.y);
        updatePosition('z', positionInput.z);
        setShowPositionModal(false);
    };

    // Handle velocity form submission
    const handleVelocitySubmit = (e) => {
        e.preventDefault();
        updateVelocity('x', velocityInput.x);
        updateVelocity('y', velocityInput.y);
        updateVelocity('z', velocityInput.z);
        setShowVelocityModal(false);
    };

    return (
        <div style={{
            padding: '15px',
            border: '2px solid #444',
            margin: '10px',
            borderRadius: '10px',
            backgroundColor: 'rgb(129, 115, 115)',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '300px'
        }}>
            <h3 style={{ marginBottom: '15px' }}>{name}</h3>

            {/* Current Values Display */}
            <div style={{ width: '100%', marginBottom: '20px' }}>
                <h4>Current Position</h4>
                <p>X: {coordinates.x.toFixed(2)}</p>
                <p>Y: {coordinates.y.toFixed(2)}</p>
                <p>Z: {coordinates.z.toFixed(2)}</p>

                <h4 style={{ marginTop: '15px' }}>Current Velocity</h4>
                <p>X: {velocity.x.toFixed(2)}</p>
                <p>Y: {velocity.y.toFixed(2)}</p>
                <p>Z: {velocity.z.toFixed(2)}</p>
            </div>

            {/* Control Buttons */}
            <button
                onClick={openPositionModal}
                style={{
                    padding: '8px 15px',
                    margin: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none'
                }}
            >
                Change Position
            </button>

            <button
                onClick={openVelocityModal}
                style={{
                    padding: '8px 15px',
                    margin: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none'
                }}
            >
                Change Velocity
            </button>

            {/* Position Modal */}
            {showPositionModal && (
                <>
                    <div style={overlayStyle} onClick={() => setShowPositionModal(false)} />
                    <div style={modalStyle}>
                        <h3>Edit Position</h3>
                        <form onSubmit={handlePositionSubmit}>
                            <div>
                                <label>X Value:</label>
                                <input
                                    type="number"
                                    value={positionInput.x}
                                    onChange={(e) => setPositionInput({ ...positionInput, x: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label>Y Value:</label>
                                <input
                                    type="number"
                                    value={positionInput.y}
                                    onChange={(e) => setPositionInput({ ...positionInput, y: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label>Z Value:</label>
                                <input
                                    type="number"
                                    value={positionInput.z}
                                    onChange={(e) => setPositionInput({ ...positionInput, z: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <button type="submit" style={{ marginTop: '10px', padding: '8px 15px' }}>
                                Update Position
                            </button>
                        </form>
                    </div>
                </>
            )}

            {/* Velocity Modal */}
            {showVelocityModal && (
                <>
                    <div style={overlayStyle} onClick={() => setShowVelocityModal(false)} />
                    <div style={modalStyle}>
                        <h3>Edit Velocity</h3>
                        <form onSubmit={handleVelocitySubmit}>
                            <div>
                                <label>X Velocity:</label>
                                <input
                                    type="number"
                                    value={velocityInput.x}
                                    onChange={(e) => setVelocityInput({ ...velocityInput, x: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label>Y Velocity:</label>
                                <input
                                    type="number"
                                    value={velocityInput.y}
                                    onChange={(e) => setVelocityInput({ ...velocityInput, y: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label>Z Velocity:</label>
                                <input
                                    type="number"
                                    value={velocityInput.z}
                                    onChange={(e) => setVelocityInput({ ...velocityInput, z: parseFloat(e.target.value) || 0 })}
                                    style={inputStyle}
                                />
                            </div>
                            <button type="submit" style={{ marginTop: '10px', padding: '8px 15px' }}>
                                Update Velocity
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default DebuggingPanel;