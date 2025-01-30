//using Microsoft.AspNetCore.Mvc;
//using MASS.Server.Models;
//
//namespace MASS.Server.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ValidationController : ControllerBase
//    {
//        [HttpPost("validate")]
//        public IActionResult ValidateInput([FromBody] Parameters input)
//        {
//            if (string.IsNullOrWhiteSpace(input.Value))
//            {
//                return BadRequest(new { Message = "Input cannot be empty." });
//            }
//
//            if (!decimal.TryParse(input.Value, out decimal number))
//            {
//                return BadRequest(new { Message = "Input must be a valid number with no special characters (only a decimal point is allowed)." });
//            }
//
//            if (number < -10000 || number > 10000)
//            {
//                return BadRequest(new { Message = "Input must be between -10,000 and 10,000." });
//            }
//
//            return Ok(new { Message = "Input is valid." });
//        }
//    }
//
//}