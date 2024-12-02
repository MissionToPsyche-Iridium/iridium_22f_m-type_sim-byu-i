import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { SharedContext } from "./SharedContext";

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
        param15, setParam17,
        param17, setParam19,
        param18, setParam20,
    } = useContext(SharedContext);

    const [items, setItems] = useState([
        param13,
        param14,
        param15,
        param17,
        param18,
    ]);


    // Function to handle value change in input field
    const handleInputChange = (id, newValue) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, value: newValue } : item
            )
        );
    };

    // Function to handle value change on input blur (focus lost)
    const handleValueChange = (id, newValue) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, value: newValue } : item
            )
        );
    };

    return (

        <>
            {/* Set container */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', }}>

                {/* Create grid formation */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", padding: "2px", alignItems: "center", justifyItems: "center" }}>

                    {/* Loop through parameters, display each object separately, display borders, center */}
                    {items.map((item) => (
                        <div style={{ border: "1px solid #000", borderRadius: "2px", padding: "5px", textAlign: "center", width: '130px', height: '120px', alignItems: 'center' }} key={item.id}>
                            <h4 style={{ padding: "5px", marginTop: "5px", marginBottom: "5px" }}>{item.title}</h4>
                            <h5 style={{ fontSize: "1 rem", color: "#666" }}>{item.subtitle}</h5>
                            <input
                                type="number"
                                value={item.value}
                                style={{width: '100px'} }
                                onChange={(e) => handleInputChange(item.id, e.target.value)} // Update value as user types
                                onBlur={(e) => handleValueChange(item.id, e.target.value)} // Update value on blur
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Display finished button */}
            <button
                style={{
                    background: '#007bff', 
                    color: '#fff',
                    fontSize: '16px',
                    textAlign: 'center',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '250px',
                }}
                onClick={mainMenu}
            >
                Finished
            </button>
        </>
    );
};

export default ConfigurationMenu;

