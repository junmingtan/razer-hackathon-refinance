import React, { Component } from "react";
import ImageCard from "../components/ImageCard";
import { images } from "../images";

class Perks extends Component {
  state = {};
  render() {
    return <ImageCard available src={images.travel["1"]} />;
  }
}

export default Perks;
