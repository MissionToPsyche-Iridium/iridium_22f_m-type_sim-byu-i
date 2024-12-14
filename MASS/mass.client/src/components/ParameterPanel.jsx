import React from "react";
import VariableParameters from "./VariableParameters";
import ConstantParameters from "./ConstantParameters";

// This component will draw the Simulator's Parameter Panel by calling the Variable and Constant parameter panels
function ParameterPanel() {

    // Draw Simulator Parameter Panel
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
