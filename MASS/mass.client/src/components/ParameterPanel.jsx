
import React from "react";
import VariableParameters from "./VariableParameters";
import ConstantParameters from "./ConstantParameters";

function ParameterPanel() {
    return (
        <div className="parameter-container">

            <div className="variable-parameter">
                <VariableParameters />
            </div>

            <div className="constant-parameter">
                <ConstantParameters />
            </div>

        </div>
    );
}

export default ParameterPanel;
