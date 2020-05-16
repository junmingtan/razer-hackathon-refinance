import React, { Component } from "react";
import ImageCard from "./ImageCard";
import "./SkillTree.css";
import { copyFile } from "fs";

const Text = ({ text }) => {
  return <div className="skillTree__categories"> {text}</div>;
};

class SkillTree extends Component {
  state = {};

  renderImages = images => {
    let component = [];

    component.push(
      <div
        className="skillTree__item"
        onClick={() => this.props.handleOpenModal(images["none"][0])}
      >
        <ImageCard
          active={images["none"][0].is_active}
          src={images["none"][0]}
        />
      </div>
    );

    component.push(<Text text={"novice"} />);
    images["novice"].map(e => {
      component.push(
        <div
          className="skillTree__item"
          onClick={() => this.props.handleOpenModal(e)}
        >
          <ImageCard active={e.is_active} src={e} />
        </div>
      );
    });

    component.push(<Text text={"journey man"} />);
    images["journey man"].map(e => {
      component.push(
        <div
          className="skillTree__item"
          onClick={() => this.props.handleOpenModal(e)}
        >
          <ImageCard active={e.is_active} src={e} />
        </div>
      );
    });

    // Object.entries(images).map(([category, image], index) => {
    //   // Renders the header
    //   if (category != "none" && category != "legendary") {
    //     component.push(<Text key={index} text={category} />);

    //     image.map((e, index2) => {
    //       component.push(
    //         <div
    //           key={index + "" + index2}
    //           className="skillTree__item"
    //           onClick={() => this.props.handleOpenModal(e)}
    //         >
    //           <ImageCard active={e.is_active} src={e} />
    //         </div>
    //       );
    //     });
    //   }
    // });

    component.push(<Text text={"legendary"} />);
    component.push(
      <div
        className="skillTree__item"
        onClick={() => this.props.handleOpenModal(images["legendary"][0])}
      >
        <ImageCard
          active={images["legendary"][0].is_active}
          src={images["legendary"][0]}
        />
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
