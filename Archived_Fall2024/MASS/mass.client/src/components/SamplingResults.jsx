import React, { useContext } from 'react';
import { SharedContext } from "./SharedContext"; 

// Component to display autosampling message
function SamplingResults() {

    // Import the parameters for use
    const {
        param29, setParam29,
    } = useContext(SharedContext);

    // Display auto sampling message
    return (

        <div>
            <p> { param29.value } </p>
        </div>
    );
}

export default SamplingResults;





    