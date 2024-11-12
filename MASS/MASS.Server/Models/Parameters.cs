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
        public float AsteroidRadius { get; set; } // 14.125 km
        public float ShipRadius { get; set; } // 1.1 m
        public float ShipRotationSpeed { get; set; } // 0 for novice level
        public float ShipMass { get; set; } // 1300 kg
        public float ShipStartVelocity { get; set; } // 0 m/s
        public float FeetRadius { get; set; } // 5% of ship radius
        public int FuelStartCapacity { get; set; } // 200 kg
        public float OOBThreshold { get; set; } // >400 km
        public int DmgThreshold { get; set; } // ##% (how much impact feet can sustain before ship is damaged)

        // Configurable parameters (for levels above novice)
        [Range(0,400)]
        public float ShipStartDistance { get; set; } // 400 km for novice level
        public float ShipStartAngle { get; set; }
        public float ShipStartFacing { get; set; } // 90 degrees for novice level
        [Range(0,400)]
        public float ThrustStartDistance { get; set; }
        [Range(0,250)]
        public float ThrustLevel { get; set; } // 250 N for novice level
        public float ThrustAngle { get; set; } // 180 degrees for novice level

        // Conrolled parameters (for novice level)
        public bool ThrustOn { get; set; }

        // Derived parameters
        [Range(0.0101,0.206)]
        public float GravityAccel { get; set; }
        [Range(0,200)]
        public int FuelRemaining { get; set; }
        [Range(0,8.5)] // grams per second
        public int FuelConsumeRate { get; set; }
        public float ShipVelocity { get; set; }
        public float ShipTotalAccel { get; set; } // Gravity +/- Thrust
        public float ShipAngle { get; set; }
        public float ShipFacing { get; set; }
        public float ThrustVelocity { get; set; }
        public float ThrustAccel { get; set; }
        [Range(0,100)]
        public int ShipDmg { get; set; } // ShipVelocity * 100 when ship collides with asteroid or impact from feet exceeds DmgThreshold
        public DateTime TimeStart { get; set; }
        public DateTime TimeElapsed { get; set; } // Current DateTime - TimeStart
    }
}
