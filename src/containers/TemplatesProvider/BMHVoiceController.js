import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const BMHVoiceController = (props) => {
    const commands = [
        {
            command: 'shift right',
            callback: () => {
                props.handleRightShift();
            },
        },
        {
            command: 'shift left',
            callback: () => {
                props.handleLeftShift();
            },
        },
        {
            command: 'select template',
            callback: () => {
                props.handleTemplateChosen();
            }
        },
    ];

    const {transcript} = useSpeechRecognition({commands});
    return (
        <></>
    );
}

export default BMHVoiceController;