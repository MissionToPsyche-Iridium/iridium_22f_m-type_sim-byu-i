// API Handler function
async function updateParameters(jsonData) {

    // Use error handling to call the api with the jsonData as argument
    try {
        const response = await fetch("api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        // Handle any errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get result from back-end
        const result = await response.json();
        console.log("Response from the server:", result);

        // Return the json result 
        return result;

    } catch (error) {
        console.error("Error fetching data from the server:", error);
    }
}

export default updateParameters;