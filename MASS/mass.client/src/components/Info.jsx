import React from 'react';
import { useNavigate } from 'react-router-dom';

function Info() {

    const navigate = useNavigate();

    const moreInfo = () => {
        navigate('/more-info-page');
    };

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
                onClick={moreInfo}
            >
                Learn more about NASA's <br />
                mission to Psyche!
            </button>
        </div>

    );
}

export default Info