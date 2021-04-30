import React, {Component} from "react";

import classes from "./TemplatesProvider.css";

import template1 from "../../templateImages/1.png";
import template2 from "../../templateImages/2.png";
import template3 from "../../templateImages/3.png";
import BMHVoiceController from './BMHVoiceController';


class TemplatesProvider extends Component {
    state = {
        activeWindow: 2,
        maxWidth: 3
    };

    handleTemplateChosen = () => {
        let templateId = this.state.activeWindow;
        this.props.history.push({
            pathname: '/cv-builder/' + templateId
        });
        //   this.props.selected(templateId);
    };
    handleRightShift = () => {
        this.setState((prevState, props) => {
            console.log(prevState.activeWindow);
            return {
                activeWindow:
                    prevState.activeWindow < prevState.maxWidth
                        ? prevState.activeWindow + 1
                        : prevState.activeWindow
            };
        });
    };
    handleLeftShift = () => {
        this.setState((prevState, props) => {
            console.log(prevState.activeWindow);
            return {
                activeWindow:
                    prevState.activeWindow > 1
                        ? prevState.activeWindow - 1
                        : prevState.activeWindow
            };
        });
    };

    componentDidMount() {
        console.log("my props -> ", this.props);
    }

    render() {
        let _position = 1;
        let signMultiplier =
            this.state.activeWindow < 2 ? 1 : this.state.activeWindow > 2 ? -1 : 0;
        let mulDigit = 30;
        if (this.state.activeWindow !== 2) {
            mulDigit = 40;
            _position = signMultiplier * mulDigit;
        }

        let activeTemplateProvider = [];
        for (let i = 0; i < this.state.maxWidth; i++) {
            if (this.state.activeWindow === i + 1) {
                activeTemplateProvider.push(classes["active"]);
            } else {
                activeTemplateProvider.push("_");
            }
        }

        return (
            <div style={{...this.props.style}}>
                <BMHVoiceController handleRightShift={this.handleRightShift} handleLeftShift={this.handleLeftShift}
                                    handleTemplateChosen={this.handleTemplateChosen}/>
                <div className={classes["templates-provider-container"]}>
                    <div
                        style={{left: _position + "%"}}
                        className={classes["templates-plane"]}
                    >
                        <div
                            className={[
                                classes["template-holder"],
                                classes["template-1"]
                            ].join(" ")}
                        >
                            <div
                                style={{backgroundImage: `url(${template1})`}}
                                className={[
                                    classes["template"],
                                    activeTemplateProvider[0]
                                ].join(" ")}
                            ></div>
                        </div>
                        <div
                            className={[
                                classes["template-holder"],
                                classes["template-2"]
                            ].join(" ")}
                        >
                            <div
                                style={{backgroundImage: `url(${template2})`}}
                                className={[
                                    classes["template"],
                                    activeTemplateProvider[1]
                                ].join(" ")}
                            ></div>
                        </div>
                        <div
                            className={[
                                classes["template-holder"],
                                classes["template-3"]
                            ].join(" ")}
                        >
                            <div
                                style={{backgroundImage: `url(${template3})`}}
                                className={[
                                    classes["template"],
                                    activeTemplateProvider[2]
                                ].join(" ")}
                            ></div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={this.handleLeftShift}
                    className={[
                        classes["templates-control"],
                        classes["templates-control-left"]
                    ].join(" ")}
                >
                    <i className="fas fa-angle-left"></i>
                </div>
                <div
                    onClick={this.handleRightShift}
                    className={[
                        classes["templates-control"],
                        classes["templates-control-right"]
                    ].join(" ")}
                >
                    <i className="fas fa-angle-right"></i>
                </div>
                <div onClick={this.handleTemplateChosen} className={classes["template-selector"]}>Select This Template
                </div>
            </div>
        );
    }
}

export default TemplatesProvider;
