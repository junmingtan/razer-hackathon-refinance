import React, { Component } from "react";
import { images } from "../images";
import SkillTree from "./SkillTree";
import SkillTreeNavBar from "../components/SkillTreeNavBar";
import "./Perks.css";
import { GiRevolt } from "react-icons/gi";
import BottomNavBar from "../components/BottomNavBar";

class Perks extends Component {
  state = {
    category: "travel"
  };

  getCatergories = images => {
    let categories = [];
    Object.entries(images).map(e => {
      categories.push(e[0]);
    });
    return categories;
  };

  handleChangeCategory = category => {
    this.setState({ category });
  };

  render() {
    return (
      <React.Fragment>
        <div className="perks">
          <SkillTreeNavBar
            values={this.getCatergories(images)}
            category={this.state.category}
            handleChangeCategory={this.handleChangeCategory}
          />
          <SkillTree images={images[this.state.category]} />
          <div className="perks__footer">
            <div className="perks__icon">
              <GiRevolt />
              <span className="perks__icon__num">2</span>
              <div className="perks__icon__text">Skillpoints</div>
            </div>
          </div>
        </div>
        <BottomNavBar active="perks" handleNav={this.props.handleNav} />
      </React.Fragment>
    );
  }
}

export default Perks;
