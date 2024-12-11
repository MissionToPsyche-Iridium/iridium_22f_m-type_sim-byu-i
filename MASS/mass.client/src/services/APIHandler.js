async function updateParameters(jsonData) {

    try {
        const response = await fetch("api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response from the server:", result);


        return result;

    } catch (error) {
        console.error("Error fetching data from the server:", error);
    }

}

export default updateParameters;