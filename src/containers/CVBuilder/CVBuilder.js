import React, {Component} from "react";
import _ from 'lodash';
import Modal from "@material-ui/core/Modal";

import CVTitleWidget from "../Widgets/CVTitleWidget/CVTitleWidget";
import CVImageWidget from "../Widgets/CVImageWidget/CVImageWidget";
import CVForm from "../Widgets/CVForm/CVForm";
import {PDFViewer} from "@react-pdf/renderer";

import Doc1 from "../../components/Templates/cvBuilderPdf2";
import Doc2 from "../../components/Templates/cvBuilderPdf";
import Doc3 from "../../components/Templates/cvBuilderPdf3";

import classes from "./CVBuilder.css";
import BMHMiddleware from '../BMHMiddleware/BMHMiddleware';
import BMHModalForm from '../BMHModalForm/BMHModalForm';
import WebcamCapture from '../../components/WebcamCapture/WebcamCapture';
import axios from "axios";

let modalStyle = {
    position: "relative"
}
let modalBodyStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFFFFF",
    padding: "1rem 5rem 3rem 5rem"
}

const commands = [
    {
        command: 'commands down',
        description: 'Scrolls commands down',
    },
    {
        command: 'command up',
        description: 'Scrolls commands up',
    },
    {
        command: 'upload picture',
        description: 'Opens webcam to upload picture'
    },
    {
        command: 'set title *',
        description: 'Sets document title'
    },
    {
        command: 'open employment history',
        description: 'Opens employment history form'
    },
    {
        command: 'change template',
        description: 'Redirects to template selection page'
    },
    {
        command: 'update employment history level :level',
        description: 'Updates an existing employment history field'
    },
    {
        command: 'open education history',
        description: 'Opens education history form'
    },
    {
        command: 'update education history level :level',
        description: 'Updates an existing education history field'
    },
    {
        command: 'open social media links',
        description: 'Opens social media links form'
    },
    {
        command: 'download file',
        description: 'Downloads PDF'
    },
    {
        command: 'update social media links level :level',
        description: 'Updates an existing social media field'
    },
    {
        command: 'open skill',
        description: 'Opens skill form'
    },
    {
        command: 'update skill level :level',
        description: 'Updates skill level (Beginner, Novice, Experienced, Expert, Skillful)'
    },
    {
        command: 'close',
        description: 'Closes any opened modal'
    },
    {
        command: 'go to *',
        description: 'Sets focus to modal input field',
    },
    {
        command: 'set focus to *',
        description: 'Sets focus to an input field'
    },
    {
        command: 'remove focus',
        description: 'Removes focus'
    },
    {
        command: 'set mode to spelling',
        description: 'Sets paragraph mode'
    },
    {
        command: 'remove spelling mode',
        description: 'Removes spelling mode'
    },
    {
        command: 'set paragraph mode',
        description: 'Sets paragraph mode'
    },
    {
        command: 'remove paragraph mode',
        description: 'Removes paragraph mode'
    },
    {
        command: 'update *',
        description: 'Sets Modal input field value'
    },
    {
        command: 'set value to *',
        description: 'Set paper input field value'
    },
    {
        command: 'reset value',
        description: 'Resets paper field value'
    },
    {
        command: 'reset',
        description: 'Resets modal field value'
    },

]


class CVBuilder extends Component {

