
import { useState } from "react";

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Activate() {

    const navigate = useNavigate();

    const handleButtonClickToMainMenu = () => {
        navigate('/main-menu-page');
    };

    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >

            <button size="large" type="button" onClick="">Activate Simulator</button>

            <button size="large" type="button" onClick={handleButtonClickToMainMenu}>Activate Simulator</button>

        </div>

    );
}

export default Activate
