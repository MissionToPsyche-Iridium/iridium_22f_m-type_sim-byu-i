import React from 'react';
import { useNavigate } from 'react-router-dom';
function MoreInfo() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };
    
    return (
        <>
            {/*<header>
                <p>header</p>
                <div class="logo">
                    <a target="_blank" href="https://www.nasa.gov/">
                        <img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/nasa.svg" alt="NASA Logo" />
                    </a>
                    <span class="divider"></span>
                    <a target="_blank" href="https://psyche.asu.edu/">
                        <img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/psyche.svg" alt="Psyche Logo" />
                    </a>

                </div>
            </header>*/}

            <button title="navigation" id="hamburgerButton"></button>
            <nav>
                <ul>

                    <h3>Official Resources</h3>
                    <li><a href="https://psyche.asu.edu/" target="_blank">Official Psyche Mission Website</a></li>
                    <li><a href="https://www.nasa.gov/psyche" target="_blank">NASA's Psyche Page</a></li>
                    <li><a href="https://www.nasa.gov/multimedia/nasatv/" target="_blank">NASA TV</a></li>


                    <h3>Articles and News</h3>
                    <li><a href="https://blogs.nasa.gov/" target="_blank">NASA Blog Updates</a></li>
                    <li><a href="https://www.space.com/" target="_blank">Space.com - Psyche Coverage</a></li>
                    <li><a href="https://www.scientificamerican.com/" target="_blank">Scientific American</a></li>


                    <h3>Educational Resources</h3>
                    <li><a href="https://psyche.asu.edu/get-involved/psyche-inspired/" target="_blank">Psyche Inspired Program</a></li>
                    <li><a href="https://www.nasa.gov/stem" target="_blank">NASA STEM Resources</a></li>


                    <h3>Videos and Media</h3>
                    <li><a href="https://www.youtube.com/user/NASAtelevision" target="_blank">NASA YouTube Channel</a></li>


                    <h3>Interactive Tools</h3>
                    <li><a href="https://eyes.nasa.gov/apps/asteroids/" target="_blank">NASA Eyes on Asteroids</a></li>


                    <h3>Podcasts and Audio Resources</h3>
                    <li><a href="https://www.nasa.gov/nasapodcasts" target="_blank">NASA’s On a Mission Podcast</a></li>
                    <li><a href="https://www.planetary.org/planetary-radio" target="_blank">Planetary Radio by The Planetary Society</a></li>

                    <h3>Books And Papers</h3>
                    <li><a href="https://arxiv.org/" target="_blank">arXiv Scientific Publications</a></li>
                    <li><a href="https://ui.adsabs.harvard.edu/" target="_blank">NASA ADS Library</a></li>

                    <h3>Citizen Science and Data</h3>
                    <li><a href="https://www.zooniverse.org/" target="_blank">Zooniverse - Asteroid Data Hunter</a></li>
                    <li><a href="https://data.nasa.gov/" target="_blank">NASA Open Data Portal</a></li>
                    <li><a href="https://www.jpl.nasa.gov/" target="_blank">JPL Archives</a></li>


                    <h3>Virtual And Augmented Reality</h3>
                    <li><a href="https://psyche.asu.edu/get-involved/tools/" target="_blank">Psyche Virtual Mission Toolkit</a></li>
                    <li><a href="https://solarsystem.nasa.gov/" target="_blank">NASA's Solar System Exploration</a></li>

                    <h3>Educational Events and Outreach</h3>
                    <li><a href="https://www.planetary.org/events" target="_blank">Planetary Society Events</a></li>


                    <h3>Collaborative Organizations</h3>
                    <li><a href="https://www.maxar.com/" target="_blank">Maxar Technologies</a></li>
                    <li><a href="http://ssl.mit.edu/" target="_blank">MIT's Space Systems Lab</a></li>
                    <li><a href="https://www.psi.edu/" target="_blank">Planetary Science Institute</a></li>

                    <ul>

                        <li><a href="https://psyche.asu.edu/" target="_blank">Official Psyche Mission Website</a></li>
                        <li><a href="https://www.nasa.gov/psyche" target="_blank">NASA's Psyche Page</a></li>
                        <li><a href="https://www.nasa.gov/multimedia/nasatv/" target="_blank">NASA TV</a></li>

                        {/*<!-- Articles and News -->*/}
                        <li><a href="https://blogs.nasa.gov/" target="_blank">NASA Blog Updates</a></li>
                        <li><a href="https://www.space.com/" target="_blank">Space.com - Psyche Coverage</a></li>
                        <li><a href="https://www.scientificamerican.com/" target="_blank">Scientific American</a></li>

                        {/*<!-- Educational Resources -->*/}
                        <li><a href="https://psyche.asu.edu/get-involved/psyche-inspired/" target="_blank">Psyche Inspired Program</a></li>
                        <li><a href="https://www.nasa.gov/stem" target="_blank">NASA STEM Resources</a></li>

                        {/*<!-- Videos and Media -->*/}
                        <li><a href="https://www.youtube.com/user/NASAtelevision" target="_blank">NASA YouTube Channel</a></li>

                        {/*<!-- Interactive Tools -->*/}
                        <li><a href="https://eyes.nasa.gov/apps/asteroids/" target="_blank">NASA Eyes on Asteroids</a></li>

                        {/*<!-- Podcasts and Audio Resources -->*/}
                        <li><a href="https://www.nasa.gov/nasapodcasts" target="_blank">NASA’s On a Mission Podcast</a></li>
                        <li><a href="https://www.planetary.org/planetary-radio" target="_blank">Planetary Radio by The Planetary Society</a></li>

                        {/*<!-- Books and Papers -->*/}
                        <li><a href="https://arxiv.org/" target="_blank">arXiv Scientific Publications</a></li>
                        <li><a href="https://ui.adsabs.harvard.edu/" target="_blank">NASA ADS Library</a></li>

                        {/*<!-- Citizen Science and Data -->*/}
                        <li><a href="https://www.zooniverse.org/" target="_blank">Zooniverse - Asteroid Data Hunter</a></li>
                        <li><a href="https://data.nasa.gov/" target="_blank">NASA Open Data Portal</a></li>
                        <li><a href="https://www.jpl.nasa.gov/" target="_blank">JPL Archives</a></li>

                        {/*<!-- Virtual and Augmented Reality -->*/}
                        <li><a href="https://psyche.asu.edu/get-involved/tools/" target="_blank">Psyche Virtual Mission Toolkit</a></li>
                        <li><a href="https://solarsystem.nasa.gov/" target="_blank">NASA's Solar System Exploration</a></li>

                        {/*<!-- Educational Events and Outreach -->*/}
                        <li><a href="https://www.planetary.org/events" target="_blank">Planetary Society Events</a></li>

                        {/*<!-- Collaborative Organizations -->*/}
                        <li><a href="https://www.maxar.com/" target="_blank">Maxar Technologies</a></li>
                        <li><a href="http://ssl.mit.edu/" target="_blank">MIT's Space Systems Lab</a></li>
                        <li><a href="https://www.psi.edu/" target="_blank">Planetary Science Institute</a></li>

                        {/*<!-- Social Media and Forums -->*/}
                        <li><a href="https://www.reddit.com/r/space/" target="_blank">Reddit - r/space</a></li>
                        <li><a href="https://twitter.com/NASASolarSystem" target="_blank">NASA Solar System on Twitter/X</a></li>
                        <li><a href="https://twitter.com/PsycheMission" target="_blank">Psyche Mission on Twitter/X</a></li>
                    </ul>


                </ul>
            </nav>

            <main>

                <div id="test">

                </div>
                <button size="large" type="button" onClick={handleButtonClick}>
                    Return to Home page
                </button>
                {/*<h2><a href="#">Back To Simulation</a></h2> {/* <!-- This is supposed to lead back to the simulation but I don't have the filename for it yet-->*/}
            </main>



            {/*<footer>
                <h2> Footer goes here</h2>
                {/*<!-- to do: check what index.html footer looks like and copy that. -->*/}

            {/*<ul class="social">
                    {/*<!-- facebook -->*/}
            {/*<li>
                        <a target="_blank" href="https://www.facebook.com/MissionToPsyche">
                            <img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/facebook.svg"/>
                        </a>
                    </li>
                    {/*<!-- twitter -->*/}
            {/*<li>
                        <a target="_blank" href="https://x.com/MissionToPsyche">
                            <img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/twitter.svg"/>
                        </a>
                    </li>

                    {/*<!-- instagram -->*/}
            {/*<li>
                        <a target="_blank" href="https://www.instagram.com/missiontopsyche/">
                            <img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/instagram.svg"/>
                        </a>
                    </li>
                    {/*<!-- Youtube -->*/}
            {/*<li>
                        <a target="_blank" href="https://www.youtube.com/channel/UC2BGcbPW8mxryXnjQcBqk6A">
                            {/*<img src="https://psyche.asu.edu/wp-content/themes/psyche/static/img/youtube.svg"/>*/}
            {/*</a>
                    </li>
                </ul>


                {/* <!-- If not: add this stuff in: -->
                <!-- logo -->

                <!-- social media tags -->*/}

            {/*</footer>*/}
        </>
    );
}

export default MoreInfo