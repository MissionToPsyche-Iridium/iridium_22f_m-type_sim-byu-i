

import * as THREE from 'three';
export class LunarData {
  static AU = 149597870.7; // 1 AU in kilometers
  static J2000 = 2451545.0; // Julian Date for J2000 epoch

  // Static function to calculate Julian Date
  static calculateJulianDate(year, month, day) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return (
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      B -
      1524.5
    );
  }

  // Static function to calculate Julian Date from a Date object
  static getJulianDate(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return LunarData.calculateJulianDate(year, month, day);
  }

  // Static function to calculate the Moon's position for a given date
  static calculateMoonPosition(date) {
    const jd = LunarData.getJulianDate(date);
    const daysSinceJ2000 = jd - LunarData.J2000;

    // Simplified orbital elements for the Moon (approximate)
    const N = 125.1228 - 0.0529538083 * daysSinceJ2000; // Longitude of the ascending node
    const i = 5.1454; // Inclination to the ecliptic
    const w = 318.0634 + 0.1643573223 * daysSinceJ2000; // Argument of perihelion
    const a = 384400; // Semi-major axis in km
    const e = 0.0549; // Eccentricity
    const M = (115.3654 + 13.0649929509 * daysSinceJ2000) % 360; // Mean anomaly

    // Convert angles to radians
    const rad = Math.PI / 180;
    const N_rad = N * rad;
    const i_rad = i * rad;
    const w_rad = w * rad;
    const M_rad = M * rad;

    // Solve Kepler's equation for E (Eccentric anomaly)
    let E = M_rad;
    let delta;
    do {
      delta = E - e * Math.sin(E) - M_rad;
      E -= delta / (1 - e * Math.cos(E));
    } while (Math.abs(delta) > 1e-6);

    // Calculate Moon's position in its orbit
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);

    // Calculate distance and true anomaly
    const r = Math.sqrt(xv * xv + yv * yv);
    const v = Math.atan2(yv, xv);

    // Calculate Moon's position in ecliptic coordinates
    const xh = r * (Math.cos(N_rad) * Math.cos(v + w_rad) - Math.sin(N_rad) * Math.sin(v + w_rad) * Math.cos(i_rad));
    const yh = r * (Math.sin(N_rad) * Math.cos(v + w_rad) + Math.cos(N_rad) * Math.sin(v + w_rad) * Math.cos(i_rad));
    const zh = r * (Math.sin(v + w_rad) * Math.sin(i_rad));

    // Convert position to AU
    const xh_AU = xh / LunarData.AU;
    const yh_AU = yh / LunarData.AU;
    const zh_AU = zh / LunarData.AU;

    return new THREE.Vector3(xh_AU, yh_AU, zh_AU);
  };

  static getMoonHelioPosition(date, earthPosition) {
    let moonPos = LunarData.calculateMoonPosition(date);
    let xHelio = moonPos.x + earthPosition.x;
    let yHelio = moonPos.y + earthPosition.y;
    let zHelio = moonPos.z + earthPosition.z;
    return new THREE.Vector3(xHelio, yHelio, zHelio);
  }


};