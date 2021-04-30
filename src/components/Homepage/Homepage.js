import React, {Component, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

import classes from "./Homepage.css";

import cvImage from '../../cv.png';

import axios from "axios";
const Homepage = props => {

    const commands = [
        {
            command: 'next',
            callback: () => {
                handleBuild();
                resetTranscript();
            },
        },
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })


    const handleBuild = () => {
        props.history.push({
            pathname: "/templates"
        })
    }

useEffect(() => {
    if (props.found)
        props.history.push(`/edit/cv-builder/${props.templateId}`)
}, [props.found])



    return (
        <div className={classes["home"]}>

            <header className={classes["header"]}>
                <h1 className={classes["heading-primary"]}>Welcome to CV Builder</h1>
                <p className={classes["text-primary"]}>
                    Build your very own CV with multiple sections like employment history, education section and much
                    more... all with the power of your voice!q
                </p>
                {props.notFound && <div className={classes["btn-primary"]} onClick={handleBuild}>Next</div>}
                <img src={cvImage} alt="CV Made with this CV Builder" className={classes["cv-image"]}/>
            </header>

        </div>
    );

}

export default Homepage;
