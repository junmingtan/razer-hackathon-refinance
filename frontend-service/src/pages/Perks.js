import React, { Component } from "react";
import { images } from "../images";
import SkillTree from "./SkillTree";
import "./Perks.css";
import { GiRevolt } from "react-icons/gi";

class Perks extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="perks">
          <div className="perks__title">TRAVEL</div>
          <SkillTree images={images.travel} />
          <div className="perks__footer">
            <div className="perks__icon">
              <GiRevolt />
              <span className="perks__icon__num">2</span>
              <div className="perks__icon__text">Skillpoints</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Perks;
