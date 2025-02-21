
import NasaLogo from '../assets/images/nasaLogo.png'
import PsycheLogo from '../assets/images/psycheLogo.png'
import PsycheSpacecraft from '../assets/images/psycheSpacecraft.jpg'

import '../css/Home.css'

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