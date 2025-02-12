import React from 'react';
import '../css/Simulations.css'

function Simulations() {

    const openNewPage = (mission) => {
        sessionStorage.setItem('mission', mission)
        window.open('/Simulator', '_blank')
    };

    return (
        <div className="simulations-list">

            <h1>Simulations to choose from</h1>
            <h3>Simulation will start in a new tab</h3>
            <div className="mission-buttons">
                <button onClick={() => openNewPage('launch')}>
                    Launch Psyche
                </button>
                <button onClick={() => openNewPage('power-up')}>
                    Power up Psyche
                </button>
                <button onClick={() => openNewPage('mars')}>
                    Mars Sling-Shot
                </button>
                <button onClick={() => openNewPage('orbit-psyche')}>
                    Orbit 16-Psyche
                </button>
                <button onClick={() => openNewPage('lander')}>
                    Land on 16-Psyche
                </button>
                <button onClick={() => openNewPage('rover')}>
                    Collect Samples
                </button>
                <button onClick={() => openNewPage('sample-rocket')}>
                    Launch Samples
                </button>
                <button onClick={() => openNewPage('return')}>
                    Return to Earth
                </button>
            </div>
        </div>
    );
}

export default Simulations;