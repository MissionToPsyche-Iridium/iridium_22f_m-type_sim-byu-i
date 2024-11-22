using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MASS.Server.Models
{
    public class ParametersViewModel
    {
        public int Id { get; set; }
        public float Calculation { get; set; } // time calculations performed
        public float Velocity { get; set; } // falling velocity
        public float Fuel { get; set; } // fuel remaining
        public float Height { get; set; } // new altitude
        public DateTime Elapsed { get; set; } // time since simulation began
    }
}
