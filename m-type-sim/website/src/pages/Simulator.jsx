import React, {useEffect, useState } from 'react';
import '../css/Simulator.css';

function Simulator() {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        const missionData = sessionStorage.getItem('mission');
        setMission(missionData);
    }, []);

    return (
        <>
            <h1>New Page</h1>
            <p>This is the new page opened in a new tab.</p>
            <p>Mission: {mission}</p>
        </>

    );
}

export default Simulator;