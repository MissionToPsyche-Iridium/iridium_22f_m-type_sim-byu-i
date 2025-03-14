import React, { useState, useEffect } from 'react';

function VehicleSelectorPanel({ buttonNames, changeVehicle }) {
    const [activeButton, setActiveButton] = useState(buttonNames[0]); // Set the first button as active

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        changeVehicle(buttonName);
    };

    const buttonStyle = (isActive) => ({
        width: '100%', 
        height: '35px',
        padding: '5px',
        border: '4px solid',
        borderColor: isActive ? 'rgb(214, 80, 18)' : 'rgb(1,1,1)', 
        borderRadius: '5px',
        backgroundColor: isActive ? 'rgb(255, 185, 152)' : 'rgb(1,1,1)', 
        color: isActive ? 'rgb(31, 31, 31)' : 'rgb(255, 255, 255)', 
        cursor: 'pointer',
        margin: '2px 0', // Add vertical margin for spacing
        transition: 'border-color 0.1s ease-in-out',
        fontSize: 12,
    });

    const panelStyle = {
        padding: '10px',
        border: '2px solid', 
        margin: '15px 5px', 
        borderRadius: '10px',
        backgroundColor: 'rgb(129, 115, 115)',
        width: 'auto',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2px',
    };

    useEffect(() => {
        // Optionally, you can set the first button as active on component load
        setActiveButton(buttonNames[0]);
    }, []);

    return (
    <div style={panelStyle}>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}> */}
        {/* <div style={{  }}> */}
            <h3>Vehicles</h3>
            {buttonNames.map(buttonName => (
                <button
                    key={buttonName}
                    style={buttonStyle(activeButton === buttonName)}
                    onClick={() => handleButtonClick(buttonName)}
                >
                    {buttonName}
                </button>
            ))}
        {/* </div> */}
        </div>
    );
}

export default VehicleSelectorPanel;
