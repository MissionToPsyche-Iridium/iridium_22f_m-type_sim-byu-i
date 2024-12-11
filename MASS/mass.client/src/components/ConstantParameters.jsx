import React, { useState, useContext } from "react";
import ParameterGrid from './ParameterGrid';
import { SharedContext } from "./SharedContext";

function ConstantParameter() {

    // Import parameters for use
    const {
        param1, setParam1,
        param2, setParam2,
        param3, setParam3,
        param4, setParam4,
        param5, setParam5,
        param6, setParam6,
        param7, setParam7,
        param8, setParam8,
        param9, setParam9,
        param10, setParam10,
        param11, setParam11,
        param12, setParam12,
    } = useContext(SharedContext);

    const [data, setData] = useState([
        param1,
        param2,
        param3,
        param4,
        param5,
        param6,
        param7,
        param8,
        param9,
        param10,
        param11,
        param12,
    ]);
    

    return (
        <div>
            <h4 style={{ padding: "0px", marginBottom: "20px", marginTop: "0px" }}>Constant Parameters </h4>
            <ParameterGrid items={data} />
        </div>
    );
};

export default ConstantParameter;