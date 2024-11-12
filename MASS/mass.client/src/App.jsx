import { useEffect, useState } from 'react';
import './App.css'
import Welcome from './components/Welcome';
import Logo from './components/Logo';
import Activate from './components/Activate';

function App() {

    return (

        <>
            <Welcome />
            <Logo />
            <Activate />
        </>
    );
 


}

export default App;