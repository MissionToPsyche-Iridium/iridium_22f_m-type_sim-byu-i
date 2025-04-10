
function splitMessage(message) {
    console.log("Message being passed ", message);
    // console.log("Message type ", typeof message);
    const indexOfSplit = message.indexOf(' ');

    // console.log("Index of split is ", indexOfSplit);
    if (indexOfSplit === -1) {
        return [message, ""];
    }
    if (!message || typeof message !== "string") {
        // return if empty string
        return ["", ""];
    }
    const first = message.slice(0, indexOfSplit);
    const second = message.slice(indexOfSplit + 1);
    // console.log("First " + first);
    // console.log("Second " + second);

    return [first, second];
};

export class PsycheController {
    constructor(solarPanelsStowed = false, ionThrustersStowed = false ){
        this.solarPanelsStowed = solarPanelsStowed;
        this.yPlusSolarArrayState = (this.solarPanelsStowed) ? "STOWED" : "DEPLOYED";
        this.yPlusSolarArrayMotion = "STOPPED";
        this.yMinusSolarArrayState = (this.solarPanelsStowed) ? "STOWED" : "DEPLOYED";
        this.yMinusSolarArrayMotion = "STOPPED";
        this.ionThrustersStowed = ionThrustersStowed;
        this.xPlusIonArmState = (this.ionThrustersStowed) ? "STOWED" : "DEPLOYED";
        this.xPlusIonPower = 0;
        this.xPlusIonSelected = "Outer";
        this.xMinusIonArmState = (this.ionThrustersStowed) ? "STOWED" : "DEPLOYED";
        this.xMinusIonSelected = "Outer";
        this.xMinusIonPower = 0;
        this.xRotation = 0;
        this.yRotation = 0;
        this.zRotation = 0;

        this.listeners = [];

        console.log("Psyche Constructor y+Solar :" + this.yPlusSolarArrayState);


    }

