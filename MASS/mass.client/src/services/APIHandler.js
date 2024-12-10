async function updateParameters(jsonData) {
    // Test data to send to the server
    const isoStringDate = new Date().toISOString();
    jsonData = {
        Id: 1234,
        TimeStart: isoStringDate,
        CurrentTime: isoStringDate,
        LastTime: isoStringDate,
        UprThrustOn: true,
        LwrThrustOn: true,
        ShipAltitude: 300,
        PriorAltitude: 400,
        FuelRemaining: 200
    }

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

export { updateParameters };