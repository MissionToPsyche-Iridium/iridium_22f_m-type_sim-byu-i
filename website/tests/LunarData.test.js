
import { expect, test } from 'vitest';
import { LunarData } from '../src/celestial_bodies/LunarData.js';
import { CelestialLocations } from '../src/celestial_bodies/SolarSystemData.js';

import * as THREE from 'three';

// Function to check if the returned object is valid
function isValidPosition(position) {
  return position && typeof position.x === 'number' && typeof position.y === 'number' && typeof position.z === 'number';
}

test('TEST 01 - Verify calculateMoonPosition returns valid Vector3 object', () => {
    const today = new Date();
    console.log('The current day is: ' + today);
    console.log('TESTING THE MOON INFO');

    const position = LunarData.calculateMoonPosition(today);
    console.log('Position for: ' + 'Moon' + '\t x: '
        + position.x + '\t y: ' + position.y + '\t z: ' + position.z);
    expect(isValidPosition(position)).toBe(true);

});

test('TEST 02 - Verify Moons helio position', () => {
    const today = new Date();
    const moonGeoPos = LunarData.calculateMoonPosition(today);
    console.log(moonGeoPos);
    const earthHelio = CelestialLocations.getAbsolutePosition(today, "earth");
    console.log(earthHelio);
    const moonHelioPos = LunarData.getMoonHelioPosition(today, earthHelio);
    console.log(moonHelioPos);


});
