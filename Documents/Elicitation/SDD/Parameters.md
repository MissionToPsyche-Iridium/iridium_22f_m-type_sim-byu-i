# Simulation Parameter Design for SDD

#### **Project Name:** _M-type Asteroid Sampling Simulator_

#### **Date:** _10/17/2024_

#### **Team Member assigned:** _Ryan Funk_

## Developer Defined Parameters

These parameters are to be defined by the developer and unable to be tweaked by the standard user.

- Acceleration due to gravity of Psyche
- Average diameter of Psyche
- Rotation speed of Psyche
- Mass of the spacecraft lander
- Amount of fuel for thrusters designated for landing
- Minimum force from landing impact that the lander can sustain
- Size of landing feet
- Minimum/maximum radial distances the lander can start at
- Maximum level of thrust that can be exerted
- Maximum distance of the lander from Psyche that's considered too far (out of bounds threshold)

## User Defined Parameters

These parameters are to be adjusted by the user before (and perhaps during for some) the simulation. 

- **Starting location of the lander:** Depending on whether the simulation will be in 2D or 3D would determine whether Psyche is depicted as spherical or circular, thus changing how the location of the lander is calculated. Below are the necessary parameters for either scenario.
    - **Polar coordinates (2D):** Radial distance (ρ), polar angle (θ)
    - **Spherical coordinates (3D):** Radial distance (ρ), polar angle (θ), azimuthal angle (φ)
- Facing angle of lander (same conditions from lander location apply here)
- Distance of lander from Psyche in which to turn on thrusters
- Level of thrust to decrease gravitational acceleration
- Angle of thrusters relative to lander

## Conclusion

With these parameters considered, implications can be made regarding the overall design.

- Psyche's surface won't be perfectly symmetrical, making the facing angle of the lander and its rate of descent conditional by its starting location.
- The lander will start at a fixed position without any additional velocities due to orbit or otherwise.
- The lander must make a soft landing below the force of impact sustain threshold.
- The lander must make a secure landing without losing balance and toppling over.

Overall, the user's goal is to adjust the given paramters in such a way that the spacecraft will make a safe, secure, and succesful landing on the potentially rough surface of Psyche at a given spot, thus enabling sample collection.