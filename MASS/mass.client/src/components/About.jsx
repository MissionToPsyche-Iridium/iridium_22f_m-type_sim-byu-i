import React from 'react';
import { useNavigate } from 'react-router-dom';
function About() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (


        <div>

            <h1>
                About 
            </h1>

            <p>
                This work was created in partial fulfillment of Brigham Young University - Idaho's Professional Project Course - CSE 397. The <br />
                work is a result of the Psyche Student Collaborations component of NASA's Psyche Mission (https://psyche.asu.edu).<br />
                <b><i>Psyche: A Journey to a Metal World</i></b> [Contract number NNM16AA09C] is part of the NASA Discovery Program mission to<br />
                solar system targets. Trade names and trademarks of ASU and NASA are used in this work for identification only. Their <br />
                usage does not constitute an official endorsement, either expressed or implied, by Arizona State University or National<br />
                Aeronautics and Space Administration. The content is solely the responsibility of the authors and does not necessarily<br />
                represent the official views of ASU or NASA.
                <br />
                <br />
                The authors of this project are:<br />
                Ryan Funk<br />
                Levi Johnson<br />
                Jerry Lane<br />
                Colton Pritchett<br />
                Cayleigh Leishman<br />
                Kristin Thumstedter<br />
                Gerin Wilde<br />
                Brycen Williams
            </p>

            <button size="large" type="button" onClick={handleButtonClick}>
                Return to Home page
            </button>
        </div>
    );
}

export default About

