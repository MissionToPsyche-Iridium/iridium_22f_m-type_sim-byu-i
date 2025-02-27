import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import MoreInfo from './components/MoreInfo';
import MainMenu from './components/MainMenu';
import Simulation from './components/Simulation';
import { SharedProvider } from './components/SharedContext';
import ConstantParameter from './components/ConstantParameters';
import VariableParameter from './components/VariableParameters';
import ConfigurationMenu from './components/ConfigurationMenu';
import SimulationControls from './components/SimulationControls';
import SimulationView from './components/SimulationView';
import SamplingResults from './components/SamplingResults';
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
                    <Route path="/constant-parameter" element={<ConstantParameter />} />
                    <Route path="/configuration-menu" element={<ConfigurationMenu />} />
                    <Route path="/variable-parameter" element={<VariableParameter />} />
                    <Route path="/simulation-view" element={<SimulationView />} />
                    <Route path="/simulation-controls" element={<SimulationControls />} />
                </Routes>
            </Router>
        </SharedProvider >
        
    );
};

export default App;