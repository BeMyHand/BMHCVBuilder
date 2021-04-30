import React from "react";

import classes from "./Backdrop.css";

import blur from "../../../static/img/blur.png";

const backdrop = props => (
  <div
    style={{
      opacity: props.show ? "1" : "0",
      visibility: props.show ? "visible": "hidden",
      backgroundImage: "url(" + blur + ")"
    }}
    className={classes["backdrop"]}
    onClick={props.clicked}
  ></div>
);

export default backdrop;
