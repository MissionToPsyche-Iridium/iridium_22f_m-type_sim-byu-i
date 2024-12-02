using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MASS.Server.Models
{
    public class Parameters
    {
        [Range(1000,10000)]
        public int Id { get; set; }
        [Range(0,2)]
        public int Difficulty { get; set; } // 0 = novice, 1 = intermediate, 2 = expert

        // Constant parameters
        public const double AsteroidRadius = 14.125; // 14.125 km
        public const double ShipRadius = 1.1; // 1.1 m
        public const double ShipMass = 1300; // 1300 kg
        public const double ShipStartVelocity = 0; // 0 m/s
        public const double FuelStartCapacity = 200; // 200 kg
        public const double OOBThreshold = 400; // >400 km
        public const double DmgThreshold = 10; // 10% (how much impact feet can sustain before ship is damaged)

        // Configurable parameters (for levels above novice)
        [Range(0,400)]
        public double ShipStartAltitude { get; set; } // 400 km for novice level
        public double ShipStartAngle { get; set; } // 0 degrees directly above asteroid for novice level
        public double ShipStartFacing { get; set; } // 0 degrees for novice level
        [Range(0,400)]
        public double ThrustStartAltitude { get; set; } // unused for novice level
        public double ShipRotationSpeed { get; set; } // 0 for novice level
        [Range(0,250)]
        public double UprThrustLevel { get; set; } // 250 N for novice level
        public double LwrThrustLevel { get; set; } // 250 N for novice level
        public double UprThrustAngle { get; set; } // 0 degrees for novice level
        public double LwrThrustAngle { get; set; } // 180 degrees for novice level

        // Conrolled parameters (for novice level)
        public bool UprThrustOn { get; set; }
        public bool LwrThrustOn { get; set; }

        // Derived parameters
        [Range(0.0101,0.206)]
        public double GravityAccel { get; set; }
        [Range(0,200)]
        public double FuelRemaining { get; set; }
        [Range(0,8.5)] // grams per second
        public double FuelConsumeRate { get; set; }
        public double ShipAltitude { get; set; }
        public double PriorAltitude { get; set; }
        public double ShipVelocity { get; set; }
        public double ShipTotalAccel { get; set; } // Gravity +/- Thrust
        public double ShipAngle { get; set; }
        public double ShipFacing { get; set; }
        public double ThrustVelocity { get; set; }
        public double ThrustAccel { get; set; }
        [Range(0,100)]
        public double ShipDmg { get; set; } // ShipVelocity * 100 when ship collides with asteroid or impact from feet exceeds DmgThreshold
        public required string StartTime { get; set; } // Time when simulation begins
        public required string CurrentTime { get; set; } // Time when frontend requests new parameters
        public required string LastTime { get; set; } // Time when frontend last requested new parameters
        public double TimeElapsed { get; set; } // Current DateTime - TimeStart
    }
}
