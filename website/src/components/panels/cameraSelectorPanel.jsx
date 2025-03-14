
import React, { useState, useEffect } from 'react';
import LEDButton from '../buttons/ledButton';

function CameraSelectorPanel({name}) {

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

    return (
        <div style={panelStyle}>
            <h3>{name}</h3>
            <div style={buttonContainerStyle}>
                <LEDButton buttonName={'Psyche Main'} />
                <LEDButton buttonName={'Psyche Orbit'} />
                <LEDButton buttonName={'Lander Main'} />
                <LEDButton buttonName={'Lander Orbit'} />
                <LEDButton buttonName={'Rover Head'} />
                <LEDButton buttonName={'Rover Arm'} />
            </div>
        </div>
    );
}

export default CameraSelectorPanel;
