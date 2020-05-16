import React, { Component } from "react";
import ImageCard from "../components/ImageCard";
import "./SkillTree.css";
import { copyFile } from "fs";

const text = text => {
  return <div className="skillTree__categories"> {text}</div>;
};

class SkillTree extends Component {
  state = {};

  renderImages = images => {
    let component = [];
    images.map((image, index) => {
      // Renders the header
      if (image.category != "") {
        component.push(text(image.category));
      }
      image.elements.map((e, index2) => {
        component.push(
          <div key={index + "" + index2} className="skillTree__item">
            <ImageCard active src={e} />
          </div>
        );
      });
    });
    return component;
  };

  render() {
    return (
      <React.Fragment>
        <div className="skillTree">{this.renderImages(this.props.images)}</div>
      </React.Fragment>
    );
  }
}

export default SkillTree;
