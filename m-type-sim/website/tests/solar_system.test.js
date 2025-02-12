// CelestialLocations.test.js
import { expect, test } from 'vitest';
import { CelestialBody, CelestialLocations } from '../src/celestial_bodies/solar_system.js';

// Function to check if the returned object is valid
function isValidPosition(position) {
  return position && typeof position.x === 'number' && typeof position.y === 'number' && typeof position.z === 'number';
}

test('Verify that getAbsolutePosition returns a valid x,y,z object for all celestial bodies', () => {
  const today = new Date();
  console.log('The current day is: ' + today);

  // Loop through all celestial bodies and verify the results
  for (const body in CelestialBody) {
    const position = CelestialLocations.getAbsolutePosition(today, CelestialBody[body]);
    console.log('Position for: ' 
      + CelestialBody[body] 
      + '\t x: ' + position.x 
      + '\t y: ' + position.y
      + '\t z: ' + position.z);
    expect(isValidPosition(position)).toBe(true);
  }

});
