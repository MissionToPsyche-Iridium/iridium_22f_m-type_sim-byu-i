import React from 'react';
import { useNavigate } from 'react-router-dom';
function MoreInfo() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>
                This is where the More Information goes!
            </h1>

            <button size="large" type="button" onClick={handleButtonClick}>
                Return to Home page
            </button>
        </div>
    );
}

export default MoreInfo