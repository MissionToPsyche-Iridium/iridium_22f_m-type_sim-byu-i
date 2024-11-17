namespace MASS.Server.Services
{
    public class CalculationService
    {
        private const double GRAVITY_ACCEL_SURFACE = 0.206; // m/s²
        private const double MAX_DAMAGE_THRESHOLD = 1.0; // m/s
        private const double FUEL_CONSUMPTION_RATE = -0.0085; // kg per second

        public double CalculateVelocity(double altitude)
        {
            // Formula: falling velocity (m/s) = 2,669,600 / (113,400 + altitude)
            return 2669600 / (113400 + altitude);
        }

        public double CalculateFuel(double lastFuelLevel, double timeElapsed, bool thrusterOn)
        {
            // Formula: current fuel level (kg) = fuel level at last calculation - (time elapsed * rate)
            return thrusterOn ? lastFuelLevel - (timeElapsed * FUEL_CONSUMPTION_RATE) : lastFuelLevel;
        }

        public double CalculateDamage(double velocity)
        {
            // Formula: < 1 m/s = (velocity * 100), >= 1 m/s = 100% damage
            return velocity < MAX_DAMAGE_THRESHOLD ? velocity * 100 : 100;
        }

        public double CalculateAltitude(double lastAltitude, double velocity, double timeElapsed)
        {
            // Formula: current altitude = last altitude - (falling velocity * time elapsed)
            return lastAltitude - (velocity * timeElapsed);
        }

        public double CalculateElapsedTime(DateTime simulationStartTime, DateTime currentTime)
        {
            // Formula: elapsed time = current time - simulation start time
            return (currentTime - simulationStartTime).TotalSeconds;
        }

        public double CalculateTimeSinceLastUpdate(DateTime lastUpdateTime, DateTime currentTime)
        {
            // Formula: time since last calculation = current time - last update time
            return (currentTime - lastUpdateTime).TotalSeconds;
        }
    }
}
