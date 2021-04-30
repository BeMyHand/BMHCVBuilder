import React, { Component } from "react";

import classes from "./Duration.css";
import inputClasses from "../CVPaperInput/CVPaperInput.css";

class Duration extends Component {
  constructor(props) {
    super(props);
    const propVals = { ...props.value };
    this.fromRef = new React.createRef();
    this.toRef = new React.createRef();
    this.state = {
      config: { ...props.config },
      tillPresent: propVals.tillPresent ? propVals.tillPresent : false,
      value: {
        from: propVals.from ? propVals.from : "",
        to: propVals.from ? propVals.to : ""
      }
    };
  }

  handleValueChange = e => {
      e.persist();
    let _tillPresent = this.state.tillPresent;
    if (e.target) {
      if (e.target.name) {
        if (e.target.name === "to") {
          this.setState({ tillPresent: false });
          _tillPresent = false;
        }
      }
    }

    let currValue = { ...this.state };
    let updatedValue = { ...currValue };
    updatedValue.value = { ...currValue.value };
    updatedValue.value.tillPresent = _tillPresent;
    updatedValue.value["from"] = this.fromRef.current.value;
    updatedValue.value["to"] = this.toRef.current.value;
    console.log("==== ", updatedValue.value["to"]);
    this.setState({ value: { ...updatedValue.value } }, () => {
      this.props.changed(null, { ...updatedValue.value });
    });
  };
  handleTillPresentChange = e => {
      e.persist()
    this.setState({ tillPresent: true }, () => {
      this.handleValueChange(e);
    });
  };
  render() {
    console.log(this.props.value);
    let propValue = { ...this.props.value };
    let checkedClass = [];
    if (this.state.tillPresent && propValue.tillPresent) {
      checkedClass.push(classes["checked"]);
    }
    console.log(this.props.value.from);
    return (
      <div className={classes["cv-form-group"]}>
        <div
          style={{ width: "100%", maxWidth: "100%", marginBottom: "10px" }}
          ref={this.inputGroupRef}
          className={inputClasses["cv-form-group"]}
        >
          <div className={classes["inner-flex"]}>
            <div className={classes["inner-flex-item"]}>
              <input
                ref={this.fromRef}
                id={
                  this.state.config.name +
                  Math.floor(Math.random() * 100 + 1 * 100)
                }
                className={inputClasses["cv-form-input"]}
                type="date"
                name="from"
                tabIndex={this.props.tabindex}
                onChange={this.handleValueChange}
                value={this.state.value.from ? this.state.value.from : ""}
              />
              <label
                ref={this.props.refTarget}
                className={inputClasses["cv-form-input-label"]}
              >
                {this.state.config.label.split("").map((_char, pos) => (
                  <span key={pos} style={{ transitionDelay: pos * 50 + "ms" }}>
                    {_char}
                  </span>
                ))}
              </label>
            </div>
            <div className={classes["inner-flex-item"]}>
              <input
                ref={this.toRef}
                id={
                  this.state.config.name +
                  Math.floor(Math.random() * 100 + 1 * 100)
                }
                className={inputClasses["cv-form-input"]}
                type="date"
                name="to"
                tabIndex={this.props.tabindex}
                onChange={this.handleValueChange} //handletochange
                value={this.state.value.to ? this.state.value.to : ""}
              />
            </div>
          </div>
        </div>

        {this.state.config.tillPresent ? (
          <div>
            <div
              className={classes["checkbox-container"]}
              onClick={this.handleTillPresentChange}
            >
              <div className={classes["checkbox-inline-flex"]}>
                <div
                  className={[classes["checkbox"], checkedClass].join(" ")}
                ></div>
                <p className={classes["checkbox-text"]}>Till Present</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Duration;
