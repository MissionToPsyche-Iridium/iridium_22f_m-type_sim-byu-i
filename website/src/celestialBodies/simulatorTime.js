

export class SimulatorTime {
    constructor(date) {
        this.time = new Date(date);
    }

    addSeconds(seconds) {
        this.time.setSeconds(this.time.getSeconds() + seconds);
    }

    addMinutes(minutes) {
        this.time.setMinutes(this.time.getMinutes() + minutes);
    }

    addHours(hours) {
        this.time.setHours(this.time.getHours() + hours);
    }

    addDays(days) {
        this.time.setDate(this.time.getDate() + days);
    }

    getSimulationDate() {
        return this.time;
    }
};