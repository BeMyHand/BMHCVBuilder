import React, { Component } from "react";

import CVPaperForm from "./CVPaperForm/CVPaperForm";
import CVModalForm from "./CVModalForm/CVModalForm";
import BMHModalForm from '../../BMHModalForm/BMHModalForm';

class CVForm extends Component {
  render() {
    const formType = this.props.type;
    let form = null;
    if (formType === "paper-form") {
      form = <CVPaperForm {...this.props} />;
    } else if (formType === "modal-form") {
      form = <BMHModalForm {...this.props} />;
    }
    return form;
  }
}

export default CVForm;
