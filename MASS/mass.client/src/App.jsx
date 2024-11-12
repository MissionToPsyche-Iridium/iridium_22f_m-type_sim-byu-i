import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import Logo from './components/Logo';
import Activate from './components/Activate';
import Info from './components/Info';
import './App.css';

function App() {

    return (

        <>
            <Welcome />
            <Logo />
            <Activate />
            <Info />
        </>
        
    );
 


}

export default App;