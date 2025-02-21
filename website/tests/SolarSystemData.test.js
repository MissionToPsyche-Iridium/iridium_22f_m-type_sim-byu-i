
import { expect, test } from 'vitest';
import { SolarSystemData, CelestialLocations } from '../src/celestial_bodies/SolarSystemData.js';

import * as THREE from 'three';

// Function to check if the returned object is valid
function isValidPosition(position) {
  return position && typeof position.x === 'number' && typeof position.y === 'number' && typeof position.z === 'number';
}

test('TEST 01 - Verify getAbsolutePosition returns valid Vector3 for all \n' 
  + '\t\t Solar System item', () => {
  const today = new Date();
  console.log('The current day is: ' + today);
  // Loop through all celestial bodies and verify the results
  for (const name in SolarSystemData.dataSet) {
    // *******************************************************************
    console.log(name);
    // *******************************************************************
    const position = CelestialLocations.getAbsolutePosition(today, name);
    // const position = CelestialLocations.getAbsolutePosition(today, CelestialName[name]);
    // console.log('Position for: ' + CelestialName[name] + '\t x: ' 
    // + position.x + '\t y: ' + position.y + '\t z: ' + position.z);
    expect(isValidPosition(position)).toBe(true);
  }

});

test('TEST 02 - Verify that getRelativePosition matches getAbsolutePostition when relative to sun', () => {
  const today = new Date();
  const earthAbs = CelestialLocations.getAbsolutePosition(today, "earth");
  // console.log('Position for: ' + 'Earth' + '\t x: ' + earthAbs.x
  //   + '\t y: ' + earthAbs.y + '\t z: ' + earthAbs.z);
  const sunAbs = CelestialLocations.getAbsolutePosition(today, "sun");
  // console.log('Position for: ' + 'Sun' + '\t x: ' + sunAbs.x
  //   + '\t y: ' + sunAbs.y + '\t z: ' + sunAbs.z);
  const earthRelSun = CelestialLocations.getRelativePosition(today, "earth", "sun");
  // console.log('Position for: ' + 'Earth' + '\t x: ' + earthRelSun.x
  //   + '\t y: ' + earthRelSun.y + '\t z: ' + earthRelSun.z);
  expect(earthAbs).toEqual(earthRelSun);
});

test('TEST 03 - Verify that getRelativePosition signs are opposite when sun is relative to planet', () => {
  const today = new Date();
  const marsAbs = CelestialLocations.getAbsolutePosition(today, "mars");
  console.log('Position for: ' + 'mars rel sun' + '\t x: ' + marsAbs.x
    + '\t y: ' + marsAbs.y + '\t z: ' + marsAbs.z);
  const sunAbs = CelestialLocations.getAbsolutePosition(today, "sun");
  console.log('Position for: ' + 'Sun' + '\t x: ' + sunAbs.x + '\t y: ' 
       + sunAbs.y + '\t z: ' + sunAbs.z);
  const sunRelMars = CelestialLocations.getRelativePosition(today, "sun", "mars");
  console.log('Position for: ' + 'Sun rel mars' + '\t x: ' + sunRelMars.x
    + '\t y: ' + sunRelMars.y + '\t z: ' + sunRelMars.z);
  const tolerance = 1e-10;
  let x = sunAbs.x + sunRelMars.x;
  let y = sunAbs.y + sunRelMars.y;
  let z = sunAbs.z + sunRelMars.z;
  expect(x).toBeLessThan(tolerance);
  expect(y).toBeLessThan(tolerance);
  expect(z).toBeLessThan(tolerance);
});