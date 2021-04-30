import React, {Component} from "react";

import classes from "./CVTitleWidget.css";

class CVTitleWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classes["cv-title-container"]}>
                <i className={"far fa-file-alt " + classes["cv-file-icon"]}></i>
                <div className={classes["cv-title-widget"]}>
                    <input
                        className={classes["cv-title-input"]}
                        type="text"
                        name="doc-title"
                        value={this.props.docTitle}
                        readOnly
                    />
                    <div
                        className={classes["cv-title-input-label"]}
                        onClick={this.focusCVTitle}
                    >
                        <span>{this.props.docTitle}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CVTitleWidget;
