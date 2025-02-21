
import * as THREE from 'three';

export class SolarSystemData {
    // type: (star, planet, moon, asteriod, comet), orbit: object orbited , semiMajAxis: semi-major axis, ecc: eccentricity, incl: inclination,
    // longAscNode: longitude of ascending node, argPeri: argument of perihelion or argument of periapsis (moons)
    // mean: mean longitude or mean anomaly(moons), mass: mass in kg, rot: rotation in degrees/second, tilt: in degrees (note: > 90 retrograde)
 
    static dataSet = Object.freeze({
        sun: { type: "star", orbit: "self", semiMajAxis: 0.00000000, ecc: 0.00000000, incl: 0.00000000, longAscNode: 0.0000000, argPeri: 0.0000000, mean: 0.000000, mass: 1.989e30, rot: 1.66e-4, tilt: 0.00 },
        mercury: { type: "planet", orbit: "sun", semiMajAxis: 0.38709927, ecc: 0.20563593, incl: 7.00497902, longAscNode: 48.3307659, argPeri: 77.4577963, mean: 252.250324, mass: 3.301e23, rot: 7.11e-5, tilt: 0.03 },
        venus: { type: "planet", orbit: "sun", semiMajAxis: 0.72333199, ecc: 0.00677255, incl: 3.39467605, longAscNode: 76.6799207, argPeri: 131.5329800, mean: 181.979099, mass: 4.867e24, rot: -1.71e-5, tilt: 177.40 },
        earth: { type: "planet", orbit: "sun", semiMajAxis: 1.00000011, ecc: 0.01671123, incl: 0.00004700, longAscNode: 174.8731400, argPeri: 102.9471900, mean: 100.464350, mass: 5.972e24, rot: 4.17e-3, tilt: 23.44 },
        mars: { type: "planet", orbit: "sun", semiMajAxis: 1.52366231, ecc: 0.09341233, incl: 1.84969142, longAscNode: 49.5580930, argPeri: 336.0408400, mean: 355.453320, mass: 6.417e23, rot: 4.06e-3, tilt: 25.19 },
        jupiter: { type: "planet", orbit: "sun", semiMajAxis: 5.20260318, ecc: 0.04838624, incl: 1.30327094, longAscNode: 100.5561500, argPeri: 14.7538500, mean: 34.404380, mass: 1.899e27, rot: 1.01e-2, tilt: 3.13 },
        saturn: { type: "planet", orbit: "sun", semiMajAxis: 9.55490900, ecc: 0.05554623, incl: 2.48446000, longAscNode: 113.7150400, argPeri: 92.8766900, mean: 50.067940, mass: 5.685e26, rot: 9.34e-3, tilt: 26.73 },
        uranus: { type: "planet", orbit: "sun", semiMajAxis: 19.2184100, ecc: 0.04638171, incl: 0.77213783, longAscNode: 74.2298800, argPeri: 170.9642000, mean: 314.055420, mass: 8.681e25, rot: -5.79e-3, tilt: 97.77 },
        neptune: { type: "planet", orbit: "sun", semiMajAxis: 30.1104000, ecc: 0.00858587, incl: 1.76917000, longAscNode: 131.7216900, argPeri: 44.9648000, mean: 304.348220, mass: 1.024e26, rot: 6.19e-3, tilt: 28.32 },
        psycheAsteroid: { type: "asteroid", orbit: "sun", semiMajAxis: 2.92270000, ecc: 0.14000000, incl: 3.10000000, longAscNode: 150.8200000, argPeri: 228.2100000, mean: 53.036000, mass: 2.720e19, rot: 2.39e-2, tilt: 85.00 },
        // The moon's position is not calculated by this class YET. Once it does, then LunarData.js will be removed
        moon: { 
            type: "moon", 
            orbit: "earth", 
            semiMajAxis: 0.00257300, 
            ecc: 0.05490000, 
            incl: 5.14500000, 
            longAscNode: 125.0800000, 
            argPeri: 318.1500000, 
            mean: 135.270000, 
            mass: 7.342e22, 
            rot: 1.52e-4, 
            tilt: 1.54 },
    });

    static verifyObjectExists(objectName) {
        if (dataSet.hasOwnProperty(objectName)) {
            return true;
        } else {
            console.log(objectName + " was not found on the dataSet")
            return false;
        }
    }

    static getKeplerianElements(celestialName) {
        const data = SolarSystemData.dataSet[celestialName];
        return {
            type: data.type,
            orbit: data.orbit,
            semiMajAxis: data.semiMajAxis,
            ecc: data.ecc,
            incl: data.incl,
            longAscNode: data.longAscNode,
            argPeri: data.argPeri,
            mean: data.mean
        };
    };

