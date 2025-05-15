
import NasaLogo from '/iridium_22f_m-type_sim-byu-i/assets/images/nasaLogo.png'
import PsycheLogo from '/iridium_22f_m-type_sim-byu-i/assets/images/psycheLogo.png'
import PsycheSpacecraft from '/iridium_22f_m-type_sim-byu-i/assets/images/psycheSpacecraft.jpg'

import '../css/pages/home.css'

function Home() {

    return ( 
        <div className="home">
            <div className="title">
                <img src={PsycheLogo} className="logo psyche" alt="Psyche mission logo" />
                <h1>Psyche Mission Simulator</h1>
                <img src={NasaLogo} className="logo nasa" alt="NASA logo" />
            </div>
            <img src={PsycheSpacecraft} className="spacecraft" alt="Image of the Psyche spacecraft in deep space" />
        </div>
    );
}

export default Home