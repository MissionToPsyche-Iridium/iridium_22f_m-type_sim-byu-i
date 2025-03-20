
function splitMessage(message) {
    const indexOfSplit = message.index(' ');
    if (indexOfSplit = -1) {
        return [message, ""];
    }
    const first = message.slice(0, index);
    const second = message.slice(index + 1);
    return [first, second];
};

class PsycheController {
    constructor(){
        this.solar = new PsycheSolar();

    }

    update(message) {
        const [system, submessage] = splitMessage(message);
        switch(system){
            case SOLAR:
                this.solar.update(submessage);
                break;
            default:
                console.log("ERROR (PyscheController): Unknown update(system): ", system);
                break;
        }


    }

    command(message) {
        const [system, submessage] = splitMessage(message);
        switch(system) {
            case SOLAR:
                this.solar.command(submessage);
                break;
            default: 
                console.log("ERROR (PyscheController): Unknown command(system): ", system);
                break;
        }
    }

    // getters
    getYPlusSolarState() {
        return null; 
    }

    getYMinusSolarState() {
        return null; 
    }


}

class PsycheSolar {
    constructor() {
        this.YPlusSolar = new PsycheSolarPanel();
        this.YMinusSolar = new PsycheSolarPanel();

    }

    update(message) {

    }

    command(message) {

    }

    getState() {
        return null;
    }
}

class PsycheSolarPanel {
    constructor() {

    }
}