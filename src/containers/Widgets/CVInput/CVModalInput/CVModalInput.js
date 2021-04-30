import React, { Component } from "react";

import classes from "./CVModalInput.css";

import Modal from "../../../../components/UI/Modal/Modal";
import AirButton from "../../Buttons/AirButton/AirButton";
class CVModalInput extends Component {
  state = {
    controlOpened: false,
    deleteDialogOpened: false
  };
  handleControlClick = e => {
    e.stopPropagation();
    this.setState((prevState, props) => {
      if (!prevState.controlOpened) {
        window.addEventListener("click", this.handleControlClose);
      }
      return {
        controlOpened: !prevState.controlOpened
      };
    });
  };
  handleControlClose = e => {
    this.setState({
      controlOpened: false
    });
    window.removeEventListener("click", this.handleControlClose);
  };
  handleDelete = () => {
    this.setState({ deleteDialogOpened: true });
  };
  confirmDelete = () => {
    this.setState({ deleteDialogOpened: false }, () => {
      this.props.actionOnControl(this.props.refKey);
    });
  };
  closeDeleteDialog = () => {
    this.setState({ deleteDialogOpened: false });
  };
  componentWillUnmount() {
    //Clearing the memory leak
    window.removeEventListener("click", this.handleControlClose);
  }

  render() {
    let contextDuration = null;
    if (this.props.duration) {
      if (this.props.duration.type == "duration" && (this.props.duration.startingYear?.length !== 0 || this.props.duration?.startingMonth.length !== 0 || this.props.duration?.endDate.length !== 0)) {
        contextDuration = (
          <div className={classes["cv-modal-input-context-duration"]}>
            <span>{this.props.duration.startingMonth}</span>{this.props.duration.startingMonth ? ', ' : ''}<span>{this.props.duration.startingYear}</span>{this.props.duration.endDate ?  'till ' : ''}
            {<span>{this.props.duration.endDate}</span>}
          </div>
        );
      } else if (this.props.duration.type === "other") {
        contextDuration = (
          <div className={classes["cv-modal-input-context-duration"]}>
            <span>{this.props.duration}</span>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.deleteDialogOpened}
          closeModalHandler={this.closeDeleteDialog}
          hideDefault={true}
        >
          <h2 className={classes["modal-heading"]}>
            Are you sure you want to delete this?
          </h2>
          <p className={classes["modal-paragraph"]}>This can not be undone</p>
          <div className={classes["modal-control-group"]}>
            <AirButton
              clicked={this.confirmDelete}
              className={["light", "danger"]}
            >
              Yes, Delete
            </AirButton>
            <AirButton clicked={this.closeDeleteDialog} className={["heavy"]}>
              Cancel
            </AirButton>
          </div>
        </Modal>
        <div
          className={classes["cv-modal-input-holder"]}
          onClick={() => this.props.clicked(this.props.refKey)}
        >
          <div className={classes["cv-modal-input-inner-holder"]}>
            <div className={classes["cv-modal-input-icon-holder"]}>
              <i
                className={[
                  this.props.icon,
                  classes["cv-modal-input-icon"]
                ].join(" ")}
              ></i>
            </div>
            <div className={classes["cv-modal-input-context-holder"]}>
              <p className={classes["cv-modal-input-context-title"]}>
                {this.props.contextTitle}{` [level ${this.props.index + 1}]`}
              </p>
              {contextDuration}
            </div>
            <div
              style={
                this.state.controlOpened
                  ? { backgroundColor: "rgba(0,0,0,.2)" }
                  : null
              }
              className={classes["cv-modal-input-control"]}
              onClick={e => {
                this.handleControlClick(e);
              }}
            >
              <i
                className={[
                  "fas fa-ellipsis-h",
                  classes["cv-modal-input-control-icon"]
                ].join(" ")}
              ></i>
              <div
                style={{
                  top: this.state.controlOpened ? "50%" : "0",
                  right: this.state.controlOpened ? "-140%" : "120%",
                  visibility: this.state.controlOpened ? "visible" : "hidden"
                }}
                className={classes["cv-modal-input-control-action-box"]}
              >
                <p
                  onClick={this.handleDelete}
                  className={classes["cv-modal-input-control-action-button"]}
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default CVModalInput;