    state = {
        modelOpen: false,
        webcamModalOpen: false,
        template: this.props.match.params.id,
        counter: 0,
        counterLimit: 10,
        defaultDocTitle: 'Untitled Document',
        cvData: {},
        cvDataCopy: {},
        cvConfig: {
            formConfig: {
                forms: [
                    {
                        type: "paper-form",
                        displayLimit: 13,
                        formTitle: "Personal Details",
                        inputFields: [
                            {
                                type: "text",
                                label: "First Name",
                                name: "first-name",
                                id: 'firstname',
                                value: '',
                            },
                            {
                                type: "text",
                                label: "Last Name",
                                name: "last-name",
                                id: 'lastname',
                            },
                            {
                                type: "text",
                                label: "Job Title",
                                name: "job-title",
                                id: 'jobtitle',
                            },
                            {
                                type: "email",
                                label: "Email",
                                name: "email",
                                id: 'email',
                            },
                            {
                                type: "text",
                                label: "Phone",
                                name: "phone",
                                id: 'phone',
                            },
                            {
                                type: "text",
                                label: "Country",
                                name: "country",
                                value: '',
                                id: 'country',
                            },
                            {
                                type: "text",
                                label: "City",
                                name: "city",
                                id: 'city',
                            },
                            {
                                type: "text",
                                label: "Address",
                                name: "address",
                                id: 'address',
                            },
                        ]
                    },
                    {
                        type: "paper-form",
                        displayLimit: 1,
                        formTitle: "Personal Statement",
                        description:
                            "Include 2-3 clear sentences about your overall experience",
                        inputFields: [
                            {
                                type: "description",
                                label:
                                    "e.g. Experienced Web Developer with 3+ years of experience and ...",
                                name: "personal-statement",
                                id: 'personalstatement',
                                value: '',
                            }
                        ]
                    },
                    {
                        formTitle: "Employment History",
                        icon: "fas fa-briefcase",
                        type: "modal-form",
                        action: "Add Employment",
                        name: "employment-history",
                        description:
                            "Include your last 10 years of relevant experience and dates in this section. List your most recent position first.",
                        primaryFieldName: "job-title",
                        secondaryFieldName: "employer",
                        tertiaryFieldName: "duration",
                        modalOpened: false,
                        indexOfFocusedValueInList: -1,
                        values: [
                            // {
                            //     "job-title": 'SWE',
                            //     "employer": 'Turing Technologies',
                            //     "city": "Islamabad",
                            //     "description": "SWE at TT",
                            //     "starting-month": 'January',
                            //     'starting-year': '2021',
                            //     'end-date': 'Present',
                            // },
                        ],
                        inputFields: [
                            {
                                type: "text",
                                label: "Job Title",
                                name: "job-title",
                                id: 'jobtitle',
                            },
                            {
                                type: "text",
                                label: "Employer",
                                name: "employer",
                                id: 'employer',
                                value: '',
                            },
                            {
                                type: "text",
                                label: "Starting Month",
                                name: "starting-month",
                                id: 'startingmonth',
                            },
                            {
                                type: 'text',
                                label: 'Starting year',
                                name: "starting-year",
                                id: 'startingyear',

                            },
                            {
                                type: 'text',
                                label: 'End Date (Present/Month&Year)',
                                name: "end-date",
                                id: 'enddate',
                            },
                            {
                                type: "text",
                                label: "City",
                                name: "city",
                                value: '',
                                id: 'city',
                            },
                            {
                                type: "description",
                                label: "Description",
                                name: "description",
                                value: 'hello',
                                id: 'description',
                            }
                        ]
                    },
                    {
                        formTitle: "Education History",
                        icon: "fas fa-book-open",
                        type: "modal-form",
                        action: "Add Education",
                        name: "education-history",
                        description:
                            "If relevant, include your most recent educational achievements and the dates here",
                        primaryFieldName: "degree",
                        secondaryFieldName: "school",
                        tertiaryFieldName: "duration",
                        modalOpened: false,
                        indexOfFocusedValueInList: -1,
                        inputFields: [
                            {
                                type: "text",
                                label: "Degree",
                                name: "degree",
                                id: 'degree',
                            },
                            {
                                type: "text",
                                label: "School",
                                name: "school",
                                id: 'school',
                            },
                            {
                                type: "text",
                                label: "Starting Month",
                                name: "starting-month",
                                id: 'startingmonth',
                            },
                            {
                                type: 'text',
                                label: 'Starting year',
                                name: "starting-year",
                                id: 'startingyear',

                            },
                            {
                                type: 'text',
                                label: 'End Date (Present or Month/Year)',
                                name: "end-date",
                                id: 'enddate',
                            },
                            {
                                type: "text",
                                label: "City",
                                name: "city",
                                id: 'city',
                            },
                            {
                                type: "description",
                                label: "Description",
                                placeholder: "Description",
                                name: "description",
                                id: 'description'
                            }
                        ]
                    },
                    {
                        formTitle: "Social Media Links",
                        icon: "fas fa-link",
                        type: "modal-form",
                        action: "Add Link",
                        description:
                            "You can add ID names to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
                        name: "links",
                        indexOfFocusedValueInList: -1,
                        modalOpened: false,
                        primaryFieldName: "website-name",
                        inputFields: [
                            {
                                type: "text",
                                label: "Website Name",
                                name: "website-name",
                                id: 'websitename',
                            },
                            {
                                type: "text",
                                label: "Profile Name",
                                name: "profile-name",
                                id: 'profilename',
                            }
                        ]
                    },
                    {
                        formTitle: "Skills",
                        icon: "fas fa-braille",
                        type: "modal-form",
                        action: "Add Skill",
                        name: "skills",
                        description: "Add a skill you want to showcase",
                        indexOfFocusedValueInList: -1,
                        modalOpened: false,
                        primaryFieldName: 'skill',
                        values: []
                        ,
                        inputFields: [
                            {
                                type: "text",
                                label: "Skill",
                                name: "skill",
                                id: 'skill',
                            },
                            {
                                type: "skill",
                                label: "Level",
                                name: "level",
                                id: 'level',
                            }
                        ]
                    }
                ]
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////
    handleSubmit = () => {
        let id = localStorage.getItem('id');
        if (id) {
            let url;
            let data = {};
            if (this.props.edit) {
                url = 'http://localhost:8000/edit-cv';
                data = {
                    userId: this.props.userId,
                    cvId: this.props.cvId,
                    username: this.props.username,

                }
            } else {
                url = 'http://localhost:8000/add-cv';
            }
            axios.post(url, {
                ...data,
                templateId: this.state.template,
                data: this.state.cvData,
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                console.log(res);
                window.location.href = 'http://localhost:3000';
            }).catch(err => {
                console.log(err);
            })
        } else {
            window.location.href = 'http://localhost:3000/login';
        }
    }

    componentDidMount() {

        if (this.props.cvData) {
            let cvData = this.props.cvData; // this will be the data fetched from the server
            console.log(cvData, "aaaaaaaaaaaaaaa")
            let updatedCVConfig = _.cloneDeep(this.state.cvConfig);
            updatedCVConfig.formConfig.forms.forEach(form => {
                if (form.type === 'paper-form') {
                    form.inputFields.forEach(input => {
                        if (cvData[input.name])
                            input.value = cvData[input.name];
                    })
                } else if (form.type === 'modal-form') {
                    if (cvData[form.name]) {
                        console.log(cvData[form.name])
                        form.values = _.cloneDeep(cvData[form.name]);
                        console.log(form.values, "asasas");
                    }
                }
            })

            if (!cvData.docTitle)
                cvData.docTitle = this.state.defaultDocTitle;

            this.setState({cvData: cvData});

            this.setState({cvConfig: updatedCVConfig});
        }

    }

    addBlankValuesObject = (formTitle) => {
        let cvConfig = _.cloneDeep(this.state.cvConfig);
        cvConfig.formConfig.forms.forEach(form => {
            if (form.formTitle === formTitle && form.type === 'modal-form') {
                let obj = {};
                form.inputFields.forEach(input => {
                    obj[input.name] = '';
                });
                form.values.append({...obj});
            }
        });
        this.setState({cvConfig: {...cvConfig}});
    };


    openModalForm = (index, formTitle) => {
        let cvConfig = _.cloneDeep(this.state.cvConfig);
        cvConfig.formConfig.forms.forEach(form => {
            if (form.formTitle === formTitle) {
                form.modalOpened = true;
                if (index != null) {
                    form.indexOfFocusedValueInList = index;
                } else {
                    let obj = {};
                    form.inputFields.forEach(input => {
                        obj[input.name] = '';
                    });
                    if (!form.values)
                        form.values = [];
                    form.values.push(obj);
                    form.indexOfFocusedValueInList = form.values.length - 1;
                }
            }
        });
        this.setState({cvConfig: {...cvConfig}});
        console.log(cvConfig);
    }

    closeModalForm = () => {
        let cvConfig = _.cloneDeep(this.state.cvConfig);
        cvConfig.formConfig.forms.forEach(form => {
            if (form.type === 'modal-form' && form.indexOfFocusedValueInList != -1) {
                console.log(form.values, "what is this");
                form.modalOpened = false;
                form.indexOfFocusedValueInList = -1;
            }
        })
        this.setState({cvConfig: {...cvConfig}});
    };

    handleValueChange = (name, value) => {
        let formName = null, index = null, values = null;
        let cvConfig = _.cloneDeep(this.state.cvConfig);
        cvConfig.formConfig.forms.forEach(form => {
            if (form.type === 'modal-form' && form.indexOfFocusedValueInList != -1) {
                formName = form.name;
                index = form.indexOfFocusedValueInList;
                if (name === 'description' && value != '')
                    form.values[form.indexOfFocusedValueInList][name] += value;
                else
                    form.values[form.indexOfFocusedValueInList][name] = value;
                values = form.values;
            }
        });
        this.setState({cvConfig: {...cvConfig}});
        this.handleInputChange2(formName, values, 'modal-form');
    };

    handleValueChange2 = (formTitle, values) => {
        let cvData = _.cloneDeep(this.state.cvData);
        cvData[formTitle] = [...values];
        this.setState({cvData: {...cvData}}, () => {
            console.log(this.state.cvData, "cvDaTAVALUES");
        });

    }

    handleDocTitleChange = (val) => {
        alert('');
        let cvData = _.cloneDeep(this.state.cvData);
        cvData.docTitle = val;
        this.setState({cvData: {...cvData}});
        console.log(cvData);
    };


    fileSelectedHandler = (blob) => {

        // const fd = new FormData();
        //
        // setProfilePicture(blob);
        //
        // fd.append("picture", blob);
        this.setState({modalOpen: false});
        // setLoading(true);
        // axios
        //     .post("http://localhost:8000/upload-profile-picture", fd, {
        //         headers: authHeader(),
        //         'content-type': 'multipart/form-data'
        //     })
        //     .then((response) => {
        //         setLoading(false);
        //         setProfilePicture(response.data.picture);
        //     });
    }

    ProfileModalClosedHandler = () => {
        this.setState({webCamModalOpen: false});
    }

    openWebcam = () => {
        this.setState({webcamModalOpen: true});
    };

    /////////////////////////////////////////////////////////////////////////

    provideData = () => {
        console.log({...this.state.cvData});

        return {...this.state.cvData};
    };
    handleDocTitleChange = newDocTitle => {
        let cvData = _.cloneDeep(this.state.cvData);
        cvData.docTitle = newDocTitle;
        this.setState({cvData: {...cvData}});
    };

    handleInputChange2 = (name, newValue, type) => {
        let updatedData = {...this.state.cvData};
        if (type === "paper-form") {
            updatedData[name] = newValue;
        } else if (type === "modal-form") {
            updatedData[name] = [...newValue];
        }
        this.setState({cvData: {...updatedData}});
    };
    handleInputChange = (name, newValue, type) => {
        let _upVal;
        let updatedData = _.cloneDeep(this.state.cvConfig);
        updatedData.formConfig.forms.forEach(form => {
            console.log('here1');
            form.inputFields.forEach(input => {
                if (input.name === name) {
                    console.log('here2');
                    console.log(input.label);
                    if (input.name === 'personal-statement' && newValue !== '') {
                        input.value += ' ' + newValue;
                    } else {
                        input.value = newValue;
                    }
                    _upVal = input.value;
                }
            })
        });
        this.setState({cvConfig: {...updatedData}});
        console.log(updatedData);
        this.handleInputChange2(name, _upVal, 'paper-form');

    }

    downloadFile = () => {
        var blob = document.querySelector("iframe").src;
        const link = document.createElement("a");
        link.href = blob;
        link.download = this.state.cvData.docTitle
            ? this.state.cvData.docTitle
            : this.state.defaultDocTitle;
        document.body.append(link);
        link.click();
        link.remove();
        window.addEventListener("focus", e => URL.revokeObjectURL(link.href), {
            once: true
        });
    };
    redirectToTemplates = () => {
        this.props.history.replace("/templates");
    };


    render() {
        let Document = (props) => (
            <PDFViewer
                className={classes["pdf-viewer-org"]}
                style={{
                    width: this.props.preview ? '100%' : "40%",
                    height: "100vh",
                    position: "fixed",
                    top: "0",
                    right: "0"
                }}
            >
                {<Doc1 cvData={props.cvData}/>}
            </PDFViewer>
        );
        const templateId = +this.state.template;
        if (templateId === 1) {
            Document = (props) => (
                <PDFViewer
                    className={classes["pdf-viewer-org"]}
                    style={{
                        width: this.props.preview ? '100%' : "40%",
                        height: "100vh",
                        position: "fixed",
                        top: "0",
                        right: "0"
                    }}
                >
                    {<Doc1 cvData={props.cvData}/>}
                </PDFViewer>
            );
        } else if (templateId === 2) {
            Document = (props) => (
                <PDFViewer
                    className={classes["pdf-viewer-org"]}
                    style={{
                        width: this.props.preview ? '100%' : "40%",
                        height: "100vh",
                        position: "fixed",
                        top: "0",
                        right: "0"
                    }}
                >
                    {<Doc2 cvData={props.cvData}/>}
                </PDFViewer>
            );
        } else if (templateId === 3) {
            Document = (props) => (
                <PDFViewer
                    className={classes["pdf-viewer-org"]}
                    style={{
                        width: this.props.preview ? '100%' : "40%",
                        height: "100vh",
                        position: "fixed",
                        top: "0",
                        right: "0"
                    }}
                >
                    {<Doc3 cvData={props.cvData}/>}
                </PDFViewer>
            );
        }
        console.log("cvbuilder rendering");
        let forms = [...this.state.cvConfig.formConfig.forms];
        forms = forms.map(formConfig => (
            <>
                <CVForm
                    cvData={this.state.cvData}
                    key={formConfig.formTitle}
                    type={formConfig.type}
                    config={{...formConfig}}
                    changed={(name, newValue, formType) =>
                        this.handleInputChange(name, newValue, formType)
                    }
                    openModalForm={this.openModalForm}
                    closeModalForm={this.closeModalForm}
                    handleValueChange={this.handleValueChange}
                />
            </>
        ));
        return (
            <div
                style={{...this.props.style}}
                className={classes["cv-builder-root"]}
            >

                <Modal
                    style={modalStyle}
                    open={this.state.webcamModalOpen}
                    onClose={this.ProfileModalClosedHandler}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalBodyStyle}>
                        <h4 style={{marginBottom: "2rem", textAlign: "center"}}>
                            {"Please Capture Image"}</h4>
                        <input
                            id="upload-image"
                            class="upload-image"
                            type="file"
                            onChange={this.fileSelectedHandler}
                        />
                        <div>
                            <WebcamCapture
                                fileSelectedHandler={this.fileSelectedHandler}
                                ProfileModalClosedHandler={this.ProfileModalClosedHandler}
                            />
                        </div>
                    </div>
                </Modal>


                {
                    !this.props.preview &&
                    (
                        <>
                            <div id={'sidebar'} className={classes['commands-container']}>
                                <div className={classes["sidebar"]}>
                                    <h6 className={classes["h6"]}>Commands and Descriptions</h6>
                                    <div className={classes["commands"]}>
                                        {commands.length > 0 ? commands.map(cmd => {
                                            return (<div className={classes["command"]} key={cmd.command}>
                                                <div className={classes["button"]}>{cmd.command}</div>
                                                <div className={classes["caption"]}>{cmd.description}</div>
                                            </div>)
                                        }) : 'loading commands...'}
                                    </div>
                                </div>
                            </div>
                            <div id="cvBuilder" className={classes["cv-builder"]}>
                                <BMHMiddleware
                                    handleSubmit={this.handleSubmit}
                                    changed={(name, newValue) => this.handleInputChange(name, newValue, "paper-form")
                                    }
                                    openModalForm={this.openModalForm}
                                    closeModalForm={this.closeModalForm}
                                    handleValueChange={this.handleValueChange}
                                    downloadFile={this.downloadFile}
                                    redirectToTemplates={this.redirectToTemplates}
                                    handleDocTitleChange={this.handleDocTitleChange}
                                    openWebcam={this.openWebcam}
                                />
                                <CVTitleWidget
                                    docTitle={this.state.cvData.docTitle}
                                />
                                {/*<CVImageWidget*/}
                                {/*    changed={(name, val) =>*/}
                                {/*        this.handleInputChange(name, val, "paper-form")*/}
                                {/*    }*/}
                                {/*    value={this.state.cvData.image}*/}
                                {/*/>*/}
                                {forms}

                                <a
                                    href="#"
                                    download={this.state.cvData.docTitle}
                                    className={classes["mobile-preview-btn"]}
                                    onClick={this.downloadFile}
                                >
                                    <i className="far fa-eye"></i>
                                </a>

                                <div className={classes["pdf-viewer-btns"]}>
                                    <div
                                        className={classes["btn-change-template"]}
                                        onClick={this.redirectToTemplates}
                                    >
                                        <i className="fas fa-file-download"></i>&nbsp; Change Template
                                    </div>
                                    <div
                                        className={classes["btn-change-template"]}
                                        onClick={this.downloadFile}
                                    >
                                        Download PDF
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <Document cvData={this.state.cvData}/>
            </div>
        );
    }
}

export default CVBuilder;
