import React, { Component, createRef } from "react";

import classes from "./CVPaperInput.css";
class CVPaperInput extends Component {


  constructor(props) {
    super(props);
    this.inputGroupRef = createRef();
    this.inputRef = createRef();
    this.state = {
      config: props.config ? { ...props.config } : null,
      history: null,
      inputValue: props.controlled ? props.value : ''
    };
  }
  handleFocus = e => {
    e.persist()
    this.setState({history: e.target.value ? e.target.value : null})
  }
  handleValueChangeOnBlur = e => {
    if (e.target.value !== this.state.history) {
      this.setState({history: e.target.value});
      this.props.changed(e.target.value);
    }
  }
  handleValueChange = e => {
    this.props.changed(e.target.value);
  };
  activateInput = () => {
    this.inputRef.current.removeAttribute("readonly");
  };
  componentDidMount() {
    this.inputGroupRef.current.addEventListener("keyup", this.activateInput);
    this.inputGroupRef.current.addEventListener("hover", this.activateInput);
    this.inputGroupRef.current.addEventListener("focus", this.activateInput);
    this.inputGroupRef.current.addEventListener("click", this.activateInput);
    this.inputGroupRef.current.addEventListener("blur", this.activateInput);
    this.inputGroupRef.current.addEventListener("keydown", this.activateInput);
  }
  render() {
    let input = null;
    if (this.state.config.type === "description") {
      input = (
        <div ref={this.inputGroupRef} className={[classes["cv-form-group"], classes["cv-text-area"]].join(' ')}>
          <textarea
            ref={this.inputRef}
            id={
              this.state.config.id ? this.props.modal ? this.props.config.id + '-modal' : this.state.config.id :this.state.config.name + Math.floor(Math.random() * 100 + 1 * 100)
            }
            className={classes["cv-form-input"]}
            name={this.state.config.name}
            tabIndex={this.props.tabindex}
            onChange={this.handleValueChange}
            value={this.props.value}
            style={{textTransform: 'none'}}
          />
          <label
            ref={this.props.refTarget}
            className={classes["cv-form-input-label"]}
          >
            {this.state.config.label.split("").map((_char, pos) => (
              <span key={pos} style={{ transitionDelay: pos * 50 + "ms" }}>
                {_char}
              </span>
            ))}
          </label>
        </div>
      );
    } else {
      input = (
        <div ref={this.inputGroupRef} className={classes["cv-form-group"]}>
          <input
            ref={this.inputRef}
            id={
              this.state.config.id ? this.props.modal ? this.props.config.id + '-modal' : this.state.config.id :this.state.config.name + Math.floor(Math.random() * 100 + 1 * 100)
            }
            className={classes["cv-form-input"]}
            type={this.state.config.type}
            name={this.state.config.name}
            placeholder={this.state.config.name}
            tabIndex={this.props.tabindex}
            onFocus={this.handleFocus}
            onBlur={this.handleValueChangeOnBlur}
            value={this.props.value}
            // onChange={e => this.setState({inputValue: e.target.value})}
              onChange={e => this.props.changed(e.target.value)}

          />
          <label
            ref={this.props.refTarget}
            className={classes["cv-form-input-label"]}
          >
            {this.state.config.label.split("").map((_char, pos) => (
              <span key={pos} style={{ transitionDelay: pos * 50 + "ms" }}>
                {_char}
              </span>
            ))}
          </label>
        </div>
      );
    }
    return input;
  }
}

export default CVPaperInput;
