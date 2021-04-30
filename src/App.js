import React, {Component, Suspense, useEffect} from "react";

import "./App.css";
import {Route} from "react-router-dom";
import SpeechRecognition from 'react-speech-recognition';
import axios from "axios";

const CVBuilder = React.lazy(() => import("./containers/CVBuilder/CVBuilder"));
const TemplatesProvider = React.lazy(() =>
    import("./containers/TemplatesProvider/TemplatesProvider")
);
const Homepage = React.lazy(() => import("./components/Homepage/Homepage"));

class App extends Component {
    state = {
        defaultTemplate: 1,
        showDynamic: true,
        showCVBuilder: false,
        showTemplatesProvider: true,
        selectedTemplate: null,
        notFound: false,
        cvData: {},
        found: false,
        templateId: null,
        cvId: null,
        userId: null,
        username: null,
    };

    handleTemplateSelected = value => {
        this.setState({
            selectedTemplate: value,
            showTemplatesProvider: false,
            showCVBuilder: true
        });
    };

    componentDidMount() {
        SpeechRecognition.startListening({continuous: true});
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');
        const tok = urlParams.get('tok');
        const prev = urlParams.get('preview');
        let preview = false;
        if (prev)
            preview = true
        console.log(tok);

        localStorage.setItem('id', id);
        localStorage.setItem('token', tok);
        axios.get(`http://localhost:8000/get-cv/${id}`).then(res => {
            console.log(res);
            this.setState({
                cvId: res.data.cv._id,
                userId: res.data.cv.Author.id,
                username: res.data.cv.Author.authorName,
                cvData: JSON.parse(res.data.cv.CvData),
                found: true,
                templateId: res.data.cv.TemplateId,
                preview: preview
            }, () => {
                console.log(this.state.cvData);
                // window.location.href = `/edit/cv-builder/${res.data.cv.TemplateId}/`;
            });
        }).catch(err => {
            console.log(err)
            this.setState({notFound: true});

        });


    }

    render() {

        let templateForBuilder =
            this.state.selectedTemplate !== null
                ? this.state.selectedTemplate
                : this.state.defaultTemplate;
        return (
            <div id="cvBuilderApp" className="app-wrap">
                <Route
                    path="/"
                    exact
                    render={props => (
                        <Suspense fallback={<div></div>}>
                            <Homepage templateId={this.state.templateId} found={this.state.found}
                                      notFound={this.state.notFound} {...props} />
                        </Suspense>
                    )}
                />
                <Route
                    path="/templates"
                    exact
                    render={props => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <TemplatesProvider
                                {...props}
                                style={{
                                    display: this.state.showTemplatesProvider ? "block" : "none"
                                }}
                                selected={value => this.handleTemplateSelected(value)}
                            />
                        </Suspense>
                    )}
                />
                <Route
                    path="/cv-builder/:id"
                    render={props => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <CVBuilder
                                {...props}
                                template={templateForBuilder}
                            />
                        </Suspense>
                    )}
                />
                <Route
                    path="/edit/cv-builder/:id"
                    render={props => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <CVBuilder
                                edit
                                preview={this.state.preview}
                                cvId={this.state.cvId}
                                userId={this.state.userId}
                                username={this.state.username}
                                cvData={this.state.cvData}
                                {...props}
                                template={templateForBuilder}
                            />
                        </Suspense>
                    )}
                />
            </div>
        );
    }
}

export default App;
