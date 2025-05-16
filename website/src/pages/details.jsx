import React from 'react';
import '../css/pages/details.css'
import MissionDetails from '../components/details/missionDetails';
import SpacecraftDetails from '../components/details/spacecraftDetails';

function Details() {


    return (
        <div className="psyche-details">

            <h2>Psyche Asteroid</h2>
            <p>Psyche is a NASA mission to study a metal-rich asteroid with the same name, located in the main asteroid belt between Mars and Jupiter. This is NASA’s first mission to study an asteroid that has more metal than rock or ice. Psyche launched Oct. 13, 2023, at 10:19 a.m. EDT from Kennedy Space Center. Psyche lifted off from Launch Pad 39A aboard a SpaceX Falcon Heavy rocket. (Psyche is the first in a series of NASA science missions to be the primary payloads launched on a SpaceX Falcon Heavy rocket.)</p>
            <h2>Psyche Spacecraft</h2>
            <p>The body of the Psyche spacecraft is about the size of a small van, and it’s powered by solar electric propulsion. It has a magnetometer, a gamma-ray and neutron spectrometer, and a multispectral imager to study asteroid Psyche. The spacecraft will start sending images to Earth as soon as it spots the asteroid. </p>
            <img src="/iridium_22f_m-type_sim-byu-i/assets/images/psycheSpacecraft.jpg" alt="Psyche Spacecraft rendering" />
            <SpacecraftDetails />
            <MissionDetails></MissionDetails>
        </div>
    );
}

export default Details;