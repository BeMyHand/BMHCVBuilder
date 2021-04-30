import React, { Component } from "react";

import classes from "./CVModalForm.css";

import CVModalInput from "../../CVInput/CVModalInput/CVModalInput";
import ModalOpener from "../../Buttons/PaperButton/PaperButton";
import Modal from "../../../../components/UI/Modal/Modal";
import CVInput from "../../CVInput/CVInput";
import Form from "../../../../components/Form/Form";

class CVModalForm extends Component {
  constructor(props) {
    super(props);
    // data = [
    //     {
    //         "data-key": 0
    //         title: "Software developer",
    //         inputValues: {
    //             "first-name": "Haysam",
    //             "duration": {
    //                  from: "",
    //                  to: ""
    //              }
    //         }
    //     }
    // ];
    // let dataPoint = {};
    this.modalFocusedInputRef = new React.createRef();
    let inputFieldsSkeleton = {};
    props.config.inputFields.forEach(inputField => {
      inputFieldsSkeleton[inputField.name] = "";
    });
    const _dataPointSkeleton = {
      "data-key": 0,
      defaultTitle: "(Not specified)",
      title: "(Not specified)",
      inputValues: {
        ...inputFieldsSkeleton
      }
    };
    this.state = {
      data: [],
      modalOpened: false,
      dataPointSkeleton: { ..._dataPointSkeleton },
      targetRefKey: null
    };
  }
  liftDataToRoot = () => {
    let _returnData = [];
    this.state.data.forEach(dataPoint =>
      _returnData.push({ ...dataPoint.inputValues })
    );
    this.props.changed(
      this.props.config.name,
      [..._returnData],
      this.props.config.type
    );
  };
  openModal = (...dataKey) => {
    document.querySelector(".focusRemover").focus();
    let _targetRefKey = dataKey[0];
    if (dataKey[0] === null) {
      const currData = [...this.state.data];
      let updatedData = [...currData];
      const dataPoint = { ...this.state.dataPointSkeleton };
      dataPoint.inputValues = { ...this.state.dataPointSkeleton.inputValues };
      _targetRefKey = currData.length;
      dataPoint["data-key"] = _targetRefKey;
      updatedData.push(dataPoint);
      this.setState({ data: [...updatedData] });
    }
    this.setState({ modalOpened: true, targetRefKey: _targetRefKey });
  };
  closeModal = () => {
    this.setState({ modalOpened: false });
  };
  handleInputChange = (...data) => {
    let key = data[0];
    let name = data[1];
    const newValue = data[2];
    const currData = [...this.state.data];
    let updatedData = [...currData];
    if (name === this.props.config.inputFields[0].name && newValue !== "") {
      updatedData[key].title = newValue;
    } else if (
      name === this.props.config.inputFields[0].name &&
      newValue === ""
    ) {
      updatedData[key].title = updatedData[key].defaultTitle;
    }
    if (newValue.from || newValue.to || newValue.tillPresent ) {
        updatedData[key].inputValues[name] = {...newValue};
    } else {
        updatedData[key].inputValues[name] = newValue;
    }


    let _returnData = [];
    updatedData.forEach(dataPoint =>
      _returnData.push({ ...dataPoint.inputValues })
    );
    this.props.changed(
      this.props.config.name,
      [..._returnData],
      this.props.config.type
    );

    this.setState({ data: [...updatedData] });
  };
  updateRefKeys = () => {
    const currData = [...this.state.data];
    let newArr = [];
    currData.forEach(dataPoint => newArr.push({ ...dataPoint }));
    for (let i = 0; i < newArr.length; i++) {
      newArr[i]["data-key"] = i;
    }
    this.setState({ data: [...newArr] }, () => {
      this.liftDataToRoot();
    });
  };
  handleDeleteItem = refKey => {
    const currData = [...this.state.data];
    let updatedData = [...currData];
    updatedData.inputValues = { ...currData.inputValues };
    let newDataPoints = [];
    updatedData.forEach(dataPoint => {
      if (+dataPoint["data-key"] !== +refKey) {
        newDataPoints.push({ ...dataPoint });
      }
    });
    for (let i = 0; i < newDataPoints.length; i++) {
        newDataPoints[i]["data-key"] = i;
    }
    let _returnData = [];
    newDataPoints.forEach(dataPoint =>
      _returnData.push({ ...dataPoint.inputValues })
    );
    this.props.changed(
      this.props.config.name,
      [..._returnData],
      this.props.config.type
    );

    this.setState({ data: [...newDataPoints] });
  };
  render() {
    let inputFields = [...this.props.config.inputFields];
    let data = [...this.state.data];
    let processedData = [];
    data.forEach(dataPoint => {
      let processedDataPoint = { ...dataPoint };
      processedDataPoint.inputValues = { ...dataPoint.inputValues };
      processedData.push({ ...processedDataPoint });
      processedData[processedData.length - 1].inputValues = {
        ...processedData.inputValues
      };
    });
    let DataList = null;
    if (this.state.data.length > 0) {
      DataList = processedData.map(inputData => {
        return (
          <CVModalInput
            actionOnControl={refKey => this.handleDeleteItem(refKey)}
            key={inputData["data-key"]}
            icon={this.props.config.icon}
            contextTitle={inputData.title}
            refKey={inputData["data-key"]}
            clicked={dataKey => this.openModal(dataKey)}
            duration={{type: "duration", ...this.state.data[inputData["data-key"]].inputValues[this.props.config.tertiaryFieldName]}}
          />
        );
      });
    }

    return (
      <div className={classes["modal-form"]}>
        <input
          className="focusRemover"
          type="text"
          style={{
            position: "fixed",
            zIndex: "-100",
            right: "-100vw",
            pointerEvents: "none"
          }}
        />
        <h1 className={classes["cv-form-section-heading"]}>
          {this.props.config.formTitle}
        </h1>
        <p className={classes["cv-form-section-description"]}>
          {this.props.config.description}
        </p>
        <div className={classes["cv-modal-inputs-paper-container"]}>
          {DataList}
        </div>
        <ModalOpener
          refTarget={this.modalOpenerRef}
          className="small"
          clicked={() => this.openModal(null)}
        >
          <i className="fas fa-plus"></i>&nbsp;{this.props.config.action}
        </ModalOpener>
        <Modal
          show={this.state.modalOpened}
          closeModalHandler={this.closeModal}
        >
          {this.state.modalOpened ? (
            <React.Fragment>
              <h2 className={classes["cv-form-section-heading"]}>
                {this.state.data[this.state.targetRefKey].title}
              </h2>
              <Form>
                {inputFields.map(inputConfig => {
                  return (
                    <CVInput
                      refTarget={
                        inputConfig.name ===
                        this.props.config.inputFields[0].name
                          ? this.modalFocusedInputRef
                          : null
                      }
                      controlled={true}
                      key={inputConfig.name}
                      config={{ ...inputConfig }}
                      tabIndex={0}
                      changed={(name, value) =>
                        this.handleInputChange(
                          this.state.targetRefKey,
                          inputConfig.name,
                          value
                        )
                      }
                      value={
                          inputConfig.name !== "duration" ?
                        this.state.data[this.state.targetRefKey].inputValues[
                          inputConfig.name
                        ] : {
                            ...this.state.data[this.state.targetRefKey].inputValues[
                              inputConfig.name
                            ]
                        }
                      }
                    />
                  );
                })}
              </Form>
            </React.Fragment>
          ) : null}
          <ModalOpener
            refTarget={this.modalOpenerRef}
            className="small"
            clicked={() => this.openModal(null)}
          >
            <i className="fas fa-plus"></i>&nbsp;{this.props.config.action}
          </ModalOpener>
        </Modal>
      </div>
    );
  }
}

export default CVModalForm;
