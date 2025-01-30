using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MASS.Server.Models
{
    public class ParametersViewModel
    {
        public int Id { get; set; }
        public required string Calculation { get; set; } // time calculations performed
        public double Velocity { get; set; } // falling velocity
        public double Fuel { get; set; } // fuel remaining
        public double Height { get; set; } // new altitude
        public double Elapsed { get; set; } // time since simulation began
    }
}
