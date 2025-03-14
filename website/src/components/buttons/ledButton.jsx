import React, { useState, useEffect } from 'react';

function LEDButton({buttonName= 'blank', buttonState = false, updateState }) {
  const [name, setName] = useState("");
  const [state, setState] = useState(false);

  useEffect(() => {
    setName(buttonName);
  }, [buttonName])

  useEffect(() => {
    setState(buttonState);
  }, [buttonState]);

  const handleClick = () => {
    setState(prevState => !prevState);

    // updateState(name);
  };

    // border-color: ${(state.isTrue) ? 'rgb(81, 235, 81)' : 'red'},
    // border-color: ${state => (state.isTrue ? 'rgb(81, 235, 81)' : 'red')},
  const buttonStyle = {
    width: '50px',
    height: '15px',
    backgroundColor: '#5e5e5e',
    border: '3px solid',
    borderColor: state ? 'rgb(103, 223, 55)' : 'rgb(212, 202, 144)',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    fontSize: '9px',
    fontWeight: 'bold',
    color: 'white',
    padding: '10px',
    transition: 'background-color 0.3s ease-in-out'
  };

  const ledLightStyle = {
    width: '15px',
    height: '4px',
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: state ? 'rgb(81, 235, 81)' : 'red',
    borderRadius: '1px',
    transition: 'background-color 0.3s ease-in-out'
  };

  return (
    <div style={buttonStyle} onClick={handleClick}>
      {/* <div style={ledLightStyle}></div> */}
      <span>{name}</span>
    </div>
  );
}

export default LEDButton;



