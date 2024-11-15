using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MASS.Server.Models
{
    public class Parameters
    {
        public int Id { get; set; }
        [Range(0,2)]
        public int Difficulty { get; set; } // 0 = novice, 1 = intermediate, 2 = expert

        // Constant parameters
        public const float AsteroidRadius = (float)14.125; // 14.125 km
        public const float ShipRadius = (float)1.1; // 1.1 m
        public const float ShipMass = (float)1300; // 1300 kg
        public const float ShipStartVelocity = (float)0; // 0 m/s
        public const float FuelStartCapacity = (float)200; // 200 kg
        public const float OOBThreshold = (float)400; // >400 km
        public const float DmgThreshold = (float)10; // 10% (how much impact feet can sustain before ship is damaged)

        // Configurable parameters (for levels above novice)
        [Range(0,400)]
        public float ShipStartDistance { get; set; } // 400 km for novice level
        public float ShipStartAngle { get; set; } // directly above asteroid for novice level
        public float ShipStartFacing { get; set; } // 90 degrees for novice level
        [Range(0,400)]
        public float ThrustStartDistance { get; set; } // unused for novice level
        public float ShipRotationSpeed { get; set; } // 0 for novice level
        [Range(0,250)]
        public float ThrustLevel { get; set; } // 250 N for novice level
        public float ThrustAngle { get; set; } // 180 degrees for novice level

        // Conrolled parameters (for novice level)
        public bool ThrustOn { get; set; }

        // Derived parameters
        [Range(0.0101,0.206)]
        public float GravityAccel { get; set; }
        [Range(0,200)]
        public float FuelRemaining { get; set; }
        [Range(0,8.5)] // grams per second
        public float FuelConsumeRate { get; set; }
        public float ShipDistance { get; set; }
        public float ShipVelocity { get; set; }
        public float ShipTotalAccel { get; set; } // Gravity +/- Thrust
        public float ShipAngle { get; set; }
        public float ShipFacing { get; set; }
        public float ThrustVelocity { get; set; }
        public float ThrustAccel { get; set; }
        [Range(0,100)]
        public float ShipDmg { get; set; } // ShipVelocity * 100 when ship collides with asteroid or impact from feet exceeds DmgThreshold
        public DateTime TimeStart { get; set; }
        public DateTime TimeElapsed { get; set; } // Current DateTime - TimeStart
    }
}
