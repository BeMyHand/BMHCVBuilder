import React, { Component } from "react";

import classes from "./CVImageWidget.css";
import image from "../../../default-profile-2.webp";
class CVImageWidget extends Component {
  state = {
    url: this.props.value
  };
  imagePreviewRef = new React.createRef();
  handleImageChanged = e => {
    if (e.target.files[0]) {
      let inputVal = e.target.files[0];
      const name = e.target.name;
      const imgUrl = URL.createObjectURL(inputVal);
      this.props.changed(name, imgUrl);
    }
  };

  render() {
    console.log(image);
    return (
      <div className={classes["cv-form-group"]}>
        <label htmlFor="cover-image" className={classes["big-label"]}>
          <i className={["fas fa-image", classes["image-icon"]].join(" ")}></i>
          <div className={classes["cv-form-inner-group"]}>
            <div
              className={classes["cv-form-image-preview"]}
              ref={this.imagePreviewRef}
              style={{ backgroundImage: `url(${this.props.value})` }}
            ></div>

            <div className={classes["cv-form-image-uploader-container"]}>
              <input
                id="cover-image"
                className={classes["custom-file-input"]}
                name="image"
                type="file"
                accept="image/*"
                onChange={this.handleImageChanged}
              />
              <label
                htmlFor="cover-image"
                className={[
                  classes["cv-form-image-label"],
                  classes["image-label-inner"]
                ].join(" ")}
              >
                {this.props.value ? "Edit Image" : "Upload an Image"}
              </label>
            </div>
          </div>
        </label>
      </div>
    );
  }
}

export default CVImageWidget;
