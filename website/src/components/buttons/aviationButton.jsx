

// AviationButton.js
import React, { useState } from 'react';
import styles from '../../css/buttons/aviationButton.module.css';

function AviationButton({}) {
  const [onOff, setOnOff] = useState(false);

  const handleClick = () => {
    setOnOff(prevOnOff => !prevOnOff)
  }
  return (
    <div className={styles['aviation-button']} onClick={handleClick}>
      <div className={`${styles['led-light']} ${onOff ? styles['green'] : styles['red']}`}></div>
      <span>{onOff ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export default AviationButton;
