

import React, { useState, useEffect } from 'react';
import '../../css/buttons/standardButton.css'

function PsycheMainPanel({controller}) {

    const panelStyle = {
        padding: '10px',
        border: '2px solid', 
        margin: '15px 5px', 
        borderRadius: '10px',
        backgroundColor: 'rgb(129, 115, 115)',
        width: '100%',
        height: '100%',
    };

    function sendMessage(message) {
        controller.command(message);
    };

    const [controllerData, setControllerData] = useState({
            yPlusSolarArrayState: "STOWED", 
            yPlusSolarArrayMotion: "STOPPED", 
            yMinusSolarArrayState: "STOWED", 
            yMinusSolarArrayMotion: "STOPPED", 
            xPlusIonArmState: "STOWED", 
            xPlusIonSelected: "OUTER", 
            xPlusIonPower: 0, 
            xMinusIonArmState: "STOWED", 
            xMinusIonSelected: "OUTER", 
            xMinusIonPower: 0, 
            xRotation: 0, 
            yRotation: 0, 
            zRotation: 0 
    });

    useEffect(() => {
        const handleUpdate = (newData) => {
            console.log("Psyche Main Panel received an update from the controller" );
            setControllerData(newData);
            console.log("y+ State " + newData.yPlusSolarArrayState);
        };

        controller.subscribe(handleUpdate)
        // During initialization force controller to update all subscribers
        controller.notifyListeners();

        return () => {
            controller.unsubscribe(handleUpdate);
        };

    }, [controller])

    useEffect(() => {
    }, []);

    return (
        <div style={panelStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h3>Psyche Controls</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '25px'}}>
                <div>
                    <h4>Solar Panel Array</h4>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                        <div style={{}}>
                            {controllerData.yPlusSolarArrayState !== "DEPLOYED" && <div>
                                <button className="standard-button" onClick={() => sendMessage("SOLAR DEPLOY_+Y")}
                                style={{backgroundColor: 'rgb(33, 80, 119)'}}>Deploy +Y</button>
                            </div>}
                            {controllerData.yPlusSolarArrayState === "DEPLOYED" && <div>
                                <button className="standard-button" onClick={() => sendMessage("SOLAR ROTATE_+Y_CW")}
                                    style={{backgroundColor: 'rgb(33, 119, 59)'}}>Rotate +Y CW</button>
                                <button className="standard-button" onClick={() => sendMessage("SOLAR STOP_+Y")} 
                                    style={{backgroundColor: 'rgb(128, 25, 25)'}} >STOP +Y</button>
                                <button className="standard-button" onClick={() => sendMessage("SOLAR ROTATE_+Y_CCW")}
                                    style={{backgroundColor: 'rgb(33, 119, 59)'}}>Rotate +Y CCW</button>
                            </div>}
                        </div>
                        <div style={{}}>
                            {controllerData.yMinusSolarArrayState !== "DEPLOYED" && <div>
                            <button className="standard-button" onClick={() => sendMessage("SOLAR DEPLOY_-Y")}
                                style={{backgroundColor: 'rgb(33, 80, 119)'}}>Deploy -Y</button>
                            </div>}
                            {controllerData.yMinusSolarArrayState === "DEPLOYED" && <div>
                            <button className="standard-button" onClick={() => sendMessage("SOLAR ROTATE_-Y_CW")}
                                style={{backgroundColor: 'rgb(33, 119, 59)'}}>Rotate -Y CW</button>
                            <button className="standard-button" onClick={() => sendMessage("SOLAR STOP_-Y")} 
                                style={{backgroundColor: 'rgb(128, 25, 25)'}} >STOP -Y</button>
                            <button className="standard-button" onClick={() => sendMessage("SOLAR ROTATE_-Y_CCW")}
                                style={{backgroundColor: 'rgb(33, 119, 59)'}}>Rotate -Y CCW</button>
                            </div>}
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Cold Gas Thrusters</h4>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                        <div style={{}}>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS X_CW")}
                                style={{width: '100px'}}>X CW (Yaw)</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Y_CW")}
                                style={{width: '100px'}}>Y CW (Pitch)</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Z_CW")} 
                                style={{width: '100px'}}>Z CW (Roll)</button>
                        </div>
                        <div style={{}}>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS X_HOLD")}
                                style={{
                                    backgroundColor: 'rgb(128, 25, 25)',
                                    width: '80px'
                                }}>Hold Yaw</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Y_HOLD")}
                                style={{
                                    backgroundColor: 'rgb(128, 25, 25)',
                                    width: '80px'
                                }}>Hold Pitch</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Z_HOLD")} 
                                style={{
                                    backgroundColor: 'rgb(128, 25, 25)',
                                    width: '80px'
                                }}>Hold Roll</button>
                        </div>
                        <div style={{}}>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS X_CCW")}
                                style={{width: '100px'}}>X CCW (Yaw)</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Y_CCW")}
                                style={{width: '100px'}}>Y CCW (Pitch)</button>
                            <button className="standard-button" onClick={() => sendMessage("GAS_THRUSTERS Z_CCW")} 
                                style={{width: '100px'}}>Z CCW (Roll)</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Main Ion Trusters</h4>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <div style={{}}>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS DEPLOY_+X")}
                                    style={{backgroundColor: 'rgb(33, 80, 119)', width: '90px'}}>Deploy +X</button>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS STOW_+X")}
                                    style={{backgroundColor: 'rgb(175, 73, 14)', width: '90px'}}>Stow +X</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS INNER_+X")}
                                    style={{ backgroundColor: 'rgb(0, 0, 0)', width: '90px' }}>Inner +X</button>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS OUTER_+X")} 
                                    style={{ backgroundColor: 'rgb(0, 0, 0)', width: '90px' }} >Outer +X</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '0px', margin: '0px'}}>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_0_+X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >0</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_1_+X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >1</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_2_+X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >2</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_3_+X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >3</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_4_+X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >4</button>
                            </div>
                        </div>
                        <div style={{}}>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS DEPLOY_-X")}
                                    style={{backgroundColor: 'rgb(33, 80, 119)', width: '90px'}}>Deploy -X</button>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS STOW_-X")}
                                    style={{backgroundColor: 'rgb(175, 73, 14)', width: '90px'}}>Stow -X</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS INNER_-X")}
                                    style={{ backgroundColor: 'rgb(0, 0, 0)', width: '90px' }}>Inner -X</button>
                                <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS OUTER_-X")} 
                                    style={{ backgroundColor: 'rgb(0, 0, 0)', width: '90px' }} >Outer -X</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '0px', margin: '0px'}}>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_0_-X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >0</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_1_-X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >1</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_2_-X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >2</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_3_-X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >3</button>
                            <button className="standard-button" onClick={() => sendMessage("ION_THRUSTERS LEVEL_4_-X")} 
                                style={{ backgroundColor: 'rgb(0, 0, 0)', width: '30px'}} >4</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default PsycheMainPanel;
