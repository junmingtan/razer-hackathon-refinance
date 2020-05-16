import React, { Component } from "react";
import "./ImageCard.css";

/**
 * props:
 * - available : There are enough skill points available to activate the perk
 * - active : The perk is currently active
 */

class ImageCard extends Component {
  state = {};
  render() {
    return (
      <img
        className={
          "imageCard " + (this.props.active ? "imageCard--active" : "")
        }
        src={
          this.props.active || this.props.available
            ? this.props.src.active
            : this.props.src.inactive
        }
        alt="perks icon"
      />
    );
  }
}

export default ImageCard;
