﻿using MASS.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MASS.Server.Services;

namespace MASS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParametersController : ControllerBase
    {
        private readonly CalculationService _calculationService;

        // Inject the CalculationService through the constructor
        public ParametersController(CalculationService calculationService)
        {
            _calculationService = calculationService;
        }

        // POST api/parameters
        [HttpPost]
        public IActionResult PostParameters([FromBody] Parameters parameters)
        {
            // Check if the parameters are valid
            if (parameters == null)
            {
                return BadRequest("Invalid parameters");
            }

            // Perform the calculations using the CalculationService
            double newTimeElapsed = _calculationService.CalculateElapsedTime(DateTime.Parse(parameters.StartTime), DateTime.Now);
            parameters.FuelRemaining = _calculationService.CalculateFuel(parameters.FuelRemaining, newTimeElapsed - parameters.TimeElapsed, parameters.UprThrustOn, parameters.LwrThrustOn);
            parameters.ShipDmg = _calculationService.CalculateDamage(parameters.ShipVelocity);
            parameters.ShipAltitude = _calculationService.CalculateAltitude(parameters.ShipAltitude, parameters.ShipVelocity, parameters.TimeElapsed - newTimeElapsed);
            parameters.ShipVelocity = _calculationService.CalculateVelocity(parameters.ShipAltitude);
            parameters.TimeElapsed = newTimeElapsed;

            // Map the Parameters model to the ParameterViewModel
            var parametersViewModel = new ParametersViewModel
            {
                Id = parameters.Id,
                Calculation = DateTime.Now.ToString("o"), // time calculations performed
                Velocity = parameters.ShipVelocity, // falling velocity
                Fuel = parameters.FuelRemaining, // fuel remaining
                Height = parameters.ShipAltitude, // new altitude
                Elapsed = parameters.TimeElapsed // time since simulation began
            };


            // Return the updated parameters as JSON
            return Ok(parametersViewModel); // Seemingly serializes to JSON automatically
        }
    }
}
