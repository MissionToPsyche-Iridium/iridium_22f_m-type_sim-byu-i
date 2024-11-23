import React from 'react';
import './ParameterDisplay.css';

const ParameterDisplay = ({ title, parameter }) => {
    return (
        <div className="parameter-display-container">
            <h3 className="heading">{title}</h3>
            <div className="parameter-container">
                <span className="parameter-value">{parameter}</span>
            </div>
        </div>
    );
};

export default ParameterDisplay;
