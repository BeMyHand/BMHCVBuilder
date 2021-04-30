import React from "react";

import Backdrop from "../Bacdrop/Backdrop";

import classes from "./Modal.css";

const modal = props => (
  <React.Fragment>
    <div
      style={{
        transform: props.show
          ? "translate(-50%, 0)"
          : "translate(-50%, -100vh)",
        opacity: props.show ? "1" : "0"
      }}
      className={classes["modal"]}
    >
      {!props.hideDefault ? (
        <div className={classes["modal-killer-container"]}>
          <div
            className={classes["modal-killer"]}
            tabIndex={0}
            role="button"
            aria-pressed="false"
            aria-labelledby="modal-killer"
            onClick={props.closeModalHandler}
            onKeyDown={props.closeModalHandler}
          >
            Close
          </div>
        </div>
      ) : null}
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.closeModalHandler} />
  </React.Fragment>
);

export default modal;
