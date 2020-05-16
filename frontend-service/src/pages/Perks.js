import React, { Component } from "react";
import { images } from "../images";
import SkillTree from "../components/SkillTree";
import SkillTreeNavBar from "../components/SkillTreeNavBar";
import SkillTreeModal from "../components/SkillTreeModal";
import "./Perks.css";
import {
  GiLevelTwoAdvanced,
  GiRevolt,
  GiLevelFourAdvanced
} from "react-icons/gi";
import BottomNavBar from "../components/BottomNavBar";
import Hero from "../components/Hero";

/*
image has: 
      active: "https://image.flaticon.com/icons/svg/2695/2695674.svg",
      inactive: "https://image.flaticon.com/icons/png/512/2695/2695678.png",
      title: "ss",
      description: "xx",
      is_active: true
 */
function IconInfo({ Icon, value, description }) {
  return (
    <div className="perks__footer">
      <div className="perks__icon">
        <div>
          <Icon />
          <span className="perks__icon__num">{value}</span>
        </div>
        <div className="perks__icon__text">{description}</div>
      </div>
    </div>
  );
}

class Perks extends Component {
  state = {
    category: "travel",
    openModal: false,
    image: {}
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

  handleOpenModal = image => {
    this.setState({ image });
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <Hero
          heroContent={
            <React.Fragment>
              <IconInfo
                Icon={GiRevolt}
                value={this.props.skillPoints}
                description={"skillpoints"}
              />
              <IconInfo
                Icon={GiLevelTwoAdvanced}
                value={this.props.userLevel}
                description={"level"}
              />
            </React.Fragment>
          }
          navbarContent={
            <React.Fragment>
              <IconInfo
                Icon={GiRevolt}
                value={this.props.skillPoints}
                description={"skillpoints"}
              />
              <IconInfo
                Icon={GiLevelTwoAdvanced}
                value={this.props.userLevel}
                description={"level"}
              />
            </React.Fragment>
          }
        />

        <div className="perks">
          <SkillTreeModal
            handleCloseModal={this.handleCloseModal}
            open={this.state.openModal}
            image={this.state.image}
            userLevel={2}
          />
          <SkillTreeNavBar
            values={this.getCatergories(images)}
            category={this.state.category}
            handleChangeCategory={this.handleChangeCategory}
          />
          <SkillTree
            images={images[this.state.category]}
            handleOpenModal={this.handleOpenModal}
          />
        </div>
        <div style={{ padding: "100px" }}></div>
        <BottomNavBar active="perks" handleNav={this.props.handleNav} />
      </React.Fragment>
    );
  }
}

export default Perks;
