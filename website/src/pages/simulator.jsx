import React, {useEffect, useState } from 'react';
import '../css/pages/simulator.css';

// Import Scenes below
import SceneOrbits from '../components/scene/sceneOrbits';
import SceneDefault from '../components/scene/sceneDefault';
import SceneError from '../components/scene/sceneError';
import SceneTest from '../components/scene/sceneTest';
import ScenePowerUpPsyche from '../components/scene/scenePowerUpPsyche';
import SceneMars from '../components/scene/sceneMars';
import SceneOrbit16Psyche from '../components/scene/sceneOrbit16Psyche';

function Simulator() {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        const missionData = sessionStorage.getItem('mission');
        setMission(missionData);
    }, []);

    switch (mission) {
        case 'initial-checkout':
            return <ScenePowerUpPsyche />;
        case 'mars-gravity-assist':
            return <SceneMars />;
        case 'orbital-capture':
            return <SceneOrbit16Psyche />;
        default:
            return <SceneDefault />;

    }

};

export default Simulator;