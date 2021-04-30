import React, { Component } from "react";

import classes from "./PaperButton.css";

class Paperbutton extends Component {
  keyPressed = () => {
    this.props.clicked();
  };
  render() {
    return (
      <div
        className={[classes["cv-form-paper-modal-opener"],classes[this.props.className]].join(' ')}
        onClick={this.props.clicked}
        onKeyDown={this.keyPressed}
        tabIndex={0}
        role="button"
        aria-pressed="false"
        aria-labelledby="modal-opener"
      >
        {this.props.children}
      </div>
    );
  }
}
export default Paperbutton;