    subscribe(listener) {
        console.log("psycheController added listener");
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notifyListeners() {
        console.log("Listener Notified by psycheController");
        this.listeners.forEach((listener) => listener(this.getControllerStates()));
    }

    getControllerStates() {
        // Send all the data
        return {
            yPlusSolarArrayState: this.yPlusSolarArrayState,
            yPlusSolarArrayMotion: this.yPlusSolarArrayMotion,
            yMinusSolarArrayState: this.yMinusSolarArrayState,
            yMinusSolarArrayMotion: this.yMinusSolarArrayMotion,
            xPlusIonArmState: this.xPlusIonArmState,
            xPlusIonSelected: this.xPlusIonSelected, 
            xPlusIonPower: this.xPlusIonPower,
            xMinusIonArmState: this.xMinusIonArmState,
            xMinusIonSelected: this.xMinusIonSelected,
            xMinusIonPower: this.xMinusIonPower,
            xRotation: this.xRotation,
            yRotation: this.yRotation,
            zRotation: this.zRotation,
        };

    }

    command(message) {
        const [system, subMessage] = splitMessage(message);
        switch(system) {
            case "SOLAR":
                console.log("SOLAR COMMAND " + subMessage);
                this.solar(subMessage);
                break;
            case "ION_THRUSTERS":
                // console.log("ION_THRUSTERS COMMAND " + submessage);
                this.ionThrusters(subMessage);
                break;
            case "GAS_THRUSTERS":
                console.log("GAS_THRUSTERS COMMAND " + subMessage);
                this.gasThrusters(subMessage);
                break;
            default: 
                console.log("ERROR (PsycheController): Unknown command(system): ", system);
                break;
        }
    }
    feedBack(message) {
        const [system, subMessage] = splitMessage(message);
        switch(system) {
            case "SOLAR":
                console.log("SOLAR COMMAND " + subMessage);
                this.solarFeedBack(subMessage);
                break;
            case "ION_THRUSTERS":
                console.log("ION_THRUSTERS COMMAND " + subMessage);
                this.ionThrustersFeedBack(subMessage);
                break;
            case "GAS_THRUSTERS":
                console.log("GAS_THRUSTERS COMMAND " + subMessage);
                this.gasThrustersFeedBack(subMessage);
                break;
            default: 
                console.log("ERROR (PsycheController): Unknown command(system): ", system);
                break;
        }
    }

    solar(subMessage) {
        switch(subMessage){
            case "DEPLOY_+Y":
                // if (this.yPlusSolarArrayState !== "STOWED") {
                //     return;
                // }
                this.yPlusSolarArrayState = "DEPLOYING";
                break;
            case "ROTATE_+Y_CW":
                this.yPlusSolarArrayMotion = "CW";
                break;
            case "STOP_+Y":
                this.yPlusSolarArrayMotion = "STOPPED";
                break;
            case "ROTATE_+Y_CCW":
                this.yPlusSolarArrayMotion = "CCW";
                break;
            case "DEPLOY_-Y":
                // if (this.yMinusSolarArrayState !== "STOWED") {
                //     return;
                // }
                this.yMinusSolarArrayState = "DEPLOYING";
                break;
            case "ROTATE_-Y_CW":
                this.yMinusSolarArrayMotion = "CW";
                break;
            case "STOP_-Y":
                this.yMinusSolarArrayMotion = "STOPPED";
                break;
            case "ROTATE_-Y_CCW":
                this.yMinusSolarArrayMotion = "CCW";
                break;
            default:
                console.log("[PsycheController] invalid solar submessage: " + subMessage);
                break;
        }
        this.notifyListeners();
    }

    solarFeedBack(subMessage) {
        switch(subMessage){
            case "+Y_DEPLOYED":
                this.yPlusSolarArrayState = "DEPLOYED";
                break;
            case "-Y_DEPLOYED":
                this.yMinusSolarArrayState = "DEPLOYED";
                break;
            default:
                console.log("[PsycheController] invalid solarFeedBack submessage: " + subMessage);
                break;
        }
        this.notifyListeners();
    }

    gasThrusters(subMessage) {
        switch(subMessage) {
            case "X_CW":
                this.xRotation += 1;
                break;
            case "Y_CW":
                this.yRotation += 1;
                break;
            case "Z_CW":
                this.zRotation += 1;
                break;
            case "X_HOLD":
                this.xRotation = 0;
                break;
            case "Y_HOLD":
                this.yRotation = 0;
                break;
            case "Z_HOLD":
                this.zRotation = 0;
                break;
            case "X_CCW":
                this.xRotation -= 1;
                break;
            case "Y_CCW":
                this.yRotation -= 1;
                break;
            case "Z_CCW":
                this.zRotation -= 1;
                break;
            default:
                console.log("[PsycheController] invalid gasThrusters submessage: " + subMessage);
                break;
        }
        this.notifyListeners();
    }

    ionThrusters(subMessage) {
        switch(subMessage) {
            case "DEPLOY_+X":
                // unlike the solar array, ion engines can reverse motion
                if (this.xPlusIonArmState !== "DEPLOYED") {
                    return;
                }
                this.xPlusIonArmState = "DEPLOYING";
                break;
            case "STOW_+X":
                if (this.xPlusIonArmState !== "STOWED") {
                    return;
                }
                this.xPlusIonArmState = "STOWING";
                this.xPlusIonPower = 0;
                break;
            case "INNER_+X":
                this.xPlusIonSelected = "INNER";
                this.xPlusIonPower = 0;
                break;
            case "OUTER_+X":
                this.xPlusIonSelected = "OUTER";
                this.xPlusIonPower = 0;
                break;
            case "LEVEL_0_+X":
                this.xPlusIonPower = 0;
                break;
            case "LEVEL_1_+X":
                this.xPlusIonPower = 1;
                this.xMinusIonPower = 0;
                break;
            case "LEVEL_2_+X":
                this.xPlusIonPower = 2;
                this.xMinusIonPower = 0;
                break;
            case "LEVEL_3_+X":
                this.xPlusIonPower = 3;
                this.xMinusIonPower = 0;
                break;
            case "LEVEL_4_+X":
                this.xPlusIonPower = 4;
                this.xMinusIonPower = 0;
                break;
            case "DEPLOY_-X":
                if (this.xMinusIonArmState !== "DEPLOYED") {
                    return;
                }
                this.xMinusIonArmState = "DEPLOYING";
                break;
            case "STOW_-X":
                if (this.xMinusIonArmState !== "STOWED") {
                    return;
                }
                this.xMinusIonArmState = "STOWING";
                this.xMinusIonPower = 0;
                break;
            case "INNER_-X":
                this.xMinusIonSelected = "INNER";
                this.xMinusIonPower = 0;
                break;
            case "OUTER_-X":
                this.xMinusIonPower = 0;
                this.xMinusIonSelected = "OUTER";
                break;
            case "LEVEL_0_-X":
                this.xMinusIonPower = 0;
                break;
            case "LEVEL_1_-X":
                this.xMinusIonPower = 1;
                this.xPlusIonPower = 0;
                break;
            case "LEVEL_2_-X":
                this.xMinusIonPower = 2;
                this.xPlusIonPower = 0;
                break;
            case "LEVEL_3_-X":
                this.xMinusIonPower = 3;
                this.xPlusIonPower = 0;
                break;
            case "LEVEL_4_-X":
                this.xMinusIonPower = 4;
                this.xPlusIonPower = 0;
                break;
            default:
                console.log("[PsycheController] invalid ionThrusters submessage: " + subMessage);
                break;

        }
        this.notifyListeners();
    }

    gasThrustersFeedBack(subMessage) {
        switch(subMessage){
            case "":
                break;
            default:
                console.log("[PsycheController] invalid gasThrustersFeedBack submessage: " + subMessage);
                break;
        }
        this.notifyListeners();
    }

    ionThrustersFeedBack(subMessage) {
        switch(subMessage){
            case "":
                break;
            default:
                console.log("[PsycheController] invalid ionThrustersFeedBack submessage: " + subMessage);
                break;
        }
        this.notifyListeners();
    }

}