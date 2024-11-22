using MASS.Server.Models;
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
            if (parameters == null)
            {
                return BadRequest("Invalid parameters");
            }

            // Perform the calculations using the CalculationService
         // parameters.CalculatedValue = _calculationService.CalculateSomething(parameters.Value1, parameters.Value2);

            // Map the Parameters model to the ParameterViewModel
            var parametersViewModel = new ParametersViewModel
            {
                Id = parameters.Id,
                Calculation = Convert.ToSingle(1.5), // time calculations performed(?)
                Velocity = parameters.ShipVelocity, // falling velocity
                Fuel = parameters.FuelRemaining, // fuel remaining
                Height = parameters.ShipDistance, // new altitude
                Elapsed = parameters.TimeElapsed // time since simulation began
            };


            // Return the updated parameters as JSON
            return Ok(parametersViewModel); // Seemingly serializes to JSON automatically
        }
    }
}
