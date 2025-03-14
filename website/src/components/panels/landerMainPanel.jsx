

import React, { useState, useEffect } from 'react';

function LanderMainPanel() {

    const panelStyle = {
        padding: '10px',
        border: '2px solid', 
        margin: '15px 5px', 
        borderRadius: '10px',
        backgroundColor: 'rgb(129, 115, 115)',
        width: '100%',
        height: '100%',
    };

    useEffect(() => {
    }, []);

    return (
    <div style={panelStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <h3>Lander Controls</h3>
        </div>
        </div>
    );
}

export default LanderMainPanel;
