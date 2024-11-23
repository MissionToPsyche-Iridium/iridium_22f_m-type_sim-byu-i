import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutButton() {

    const navigate = useNavigate();

    const handleButtonClickToMainMenu = () => {
        navigate('/about-page');
    };

    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >

            <button size="large" type="button" onClick={handleButtonClickToMainMenu}>About this application</button>

        </div>

    );
}

export default AboutButton