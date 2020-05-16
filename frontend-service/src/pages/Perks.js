import React, { Component } from "react";
import { images } from "../images";
import SkillTree from "../components/SkillTree";
import SkillTreeNavBar from "../components/SkillTreeNavBar";
import SkillTreeModal from "../components/SkillTreeModal";
import "./Perks.css";
import { GiRevolt } from "react-icons/gi";
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
            <div className="perks__footer">
              <div className="perks__icon">
                <div style={{ marginBottom: "5px" }}>You have</div>
                <GiRevolt />
                <span className="perks__icon__num">2</span>
                <div className="perks__icon__text">Skillpoints</div>
              </div>
            </div>
          }
          navbarContent={
            <div className="perks__footer">
              <div className="perks__icon">
                <GiRevolt />
                <span className="perks__icon__num">2</span>
                <div className="perks__icon__text">Skillpoints</div>
              </div>
            </div>
          }
        />

        <div className="perks">
          <SkillTreeModal
            handleCloseModal={this.handleCloseModal}
            open={this.state.openModal}
            image={this.state.image}
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
