import React, { useState, useEffect } from 'react';
import LEDButton from '../buttons/ledButton'


function VehicleSelectorPanel(active, used, change) {
    const [isFalcon, setIsFalcon] = useState(false);
    const [isPsyche, setIsPsyche] = useState(false);
    const [isLander, setIsLander] = useState(false);
    const [isRover, setIsRover] = useState(false);
    const [isSampleRocket, setIsSampleRocket] = useState(false);
    const [activeVehicle, setActiveVehicle] = useState("falcon");

    const changeVehicle = (vehiclePicked) => {
        change(vehiclePicked);
    }

    useEffect(()=> {
        setIsFalcon(true);
        setIsPsyche(true);
        setIsLander(true);
        setIsRover(true);
        setIsSampleRocket(true);
    //     console.log(used);
    //     // enable vehicle buttons
    //     if (used.includes('falcon')) {
    //         setIsFalcon(true);
    //     } 
    //     if (used.includes('psyche')) {
    //         setIsPsyche(true);
    //     } 
    //     if (used.includes('lander')) {
    //         setIsLander(true);
    //     } 
    //     if (used.includes('rover')) {
    //         setIsRover(true);
    //     } 
    //     if (used.includes('sampleRocket')) {
    //         setIsSampleRocket(true);
    //     }
    //     // set first vehicle to active
    //     if (isFalcon) {
    //         change("falcon");
    //     } else if (isPsyche) {
    //         change("psyche");
    //     } else if (isLander) {
    //         change("lander");
    //     } else if (isRover) {
    //         change("rover");
    //     } else if (isSampleRocket) {
    //         change("sampleRocket");
    //     } else {
    //         console.log("ERROR: VehicleSelectorPanel was not given any vechicles");
    //     }

    }, []);

    // useEffect(() => {
    //     setActiveVehicle(active);
    // }, [active])

    return (
        <>
            <h3>Vehicle Selector</h3>
            {isFalcon && <LEDButton buttonName={'falcon'} buttonState={activeVehicle === 'falcon'} updateState={changeVehicle}/>}
            {isPsyche && <LEDButton buttonName={'psyche'} buttonState={activeVehicle === 'psyche'} updateState={changeVehicle}/>}
            {isLander && <LEDButton buttonName={'lander'} buttonState={activeVehicle === 'lander'} updateState={changeVehicle}/>}
            {isRover && <LEDButton buttonName={'rover'} buttonState={activeVehicle === 'rover'} updateState={changeVehicle}/>}
            {isSampleRocket && <LEDButton buttonName={'sampleRocket'} buttonState={activeVehicle === 'sampleRocket'} updateState={changeVehicle}/>}
        </>
    );
}

export default VehicleSelectorPanel;


