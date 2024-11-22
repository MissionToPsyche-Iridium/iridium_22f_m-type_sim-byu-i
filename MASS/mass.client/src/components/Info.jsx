import React from 'react';
import { useNavigate } from 'react-router-dom';

function Info() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/more-info-page');
    };

    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >
            <button size="large" type="button" onClick={handleButtonClick}>Learn more about NASA's <br /> mission to Psyche!</button>
        </div>

    );
}

export default Info