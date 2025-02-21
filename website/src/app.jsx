import { useState, useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import './css/App.css'

// Adding Pages to the Router Dom
import NavBar from './components/NavBar';
import Home from "./pages/Home"
import Simulations from './pages/Simulations';
import Details from './pages/Details';
import Simulator from './pages/Simulator';


function App() {

  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    // Only hide the NavBar for the simulator
    setShowNavBar(location.pathname !== '/Simulator')
  }, [location]);


  return (
    <div>
      {showNavBar && <NavBar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
