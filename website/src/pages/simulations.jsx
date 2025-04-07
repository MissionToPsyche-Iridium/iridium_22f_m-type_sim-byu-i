import React from 'react';
import '../css/pages/simulations.css'

function Simulations() {

    const openNewPage = (mission) => {
        sessionStorage.setItem('mission', mission)
        window.open('/Simulator', '_blank')
    };

    return (
      <div className="simulations-list">
        <h1>Simulations to choose from</h1>
        <h3>Psyche Mission Simulations</h3>
        <div className="mission-buttons">
          <button className="available" onClick={() => openNewPage("launch-psyche")}>
            <h4>Launch Psyche</h4>
            <h5>Oct 5, 2023</h5>
          </button>
          <button className="available" onClick={() => openNewPage("separation-from-rocket")}>
            <h4>Separation from Rocket</h4>
            <h5>Oct 5, 2023</h5>
          </button>
          <button className="available" onClick={() => openNewPage("initial-checkout")}>
            <h4>Initial Checkout</h4>
            <h5>Oct 5, 2023</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("propulsion-checkout")}>
            <h4>Propulsion Checkout</h4>
            <h5>Oct 8, 2023</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("active-science-instrument-checkout")}>
            <h4>Active Science Instrument Checkout</h4>
            <h5>Dec 12, 2023</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("cruise-1-to-mars")}>
            <h4>Cruise 1 to Mars</h4>
            <h5>Jan 13, 2024</h5>
          </button>
          <button className="available" onClick={() => openNewPage("mars-gravity-assist")}>
            <h4>Mars Gravity Assist</h4>
            <h5>May, 2026</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("cruise-2-to-16-psyche")}>
            <h4>Cruise 2 to 16-Psyche</h4>
            <h5>May, 2026</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("approach-to-16-psyche")} >
            <h4>Approach to 16-Psyche</h4>
            <h5>May, 2029</h5>
          </button>
          <button className="available" onClick={() => openNewPage("orbital-capture")}>
            <h4>Oribital Capture</h4>
            <h5>May, 2029</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("enter-orbit-a")}>
            <h4>Enter Orbit A</h4>
            <h5>Aug, 2029</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("enter-orbit-b1")}>
            <h4>Enter Orbit B1</h4>
            <h5>Oct, 2029</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("enter-orbit-d")}>
            <h4>Enter Orbit D</h4>
            <h5>May, 2030</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("enter-orbit-c")}>
            <h4>Enter Orbit C</h4>
            <h5>Jan, 2031</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("enter-orbit-b2")}>
            <h4>Enter Orbit B2</h4>
            <h5>May, 2031</h5>
          </button>
        </div>
        <h3>Psyche II (What if?) Missions</h3>
        <div className="mission-buttons">
          <button className="not-available" onClick={() => openNewPage("land-on-16-psyche")}>
            <h4>Land on 16-Psyche</h4>
            <h5>What if ?</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("collect-samples")}>
            <h4>Collect Samples</h4>
            <h5>What if ?</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("launch-samples")}>
            <h4>Launch Samples</h4>
            <h5>What if ?</h5>
          </button>
          <button className="not-available" onClick={() => openNewPage("return-to-earth")}>
            <h4>Return to Earth</h4>
            <h5>What if ?</h5>
          </button>
        </div>
      </div>
    );
}

export default Simulations;