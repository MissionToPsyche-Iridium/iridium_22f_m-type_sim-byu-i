# Simulation Parameter Design for SDD

#### **Project Name:** _M-type Asteroid Sampling Simulator_

#### **Date:** _10/17/2024_

#### **Team Member assigned:** _Ryan Funk_

The following documentation fulfills these parts of the SRS:
- 3.1.5.2
- 3.1.5.4

## Developer Defined Parameters

These parameters are to be defined by the developer and unable to be tweaked by the standard user.

- Acceleration due to gravity of Psyche (float)
- Average diameter of Psyche (float)
- Rotation speed of Psyche (float)
- Mass of the spacecraft lander (float)
- Amount of fuel for thrusters designated for landing (int)
- Minimum force from landing impact that the lander can sustain (int)
- Diameter of landing feet (float)
- Minimum/maximum radial distances the lander can start at (float)
- Maximum level of thrust that can be exerted (int)
- Maximum distance of the lander from Psyche that's considered too far (out of bounds threshold) (float)

## User Defined Parameters

These parameters are to be adjusted by the user before (and perhaps during for some) the simulation. 

- **Starting location of the lander:** The location of the lander will be determined using the polar coordinate system. The coordinates for such are as follows.
    - Radial distance (ρ) (float)
    - polar angle (θ) (float)
- Facing angle of the lander (same conditions from lander location apply here)
- Distance of the lander from Psyche in which to turn on thrusters (float)
- Level of thrust to decrease gravitational acceleration (float)
- Angle of thrusters relative to the lander (float)

## Real-Time Parameters

These parameters are those that update in real time during the simulation, not defined or adjusted by a developer or user, and displayed to the user as information during runtime.

- Current acceleration of the lander (float)
- Current velocity of the lander (float)
- Current level of thrust (float)
- Amount of fuel remaining (int)
- Amount of damage the lander has sustained (int)
- Distance between the lander and Psyche (float)
- Time elapsed (float)

## Conclusion

With these parameters considered, implications can be made regarding the overall design.

- The simulation will run in two dimensions.
- Psyche's surface won't be perfectly symmetrical, making the facing angle of the lander and its rate of descent conditional by its starting location.
- The lander will start at a fixed position without any additional velocities due to orbit or otherwise.
- The lander must make a soft landing below the force of impact sustain threshold.
- The lander must make a secure landing without losing balance and toppling over.

Overall, the user's goal is to adjust the given paramters in such a way that the spacecraft will make a safe, secure, and succesful landing on the potentially rough surface of Psyche at a given spot, thus enabling sample collection.
