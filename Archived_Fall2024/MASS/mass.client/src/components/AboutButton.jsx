import React from 'react';
import { useNavigate } from 'react-router-dom';

// This will show a button and link to another component; subcomponent of Home
function AboutButton() {

    // Set navigate object
    const navigate = useNavigate();

    // Navigate to the About component when called
    const about = () => {
        navigate('/about-page');
    };

    // Show button and call about when clicked
    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >
            <button
                style={{
                    background: '#007bff', // udoublecheck color
                    color: '#fff',
                    fontSize: '16px',
                    textAlign: 'center',
                    margin: '0 5px',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '250px',
                }}
                size="large"
                type="button"
                onClick={about}
            >
                About this application
            </button>
        </div>

    );
}

export default AboutButton