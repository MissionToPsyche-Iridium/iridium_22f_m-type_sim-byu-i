
export const CelestialBody = Object.freeze({
    Sun: 'Sun',
    Mercury: 'Mercury',
    Venus: 'Venus',
    Earth: 'Earth',
    Mars: 'Mars',
    Jupiter: 'Jupiter',
    Saturn: 'Saturn',
    Uranus: 'Uranus',
    Neptune: 'Neptune',
    Psyche: 'Psyche',
})

export class CelestialLocations {

    // semiMajAxis: semi-major axis, ecc: eccentricity, incl: inclination,
    // longAscNode: longitude of ascending node, argPeri: argument of perihelion, meanLong: mean longitude
    static keplerianElements = Object.freeze({
        sun: {         semiMajAxis: 0.00000000, ecc: 0.00000000, incl: 0.00000000, longAscNode:   0.0000000, argPeri:   0.0000000, meanLong:   0.000000 },
        mercury: {     semiMajAxis: 0.38709927, ecc: 0.20563593, incl: 7.00497902, longAscNode:  48.3307659, argPeri:  77.4577963, meanLong: 252.250324 },
        venus: {       semiMajAxis: 0.72333199, ecc: 0.00677255, incl: 3.39467605, longAscNode:  76.6799207, argPeri: 131.5329800, meanLong: 181.979099 },
        earth: {       semiMajAxis: 1.00000011, ecc: 0.01671123, incl: 0.00004700, longAscNode: 174.8731400, argPeri: 102.9471900, meanLong: 100.464350 },
        mars: {        semiMajAxis: 1.52366231, ecc: 0.09341233, incl: 1.84969142, longAscNode:  49.5580930, argPeri: 336.0408400, meanLong: 355.453320 },
        jupiter: {     semiMajAxis: 5.20260318, ecc: 0.04838624, incl: 1.30327094, longAscNode: 100.5561500, argPeri:  14.7538500, meanLong:  34.404380 },
        saturn: {      semiMajAxis: 9.55490900, ecc: 0.05554623, incl: 2.48446000, longAscNode: 113.7150400, argPeri:  92.8766900, meanLong:  50.067940 },
        uranus: {      semiMajAxis: 19.2184100, ecc: 0.04638171, incl: 0.77213783, longAscNode:  74.2298800, argPeri: 170.9642000, meanLong: 314.055420 },
        neptune: {     semiMajAxis: 30.1104000, ecc: 0.00858587, incl: 1.76917000, longAscNode: 131.7216900, argPeri:  44.9648000, meanLong: 304.348220 },
        '16-psyche': { semiMajAxis: 2.92270000, ecc: 0.14000000, incl: 3.10000000, longAscNode: 150.8200000, argPeri: 228.2100000, meanLong:  53.036000 },
    });

    static getAbsolutePosition(date, bodyName) {
        return CelestialLocations.getAbsolute(date, bodyName);
    };

    static getRelativePostion(date, bodyName, referenceBodyName) {
        body = CelestialLocations.getAbsolute(date, bodyName);
        reference = CelestialLocations.getAbsolute(date, referenceBodyName);
        relative = CelestialLocations.subtractPositions(reference, body);
        return relative;
    };

    static subtractPositions(reference, body) {
        return {
            x: reference.x - body.x,
            y: reference.y - body.y,
            z: reference.z - body.z
        };
    };

    static getAbsolute(date, bodyName) {
        switch (bodyName) {
            case CelestialBody.Sun:
                return { x: 0.0, y: 0.0, z: 0.0};
            case CelestialBody.Mercury:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['mercury']);
            case CelestialBody.Venus:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['venus']);
            case CelestialBody.Earth:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['earth']);
            case CelestialBody.Mars:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['mars']);
            case CelestialBody.Jupiter:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['jupiter']);
            case CelestialBody.Saturn:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['saturn']);
            case CelestialBody.Uranus:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['uranus']);
            case CelestialBody.Neptune:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['neptune']);
            case CelestialBody.Psyche:
                return CelestialLocations.calculateOrbitalPosition(date, CelestialLocations.keplerianElements['16-psyche']);
            default:
                throw new Error('Unknown celestial body')
                break;
        };
    };
    
    static calculateOrbitalPosition(date, elements) {
        const semiMajAxis = elements.semiMajAxis;
        const ecc = elements.ecc;
        const incl = elements.incl;
        const longAscNode = elements.longAscNode;
        const argPeri = elements.argPeri;
        const meanLong = elements.meanLong;
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

        return { x: xEcliptic, y: yEcliptic, z: zEcliptic };
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


