import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SharedContext } from "./SharedContext";

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#f4f4f4', //doublecheck color 
    border: '1px solid #ccc',
    // width: '100%', not sure if this will work
  },
  button: {
    background: '#007bff', // udoublecheck color
    color: '#fff',
    fontSize: '16px',
    textAlign: 'center',
    margin: '0 5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    background: '#fff',
    position: 'absolute',
    top: '100%',
    left: '0', 
    border: '1px solid #ccc',
    borderRadius: '4px',
    listStyle: 'none',
    padding: '10px',
    margin: '0',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee', //double check color
  },
};

// Makes a hover effect for dropdown
styles.dropdownItem[':hover'] = {
  background: '#f0f0f0', //check color
};

styles.button[':hover'] = {
  background: '#f0f0f0', //check color
};

const MainMenu = () => {

    const location = useLocation();

    useEffect(() => {
        // Perform logic when the location changes
        console.log('Location changed:', location);
    }, [location]);

    // Dropdown menu getter and setter
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // For dropdown that states novice, intermediate, or expert
    const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    };

    // Use navigate to move between components
    const navigate = useNavigate();

    // Move to simulation page on button click
    const handleButtonClickToSimulation = () => {
        navigate('/simulation');
    };

    // Move to home page on button click
    const handleButtonClickToHome = () => {
        navigate('/');
    };

    // Move to configuration menu on button click
    const handleButtonClickToConfiguration = () => {
        navigate('/configuration-menu');
    };
    
    // Import parameters for use
    const {
        param1, setParam1,
        param2, setParam2,
        param3, setParam3,
        param4, setParam4,
        param5, setParam5,
        param6, setParam6,
        param7, setParam7,
        param8, setParam8,
        param9, setParam9,
        param10, setParam10,
        param11, setParam11,
        param12, setParam12,
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param16, setParam16,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19,
        param20, setParam20,
    } = useContext(SharedContext);

    return (
        <div key={location.key}>
            <nav style={styles.nav}>
                <button style={styles.button}>Load Mission</button>
                <button style={styles.button}>Write Mission</button>
                <button style={styles.button} onClick={handleButtonClickToSimulation}>Start Simulation</button>
                <button style={styles.button} onClick={handleButtonClickToConfiguration}>Configuration Menu</button>
                <button style={styles.button} onClick={handleButtonClickToHome}>Exit Simulator</button>

                {/* The button that allows USER to pick which level they want to use */}
                <div style={styles.dropdownContainer}>
                    <button style={styles.button} onClick={toggleDropdown}>
                        Difficulty Level
                    </button>
                    {dropdownOpen && (
                        <ul style={styles.dropdownMenu}>
                        <li style={styles.dropdownItem}>Novice</li>
                        <li style={styles.dropdownItem}>Intermediate</li>
                        <li style={styles.dropdownItem}>Expert</li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default MainMenu;
