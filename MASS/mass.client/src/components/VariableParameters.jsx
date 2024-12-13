import React, { useState, useContext, useEffect } from "react";
import ParameterGrid from './ParameterGrid';
import { SharedContext } from "./SharedContext";

function VariableParameters() {

    // Import parameters for use
    const {
        param13, setParam13,
        param14, setParam14,
        param15, setParam15,
        param16, setParam16,
        param17, setParam17,
        param18, setParam18,
        param19, setParam19,
        param20, setParam20,
        param25, setParam25,
    } = useContext(SharedContext);

    const [data, setData] = useState([
        param13,
        param14,
        param15,
        param16,
        param17,
        param18,
        param19,
        param20,
        param25,
    ]);

    // Update data when any parameter changes
    useEffect(() => {
        setData([
            param13,
            param14,
            param15,
            param16,
            param17,
            param18,
            param19,
            param20,
            param25,
        ]);
    }, [param13, param14, param15, param16, param17, param18, param19, param20, param25,]);

    // Display the Variable Parameter panel
    return (
        <div>
            <h4>
                Variable Parameters
            </h4>
            <ParameterGrid items={data} />
        </div>
    );
}

export default VariableParameters;
