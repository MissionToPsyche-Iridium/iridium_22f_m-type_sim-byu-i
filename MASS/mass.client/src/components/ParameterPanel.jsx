
import React from "react";
import VariableParameters from "./VariableParameters";
import ConstantParameter from "./ConstantParameter";

function ParameterPanel() {
    return (
        <div className="parameter-container">

            <div className="variable-parameter">
                <VariableParameters />
            </div>

            <div className="constant-parameter">
                <ConstantParameter />
            </div>

        </div>
    );
}

export default ParameterPanel;
