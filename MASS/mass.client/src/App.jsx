import { useEffect, useState } from 'react';
import './App.css'
import Welcome from './components/Welcome';
import Logo from './components/Logo';
import Activate from './components/Activate';
import Simulation from './components/Simulation';

function App() {

    return (

        <>
            <Welcome />
            <Logo />
            <Simulation />
            <Activate />

        </>
    );
 


}

export default App;