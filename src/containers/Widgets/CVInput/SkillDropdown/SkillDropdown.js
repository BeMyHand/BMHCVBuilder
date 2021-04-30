import React, { Component } from "react";

import classes from "./SkillDropdown.css";
import inputClasses from "../CVPaperInput/CVPaperInput.css";

class SkillDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config ? { ...props.config } : null,
      value: props.value ? props.value : ''
    };
  }
  handleSkillChange = e => {
    this.props.changed(e.target.name, e.target.value);
  };
  render() {

    console.log(this.props.value,"props");
    const _val = this.props.value;
    return (
      <div
        ref={this.inputGroupRef}
        className={[
          inputClasses["cv-form-group"],
          classes["cv-form-group"]
        ].join(" ")}
      >
        <select
          className={[
            inputClasses["cv-form-input"],
            classes["cv-form-group"]
          ].join(" ")}

          name={this.props.config.name}
          value={this.props.value}
          id={this.props.modal ? this.props.config.id + '-modal' : this.props.config.id}
        >
          <option value={this.props.value}>{this.props.value}</option>
          <option value="Not Specified">Select Level</option>
          <option value="novice">Novice</option>
          <option value="beginner">Beginner</option>
          <option value="skillful">Skillful</option>
          <option value="experienced">Experienced</option>
          <option value="expert">Expert</option>
        </select>
        <label className={inputClasses["cv-form-input-label"]}>
          {this.state.config.label.split("").map((_char, pos) => (
            <span key={pos} style={{ transitionDelay: pos * 50 + "ms" }}>
              {_char}
            </span>
          ))}
        </label>
      </div>
    );
  }
}

export default SkillDropdown;
