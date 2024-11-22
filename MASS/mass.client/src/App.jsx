import { useEffect, useState } from 'react';

import './App.css'
import Welcome from './components/Welcome';
import Logo from './components/Logo';
import Activate from './components/Activate';
import Simulation from './components/Simulation';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import MoreInfo from './components/MoreInfo';
import MainMenu from './components/MainMenu';
import './App.css';


function App() {

    return (


        <>
            <Welcome />
            <Logo />
            <Simulation />
            <Activate />

        </>

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-page" element={<About />} />
                <Route path="/more-info-page" element={<MoreInfo />} />
                <Route path="/main-menu-page" element={<MainMenu />} />
            </Routes>
        </Router>
        

    );
 
}

export default App;