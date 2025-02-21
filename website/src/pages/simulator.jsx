import React, {useEffect, useState } from 'react';
import '../css/Simulator.css';
import '../components/scene/sceneTest'
import SceneOrbits from '../components/scene/sceneOrbits';

function Simulator() {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        const missionData = sessionStorage.getItem('mission');
        setMission(missionData);
    }, []);

    return (
        <>
            <p>Mission: {mission}</p>
            <SceneOrbits />
        </>

    );
}

export default Simulator;