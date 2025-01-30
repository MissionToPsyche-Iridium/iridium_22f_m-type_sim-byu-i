import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component will show a button and link to another component; subcomponent of Home
function Activate() {

    // Set navigate object
    const navigate = useNavigate();

    // Navigate to the Main Menu component when called
    const mainMenu = () => {
        navigate('/main-menu-page');
    };

    // Display a button and call mainMenu when it is clicked
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
                onClick={mainMenu}
            >
                Activate Simulator
            </button>
        </div>

    );
}

export default Activate