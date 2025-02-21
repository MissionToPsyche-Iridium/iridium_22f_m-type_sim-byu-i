
import * as THREE from 'three';
import SolarSystemData from './SolarSystemData'
import LunarData from './LunarData'

export class SolarSystemPositions {

    constructor() {
        this.sun = new THREE.Vector3();
        this.mercury = new THREE.Vector3();
        this.venus = new THREE.Vector3();
        this.earth = new THREE.Vector3();
        this.moon = new THREE.Vector3();
        this.mars = new THREE.Vector3();
        this.jupiter = new THREE.Vector3();
        this.saturn = new THREE.Vector3();
        this.uranus = new THREE.Vector3();
        this.neptune = new THREE.Vector3();
        this.asteroidPsyche = new THREE.Vector3();
        // Reference Frame defaults to the sun
        this.referenceFrame = "sun";
    }

    #updatePositions(date) {
        // All positions are caluclated relative to the sun
        // Then positions are adjusted according to referenceFrame for the getters

        // The sun is always Vector3(0,0,0) so no update is needed
        this.mercury = SolarSystemData.getAbsolutePosition(date, "mercury");
        this.venus = SolarSystemData.getAbsolutePosition(date, "venus");
        this.earth = SolarSystemData.getAbsolutePosition(date, "earth");
        this.moon = updateMoon(date, this.earth);
        this.mars = SolarSystemData.getAbsolutePosition(date, "mars");
        this.jupiter = SolarSystemData.getAbsolutePosition(date, "jupiter");
        this.saturn = SolarSystemData.getAbsolutePosition(date, "saturn");
        this.uranus = SolarSystemData.getAbsolutePosition(date, "uranus");
        this.neptune = SolarSystemData.getAbsolutePosition(date, "neptune");
        this.asteroidPsyche = SolarSystemData.getAbsolutePosition(date, "asteroidPsyche");
        adjustForReferenceFrame();
    }

    #updateMoon(date, earthPosition) {
        return LunarData.getMoonHelioPosition(date, earthPosition);
    }


    setReferenceFrame(location) {
        if (SolarSystemData.verifyObjectExists(location)) {
            // Reference frame can only change if object name is in dataSet
            this.referenceFrame = location;
        } else {
            console.log("ERROR: Unable to change reference frame");
        }
    }

    #adjustForReferenceFrame() {
        if (this.referenceFrame === "sun") {
            return;
        }
        const shiftVector = new THREE.Vector3();
        switch(this.referenceFrame) {
            case "mercury":
                shiftVector.copy(this.mercury);
                break;
            case "venus":
                shiftVector.copy(this.venus);
                break;
            case "earth":
                shiftVector.copy(this.earth);
                break;
            case "moon":
                shiftVector.copy(this.moon);
                break;
            case "mars":
                shiftVector.copy(this.mars);
                break;
            case "jupiter":
                shiftVector.copy(this.jupiter);
                break;
            case "saturn":
                shiftVector.copy(this.saturn);
                break;
            case "uranus":
                shiftVector.copy(this.uranus);
                break;
            case "neptune":
                shiftVector.copy(this.neptune);
                break;
            case "psycheAsteroid":
                shiftVector.copy(this.psycheAsteroid);
                break;
            default:
                console.log("Error: Unable to Adjust Reference Frame");
                // aborting shift
                return;
            // shift all objects
        }
        shiftVector.negate();
        this.sun.add(shiftVector);
        this.mercury.add(shiftVector);
        this.venus.add(shiftVector);
        this.earth.add(shiftVector);
        this.moon.add(shiftVector);
        this.mars.add(shiftVector);
        this.jupiter.add(shiftVector);
        this.saturn.add(shiftVector);
        this.uranus.add(shiftVector);
        this.neptune.add(shiftVector);
        this.asteroidPsyche.add(shiftVector);
    }

    getPositionsAU(date) {
        updatePositions(date);
        return {
            sun: this.sun,
            mercury: this.mercury,
            venus: this.venus,
            earth: this.earth,
            moon: this.moon,
            mars: this.mars,
            jupiter: this.jupiter,
            saturn: this.saturn,
            uranus: this.uranus,
            neptune: this.neptune,
            asteroidPsyche: this.asteroidPsyche
        }
    }

    getPositionsKM(date) {
        updatePositions(date);
        const kmInAU = 149597870.7;
        return {
            sun: this.sun.multiplyScalar(kmInAU),
            mercury: this.mercury.multiplyScalar(kmInAU),
            venus: this.venus.multiplyScalar(kmInAU),
            earth: this.earth.multiplyScalar(kmInAU),
            moon: this.moon.multiplyScalar(kmInAU),
            mars: this.mars.multiplyScalar(kmInAU),
            jupiter: this.jupiter.multiplyScalar(kmInAU),
            saturn: this.saturn.multiplyScalar(kmInAU),
            uranus: this.uranus.multiplyScalar(kmInAU),
            neptune: this.neptune.multiplyScalar(kmInAU),
            asteroidPsyche: this.asteroidPsyche.multiplyScalar(kmInAU)
        }
    }

    getPositionsAUScaled(date, scalingFactor) {
        updatePositions(date);
        return {
            sun: this.sun.multiplyScalar(scalingFactor),
            mercury: this.mercury.multiplyScalar(scalingFactor),
            venus: this.venus.multiplyScalar(scalingFactor),
            earth: this.earth.multiplyScalar(scalingFactor),
            moon: this.moon.multiplyScalar(scalingFactor),
            mars: this.mars.multiplyScalar(scalingFactor),
            jupiter: this.jupiter.multiplyScalar(scalingFactor),
            saturn: this.saturn.multiplyScalar(scalingFactor),
            uranus: this.uranus.multiplyScalar(scalingFactor),
            neptune: this.neptune.multiplyScalar(scalingFactor),
            asteroidPsyche: this.asteroidPsyche.multiplyScalar(scalingFactor)
        }
    }
};