    static getMass(celestialName) {
        const data = SolarSystemData.dataSet[celestialName];
        return {
            mass: data.mass
        };
    };

    static getRotationalData(celestialName){
        const data = SolarSystemData.dataSet[celestialName];
        return {
            rot: data.rot,
            tilt: data.tilt
        };
    };
};



export class CelestialLocations {


    static getAbsolutePosition(date, bodyName) {
        return CelestialLocations.getAbsolute(date, bodyName);
    };

    static getRelativePosition(date, bodyName, referenceBodyName) {
        let body = CelestialLocations.getAbsolute(date, bodyName);
        let reference = CelestialLocations.getAbsolute(date, referenceBodyName);
        let relative = CelestialLocations.subtractPositions(reference, body);
        return relative;
    };

    static subtractPositions(body, reference) {
        return {
            x: reference.x - body.x,
            y: reference.y - body.y,
            z: reference.z - body.z
        };
    };

    static getAbsolute(date, bodyName) {
        if (bodyName === 'sun') {
            // return { x: 0.0, y: 0.0, z: 0.0 };
            return new THREE.Vector3()
        }
        else if (SolarSystemData.dataSet.hasOwnProperty(bodyName)) {
            // console.log(SolarSystemData.getKeplerianElements(bodyName));
            return CelestialLocations.calculateOrbitalPosition(
                date,
                SolarSystemData.getKeplerianElements(bodyName)
            );
        } else {
            throw new Error('Unknown celestial body')
        }
    }
    
    static calculateOrbitalPosition(date, elements) {
        const semiMajAxis = elements.semiMajAxis;
        const ecc = elements.ecc;
        const incl = elements.incl;
        const longAscNode = elements.longAscNode;
        const argPeri = elements.argPeri;
        const meanLong = elements.mean;
        const daysSinceJ2000 = (date - new Date('2000-01-01T12:00:00Z')) / (1000 * 60 * 60 * 24);
        const meanAnomaly = CelestialLocations.degreesToRadians(meanLong + 0.98560028 * daysSinceJ2000);
        const eccentricAnomaly = CelestialLocations.solveKeplersEquation(meanAnomaly, ecc);
        const trueAnomaly = 2 * Math.atan2(Math.sqrt(1 + ecc) * Math.sin(eccentricAnomaly / 2),
            Math.sqrt(1 - ecc) * Math.cos(eccentricAnomaly / 2));
        const distance = semiMajAxis * (1 - ecc * Math.cos(eccentricAnomaly));
        const xOrbitalPlane = distance * Math.cos(trueAnomaly);
        const yOrbitalPlane = distance * Math.sin(trueAnomaly);

        const Ω = CelestialLocations.degreesToRadians(longAscNode);
        const ω = CelestialLocations.degreesToRadians(argPeri);
        const i = CelestialLocations.degreesToRadians(incl);

        const xEcliptic = xOrbitalPlane * (Math.cos(Ω) * Math.cos(ω) - Math.sin(Ω) * Math.sin(ω) * Math.cos(i)) - yOrbitalPlane * (Math.cos(Ω) * Math.sin(ω) + Math.sin(Ω) * Math.cos(ω) * Math.cos(i));
        const yEcliptic = xOrbitalPlane * (Math.sin(Ω) * Math.cos(ω) + Math.cos(Ω) * Math.sin(ω) * Math.cos(i)) - yOrbitalPlane * (Math.sin(Ω) * Math.sin(ω) - Math.cos(Ω) * Math.cos(ω) * Math.cos(i));
        const zEcliptic = xOrbitalPlane * (Math.sin(ω) * Math.sin(i)) + yOrbitalPlane * (Math.cos(ω) * Math.sin(i));

        // return { x: xEcliptic, y: yEcliptic, z: zEcliptic };
        return new THREE.Vector3(xEcliptic, yEcliptic, zEcliptic);
    };

    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static solveKeplersEquation(meanAnomaly, ecc) {
        let eccentricAnomaly = meanAnomaly;
        for (let i = 0; i < 100; i++) {
            const deltaE = (eccentricAnomaly - ecc * Math.sin(eccentricAnomaly)
                - meanAnomaly) / (1 - ecc * Math.cos(eccentricAnomaly));
            eccentricAnomaly -= deltaE;
            if (Math.abs(deltaE) < 1e-6) break;
        }
        return eccentricAnomaly;
    }

    static distanceToSun(absolutePosition) {
        return Math.sqrt(
            Math.pow(absolutePosition.x, 2) +
            Math.pow(absolutePosition.y, 2) +
            Math.pow(absolutePosition.z, 2)
        )
    };
  
};

