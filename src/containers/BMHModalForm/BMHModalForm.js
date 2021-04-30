import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

import CVModalInput from '../Widgets/CVInput/CVModalInput/CVModalInput';
import CVInput from '../Widgets/CVInput/CVInput';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/Form/Form';

import classes from '../Widgets/CVForm/CVModalForm/CVModalForm.css';
import CVModalForm from '../Widgets/CVForm/CVModalForm/CVModalForm';
import ModalOpener from '../Widgets/Buttons/PaperButton/PaperButton';

const BMHModalForm = (props) => {

    const [focusedFieldname, setFocusedFieldname] = useState('');
    const [spellingMode, setSpellingMode] = useState(false);
    const [paragraphMode, setParagraphMode] = useState(false);

    const commands = [



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
        ,
        {
            command: 'reset value',
            callback: () => {
                if (focusedFieldname !== '') {
                    props.handleValueChange(focusedFieldname, '');
                }
                resetTranscript();
            }
        }

    ]
    const {transcript, resetTranscript} = useSpeechRecognition({commands});

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
        <div className={classes["modal-form"]}>
            <h1 className={classes["cv-form-section-heading"]}>
                {props.config.formTitle}
            </h1>
            <p className={classes["cv-form-section-description"]}>
                {props.config.description}
            </p>
            {props.config.values?.map((value, index) => {
                let duration = props.config.tertiaryFieldName ? {
                    startingMonth: value['starting-month'],
                    startingYear: value['starting-year'],
                    endDate: value['end-date'],
                    type: 'duration',

                } : null
                return <CVModalInput
                    index={index}
                    icon={props.config.icon}
                    contextTitle={value[props.config.primaryFieldName]}
                    duration={{...duration}}
                />
            })}
            <ModalOpener
                className="small"
                clicked={() => props.openModalForm(null, props.config.formTitle)}
            >
                <i className="fas fa-plus"></i>&nbsp;{props.config.action}
            </ModalOpener>
            <Modal
                show={props.config.modalOpened}
                closeModalHandler={() => props.closeModalForm(props.config.formTitle)}
            >
                {props.config.modalOpened ? (
                    <React.Fragment>
                        <h2 className={classes["cv-form-section-heading"]}>
                            {props.config.values ? props.config.values[props.config.indexOfFocusedValueInList][props.config.primaryFieldName] : 'Unspecified'}
                        </h2>
                        <Form>
                            {props.config.inputFields.map(inputConfig => {
                                return (
                                    <CVInput
                                        modal={true}
                                        key={inputConfig.name}
                                        config={{...inputConfig}}
                                        value={props.config.values ? props.config.values[props.config.indexOfFocusedValueInList][inputConfig.name] : ''}
                                        tabIndex={0}
                                        changed={() => {
                                        }}
                                        // changed={(name, value) =>
                                        //     this.handleInputChange(
                                        //         this.state.targetRefKey,
                                        //         inputConfig.name,
                                        //         value
                                        //     )
                                        // }
                                    />
                                );
                            })}
                        </Form>
                    </React.Fragment>
                ) : null}
            </Modal>
        </div>
    );

};

export default BMHModalForm;