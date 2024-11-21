import React from 'react';
import Welcome from './Welcome';
import Logo from './Logo';
import Activate from './Activate';
import Info from './Info';
import AboutButton from './AboutButton';

function Home() {

    return (

        <>
            <Welcome />
            <br />
            <Logo />
            <br />
            <Activate />
            <br />
            <Info />
            <br />
            <AboutButton />
        </>

    );
}

export default Home
