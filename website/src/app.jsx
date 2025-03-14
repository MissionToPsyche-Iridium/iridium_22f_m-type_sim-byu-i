import { useState, useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import './css/app.css'

// Adding Pages to the Router Dom
import NavBar from './pages/navBar';
import Home from "./pages/home";
import Simulations from './pages/simulations';
import Details from './pages/details';
import Simulator from './pages/simulator';


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
