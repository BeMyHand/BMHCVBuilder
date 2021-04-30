import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import classes from '../Widgets/CVForm/CVPaperForm/CVPaperForm.css';

const BMHMiddleware = (props) => {

    function scrollToSmoothly(pos, time) {
        var currentPos = window.pageYOffset;
        var start = null;
        if (time == null) time = 500;
        pos = +pos;
        time = +time;
        window.requestAnimationFrame(function step(currentTime) {
            start = !start ? currentTime : start;
            var progress = currentTime - start;
            if (currentPos < pos) {
                window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
            } else {
                window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
            }
            if (progress < time) {
                window.requestAnimationFrame(step);
            } else {
                window.scrollTo(0, pos);
            }
        });
    }

    const [focusedFieldname, setFocusedFieldname] = useState('');
    const [spellingMode, setSpellingMode] = useState(false);
    const [paragraphMode, setParagraphMode] = useState(false);

    const commands = [
        {
            command: 'upload picture',
            callback: () => {
                props.openWebcam();
                resetTranscript();
            },
        },
        {
            command: 'set title *',
            callback: (title) => {
                props.handleDocTitleChange(title);
                resetTranscript();
            }
        },
        {
            command: 'open employment history',
            callback: () => {
                props.openModalForm(null, 'Employment History')
                resetTranscript();
            },
        },
        {
            command: 'change template',
            callback: () => {
                props.redirectToTemplates();
                resetTranscript();
            }
        },
        {
            command: 'update employment history level :level',
            callback: (level) => {
                props.openModalForm(+level - 1, 'Employment History')
                resetTranscript();
            },
        },
        {
            command: 'open education history',
            callback: () => {
                props.openModalForm(null, 'Education History');
                resetTranscript();
            },
        },
        {
            command: 'update education history level :level',
            callback: (level) => {
                props.openModalForm(+level - 1, 'Education History');
                resetTranscript();
            },
        },
        {
            command: 'open social media links',
            callback: () => {
                props.openModalForm(null, 'Social Media Links');
                resetTranscript();
            },
        },
        {
            command: 'download file',
            callback: () => {
                props.downloadFile();
                resetTranscript();
            },
        },
        {
            command: 'update social media links level :level',
            callback: (level) => {
                props.openModalForm(+level - 1, 'Social Media Links');
                resetTranscript();
            },
        },
        {
            command: 'open skill',
            callback: () => {
                props.openModalForm(null, 'Skills');
                resetTranscript();
            },
        },
        {
            command: 'update skill level :level',
            callback: (level) => {
                props.openModalForm(+level - 1, 'Skills');
                resetTranscript();
            },
        },
        {
            command: 'close',
            callback: () => {
                if (focusedFieldname !== '') {
                    if (document.getElementById(focusedFieldname.split('-').join('')))
                        document.getElementById(focusedFieldname.split('-').join('')).removeAttribute('focus');
                    else if (document.getElementById(focusedFieldname.split('-').join('') + '-modal'))
                        document.getElementById(focusedFieldname.split('-').join('') + '-modal').removeAttribute('focus');
                    setFocusedFieldname('');
                }
                props.closeModalForm();

                resetTranscript();
            },
        },
        {
            command: 'go to *',
            callback: (field) => {
                let fieldState;
                if (field.split(' ').length > 1) {
                    fieldState = field.split(' ').join('-');
                    field = field.split(' ').join('');
                } else {
                    fieldState = field.split(' ').join('');
                    field = field.split(' ').join('');
                }
                field += '-modal';

                if (document.getElementById(field)) {

                    if (focusedFieldname !== '') {
                        if (document.getElementById((focusedFieldname.split('-').join('') + '-modal'))) {
                            document.getElementById((focusedFieldname.split('-').join('') + '-modal')).removeAttribute('focus');
                            document.getElementById((focusedFieldname.split('-').join('') + '-modal')).blur();
                        }
                    }
                    console.log(field);
                    console.log(document.getElementById(field));

                    setFocusedFieldname(fieldState);
                    const el = document.getElementById(field)
                    document.getElementById(field).setAttribute('focus', true);
                }
                resetTranscript();
            }
        },
        {
            command: 'set focus to *',
            callback: (field) => {
                console.log(field);
                let fieldState
                if (field.split(' ').length > 1) {
                    fieldState = field.split(' ').join('-');
                    field = field.split(' ').join('');
                } else {
                    fieldState = field.split(' ').join('');
                    field = field.split(' ').join('');
                }

                if (document.getElementById(field)) {

                    if (focusedFieldname !== '') {
                        document.getElementById(focusedFieldname.split('-').join('')).removeAttribute('focus');
                        document.getElementById(focusedFieldname.split('-').join('')).blur();
                    }
                    console.log(field);
                    console.log(document.getElementById(field));

                    setFocusedFieldname(fieldState);
                    const el = document.getElementById(field)
                    scrollToSmoothly(el.offsetParent.offsetTop - el.offsetParent.offsetHeight - 40, 400);
                    document.getElementById(field).setAttribute('focus', true);
                }
                resetTranscript();
            }
        },
        {
            command: 'remove focus',
            callback: () => {
                if (focusedFieldname !== '') {
                    if (document.getElementById(focusedFieldname.split('-').join('')))
                        document.getElementById(focusedFieldname.split('-').join('')).removeAttribute('focus');
                    else if (document.getElementById(focusedFieldname.split('-').join('') + '-modal'))
                        document.getElementById(focusedFieldname.split('-').join('') + '-modal').removeAttribute('focus');
                    setFocusedFieldname('');
                }
                resetTranscript();
            }
        },
        {
            command: 'set mode to spelling',
            callback: () => {
                setSpellingMode(true);
                resetTranscript();
            },
        },
        {
            command: 'remove spelling mode',
            callback: () => {
                setSpellingMode(false);
                resetTranscript();
            },
        },
        {
            command: 'set paragraph mode',
            callback: () => {
                setParagraphMode(true);
                resetTranscript();
            }
        },
        {
            command: 'remove paragraph mode',
            callback: () => {
                setParagraphMode(false);
                resetTranscript();
            }
        },
        {
            command: 'update *',
            callback: (value) => {
                if (focusedFieldname !== '') {
                    console.log(focusedFieldname);
                    if (spellingMode) {
                        let val = value.split(' ').join('');
                        val = val.toLowerCase();
                        val = val[0].toUpperCase() + val.slice(1, val.length);
                        props.changed(focusedFieldname, val);
                    } else if (paragraphMode) {
                        props.handleValueChange(focusedFieldname, value);
                    } else {
                        let val = value.split(' ');
                        val.forEach(v => v.toLowerCase());
                        for (let i = 0; i < val.length; i++) {
                            val[i] = val[i][0].toUpperCase() + val[i].slice(1, val[i].length);
                        }
                        let v = "";
                        val.forEach(c => v += c + " ");
                        props.handleValueChange(focusedFieldname, v);
                    }
                }
                resetTranscript();
            },
        },
        {
            command: 'set value to *',
            callback: (value) => {
                if (focusedFieldname !== '') {
                    console.log(focusedFieldname);
                    if (spellingMode) {
                        let val = value.split(' ').join('');
                        val = val.toLowerCase();
                        val = val[0].toUpperCase() + val.slice(1, val.length);
                        props.changed(focusedFieldname, val);
                    } else if (paragraphMode) {
                        props.changed(focusedFieldname, value);
                    } else {
                        let val = value.split(' ');
                        val.forEach(v => v.toLowerCase());
                        for (let i = 0; i < val.length; i++) {
                            val[i] = val[i][0].toUpperCase() + val[i].slice(1, val[i].length);
                        }
                        let v = "";
                        val.forEach(c => v += c + " ");
                        props.changed(focusedFieldname, v);
                    }
                }
                resetTranscript();
            },
        },
        {
            command: 'reset value',
            callback: () => {
                if (focusedFieldname !== '') {
                    props.changed(focusedFieldname, '');

                }
                resetTranscript();
            }
        },
        {
            command: 'reset',
            callback: () => {
                if (focusedFieldname !== '') {
                    props.handleValueChange(focusedFieldname, '')
                }
                resetTranscript();
            }
        },
        {
            command: 'scroll down',
            callback: () => {
                window.scrollTo({top: window.pageYOffset + 500, behavior: "smooth"})
                resetTranscript();
            },
        },
        {
            command: 'scroll up',
            callback: () => {
                window.scrollTo({top: window.pageYOffset - 500, behavior: "smooth"});
                resetTranscript();
            }
        },
        {
            command: 'commands down',
            callback: () => {
                document.getElementById('sidebar').scrollTo({top: window.pageYOffset + 300, behavior: "smooth"});
                resetTranscript();
            }
        },
        {
            command: 'command up',
            callback: () => {
                document.getElementById('sidebar').scrollTo({top: window.pageYOffset - 300, behavior: "smooth"});
                resetTranscript();
            }
        },
        {
            command: 'submit',
            callback: () => {
                props.handleSubmit();
            }
        },
    ]


    const {transcript, resetTranscript} = useSpeechRecognition({commands})


    return (
        <div style={{
            width: '45%',
            minHeight: '40px',

            maxHeight: '100px',
            overflow: 'auto',
            boxShadow: '0px 1px 6px rgba(0,0,0,.16)',
            position: 'fixed',
            top: 0,
            left: '15%',
            zIndex: 1000,
            background: '#fff',
            padding: '10px',
        }} className={classes['cv-form-section-description']}>
            {transcript}
        </div>
    );

}

export default BMHMiddleware;