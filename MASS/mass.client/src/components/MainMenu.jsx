import React, { useState } from 'react';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // For dropdown that states novice, intermediate, or expert
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={styles.nav}>
      <button style={styles.button}>Load Mission</button>
      <button style={styles.button}>Write Mission</button>
      <button style={styles.button}>Start Simulation</button>
      <button style={styles.button}>Configuration Menu</button>
      <button style={styles.button}>Exit Simulator</button>

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
  );
};

export default MainMenu;
