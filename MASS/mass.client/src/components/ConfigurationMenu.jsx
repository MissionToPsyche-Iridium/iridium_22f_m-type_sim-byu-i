import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedContext } from "./SharedContext";

const styles = {
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
};

function ConfigurationMenu() {

    // Use navigate to move between components
    const navigate = useNavigate();

    // Move to configuration menu on button click
    const mainMenu = () => {
        navigate('/main-menu-page');
    };

    // Import parameters for use
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param17, setParam17,
    } = useContext(SharedContext);

    const [items, setItems] = useState([
        param13,
        param14,
        param15,
        param17,
    ]);

    return (
        <>
            <h2>Configuration Menu</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", padding: "2px" }}>
                
                    {/* Loop through the array using .map() */}
                    {items.map((item) => (
                        
                        <li key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.subtitle}</p>
                            <p>Value: {item.value}</p>
                        </li>
                    ))}
                
            </div>
            <button style={styles.button} onClick={mainMenu}>Finished</button>
        </>
    );
};

export default ConfigurationMenu;
