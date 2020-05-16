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
    const lastElement = images.pop();
    component.push(
      <div className="skillTree__container">
        <ImageCard active src={images.shift()} />
      </div>
    );
    component.push(text("Novice"));
    images.map((image, index) => {
      if (index == 6) {
        component.push(text("Journey Man"));
      } else if (index == 9) {
        component.push(text("Grand Master"));
      }
      component.push(
        <div key={index} className="skillTree__item">
          <ImageCard active src={image} />
        </div>
      );
    });

    component.push(text("Legendary"));
    component.push(
      <div className="skillTree__container">
        <ImageCard active src={lastElement} />
      </div>
    );

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
