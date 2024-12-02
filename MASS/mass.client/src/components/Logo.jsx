import React from 'react';
import Psyche_Mission_Logo from '../assets/Psyche_Mission_Logo.png';
import NASA_Logo from '../assets/NASA_Logo.png';

const styles = theme => ({
    img: {}
})

function Logo() {

    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >
            <img src={NASA_Logo} alt="NASA Meatball Logo" />
            <img src={Psyche_Mission_Logo} alt="Psyche Mission Logo" />
        </div>
        
    );
}
export default Logo;
