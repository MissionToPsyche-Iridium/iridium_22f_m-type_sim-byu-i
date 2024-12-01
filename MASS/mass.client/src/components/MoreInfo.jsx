import React from 'react';
import { useNavigate } from 'react-router-dom';
function MoreInfo() {

    const navigate = useNavigate();

    const home = () => {
        navigate('/');
    };

    return (

        <>

            <h1>More Information Page</h1>
            <p>
                <b>
                    Check out these links to learn more about NASA's Psyche Mission! Psyche is an asteroid believed to be <br />
                    made of metal, possibly the remanant of a planetary core. We invite you to examine the mission with an <br />
                    explorer's sense of adventure. Who knows what we'll find when we reach the Psyche asteroid.</b>
            </p><br />

            <h3>Official Resources</h3>
            <a href="https://psyche.asu.edu/" target="_blank">Official Psyche Mission Website</a><br />
            <a href="https://www.nasa.gov/psyche" target="_blank">NASA's Psyche Page</a><br />
            <a href="https://www.nasa.gov/multimedia/nasatv/" target="_blank">NASA TV</a>


            <h3>Articles and News</h3>
            <a href="https://blogs.nasa.gov/" target="_blank">NASA Blog Updates</a><br />
            <a href="https://www.space.com/" target="_blank">Space.com - Psyche Coverage</a><br />
            <a href="https://www.scientificamerican.com/" target="_blank">Scientific American</a>


            <h3>Educational Resources</h3>
            <a href="https://psyche.asu.edu/get-involved/psyche-inspired/" target="_blank">Psyche Inspired Program</a><br />
            <a href="https://www.nasa.gov/stem" target="_blank">NASA STEM Resources</a>


            <h3>Videos and Media</h3>
            <a href="https://www.youtube.com/user/NASAtelevision" target="_blank">NASA YouTube Channel</a>


            <h3>Interactive Tools</h3>
            <a href="https://eyes.nasa.gov/apps/asteroids/" target="_blank">NASA Eyes on Asteroids</a>


            <h3>Podcasts and Audio Resources</h3>
            <a href="https://www.nasa.gov/nasapodcasts" target="_blank">NASA's On a Mission Podcast</a><br />
            <a href="https://www.planetary.org/planetary-radio" target="_blank">Planetary Radio by The Planetary Society</a>

            <h3>Books And Papers</h3>
            <a href="https://arxiv.org/" target="_blank">arXiv Scientific Publications</a><br />
            <a href="https://ui.adsabs.harvard.edu/" target="_blank">NASA ADS Library</a>

            <h3>Citizen Science and Data</h3>
            <a href="https://www.zooniverse.org/" target="_blank">Zooniverse - Asteroid Data Hunter</a><br />
            <a href="https://data.nasa.gov/" target="_blank">NASA Open Data Portal</a><br />
            <a href="https://www.jpl.nasa.gov/" target="_blank">JPL Archives</a>


            <h3>Virtual And Augmented Reality</h3>
            <a href="https://psyche.asu.edu/get-involved/tools/" target="_blank">Psyche Virtual Mission Toolkit</a><br />
            <a href="https://solarsystem.nasa.gov/" target="_blank">NASA's Solar System Exploration</a>

            <h3>Educational Events and Outreach</h3>
            <a href="https://www.planetary.org/events" target="_blank">Planetary Society Events</a>

            <h3>Collaborative Organizations</h3>
            <a href="https://www.maxar.com/" target="_blank">Maxar Technologies</a><br />
            <a href="http://ssl.mit.edu/" target="_blank">MIT's Space Systems Lab</a><br />
            <a href="https://www.psi.edu/" target="_blank">Planetary Science Institute</a><br />
            <a href="https://psyche.asu.edu/" target="_blank">Official Psyche Mission Website</a><br />
            <a href="https://www.nasa.gov/psyche" target="_blank">NASA's Psyche Page</a><br />
            <a href="https://www.nasa.gov/multimedia/nasatv/" target="_blank">NASA TV</a><br />

            {/*<!-- Articles and News -->*/}
            <a href="https://blogs.nasa.gov/" target="_blank">NASA Blog Updates</a><br />
            <a href="https://www.space.com/" target="_blank">Space.com - Psyche Coverage</a><br />
            <a href="https://www.scientificamerican.com/" target="_blank">Scientific American</a><br />

            {/*<!-- Educational Resources -->*/}
            <a href="https://psyche.asu.edu/get-involved/psyche-inspired/" target="_blank">Psyche Inspired Program</a><br />
            <a href="https://www.nasa.gov/stem" target="_blank">NASA STEM Resources</a><br />

            {/*<!-- Videos and Media -->*/}
            <a href="https://www.youtube.com/user/NASAtelevision" target="_blank">NASA YouTube Channel</a><br />

            {/*<!-- Interactive Tools -->*/}
            <a href="https://eyes.nasa.gov/apps/asteroids/" target="_blank">NASA Eyes on Asteroids</a><br />

            {/*<!-- Podcasts and Audio Resources -->*/}
            <a href="https://www.nasa.gov/nasapodcasts" target="_blank">NASA?s On a Mission Podcast</a><br />
            <a href="https://www.planetary.org/planetary-radio" target="_blank">Planetary Radio by The Planetary Society</a><br />

            {/*<!-- Books and Papers -->*/}
            <a href="https://arxiv.org/" target="_blank">arXiv Scientific Publications</a><br />
            <a href="https://ui.adsabs.harvard.edu/" target="_blank">NASA ADS Library</a><br />

            {/*<!-- Citizen Science and Data -->*/}
            <a href="https://www.zooniverse.org/" target="_blank">Zooniverse - Asteroid Data Hunter</a><br />
            <a href="https://data.nasa.gov/" target="_blank">NASA Open Data Portal</a><br />
            <a href="https://www.jpl.nasa.gov/" target="_blank">JPL Archives</a><br />

            {/*<!-- Virtual and Augmented Reality -->*/}
            <a href="https://psyche.asu.edu/get-involved/tools/" target="_blank">Psyche Virtual Mission Toolkit</a><br />
            <a href="https://solarsystem.nasa.gov/" target="_blank">NASA's Solar System Exploration</a><br />

            {/*<!-- Educational Events and Outreach -->*/}
            <a href="https://www.planetary.org/events" target="_blank">Planetary Society Events</a><br />

            {/*<!-- Collaborative Organizations -->*/}
            <a href="https://www.maxar.com/" target="_blank">Maxar Technologies</a><br />
            <a href="http://ssl.mit.edu/" target="_blank">MIT's Space Systems Lab</a><br />
            <a href="https://www.psi.edu/" target="_blank">Planetary Science Institute</a><br />

            {/*<!-- Social Media and Forums -->*/}
            <a href="https://www.reddit.com/r/space/" target="_blank">Reddit - r/space</a><br />
            <a href="https://twitter.com/NASASolarSystem" target="_blank">NASA Solar System on Twitter/X</a><br />
            <a href="https://twitter.com/PsycheMission" target="_blank">Psyche Mission on Twitter/X</a><br /><br />

            <button
                style={{
                    background: '#007bff', // udoublecheck color
                    color: '#fff',
                    fontSize: '16px',
                    textAlign: 'center',
                    margin: '0 5px',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '250px',
                }}
                size="large"
                type="button"
                onClick={home}
            >
                Return to Home page
            </button>
        </>

    );
}

export default MoreInfo