import React, { Component } from "react";

import classes from "./CVPaperForm.css";

import CVInput from "../../CVInput/CVInput";
import Modal from "../../../../components/UI/Modal/Modal";
import ModalOpener from "../../../Widgets/Buttons/PaperButton/PaperButton";
import Form from "../../../../components/Form/Form";

class CVPaperForm extends Component {
  constructor(props) {
    super(props);
    this.modalOpenerRef = new React.createRef();
    this.state = {
      config: { ...props.config },
      modalOpener: props.config.displayLimit < props.config.inputFields.length,
      modalOpened: false
    };
  }

  openModal = () => {
    this.setState({ modalOpened: true });
  };
  modalOpenerPressed = () => {
    this.modalOpenerRef.current.setAttribute("aria-pressed", true);
    this.openModal();
  };
  handleModalClosed = () => {
    this.setState({ modalOpened: false });
  };
  render() {
    const displayLimit = this.props.config.displayLimit;
    let fields = [...this.props.config.inputFields];
    let inputFields = fields.slice(0, displayLimit);
    let modalFields = fields.slice(displayLimit);

    inputFields = inputFields.map((inputConfig, index) => (
      <CVInput
          id={inputConfig?.id}
        controlled={true}
        key={inputConfig.name}
        config={{ ...inputConfig }}
        tabIndex={0}
        // value={this.props.cvData[inputConfig.name]}
          value ={inputConfig.value}
        changed={(newValue) =>
          this.props.changed(inputConfig.name, newValue, this.props.config.type)
        }
      />
    ));
    modalFields = modalFields.map((inputConfig, index) => (
      <CVInput
        controlled={true}
        key={inputConfig.name}
        config={{ ...inputConfig }}
        tabIndex={0}
        changed={(name, newValue) =>
          this.props.changed(name, newValue, this.props.config.type)
        }
        value={this.props.cvData[inputConfig.name]}
      />
    ));
    return (
      <React.Fragment>
        <h2 className={classes["cv-form-section-heading"]}>
          {this.props.config.formTitle}
        </h2>
        {this.props.config.description ? (
          <p className={classes["cv-form-section-description"]}>
            {this.props.config.description}
          </p>
        ) : null}
        <div className={classes["cv-form"]}>
          {inputFields}
          {this.props.config.displayLimit < this.props.config.inputFields.length ? (
            <ModalOpener clicked={this.openModal}>
              <i className="fas fa-pencil-alt"></i>&nbsp;&nbsp;Edit Additional
              Details
            </ModalOpener>
          ) : null}
        </div>
        <Modal
          show={this.state.modalOpened}
          closeModalHandler={this.handleModalClosed}
        >
          <h2 className={classes["cv-form-section-heading"]}>
            {this.props.config.formTitle}
          </h2>

          <Form>{modalFields}</Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CVPaperForm;
