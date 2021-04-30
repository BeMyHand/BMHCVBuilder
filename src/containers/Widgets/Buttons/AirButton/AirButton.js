import React from "react";

import classes from "./AirButton.css";

const airButton = props => {
  let classNames = [classes["air-button"]];
  props.className.forEach(_class => classNames.push(classes[_class]));
  classNames = classNames.join(' ');
  return (
    <div
      className={classNames}
      onClick={props.clicked}
    >
      {props.children}
    </div>
  );
};

export default airButton;
