import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import MoreInfo from './components/MoreInfo';
import MainMenu from './components/MainMenu';
import Simulation from './components/Simulation';
import ConstantParameter from './components/ConstantParameter';
import VariableParameter from './components/VariableParameters';
import { SharedProvider } from './components/SharedContext';
import './App.css';

function App() {

    return (
        <SharedProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-page" element={<About />} />
                    <Route path="/more-info-page" element={<MoreInfo />} />
                    <Route path="/main-menu-page" element={<MainMenu />} />
                    <Route path="/simulation" element={<Simulation />} />
                    <Route path="/constant-parameters" element={<ConstantParameter />} />
                    <Route path="/variable-parameters" element={<VariableParameter />} />
                </Routes>
            </Router>
        </SharedProvider >
    );
}

export default App;