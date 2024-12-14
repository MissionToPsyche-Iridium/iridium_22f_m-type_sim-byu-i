// Component to give a welcome message to user; subcomponent of Home component
function Welcome() {

    // Display welcome message
    return (

        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }} >
                <h1 >
                    Welcome to the Psyche <br />
                    Sampling Lander Home Page
                </h1>
            </div>
        </>

    );
}

export default Welcome