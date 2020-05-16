import React, { Component } from "react";
import "./SkillTreeNavBar.css";

const NavComponent = props => {
  return (
    <div
      className="skillTreeNavBar__component"
      onClick={() => props.handleChangeCategory(props.text)}
    >
      <span
        className={
          "skillTreeNavBar__component__item  " +
          (props.active ? " skillTreeNavBar__component__item--active" : "")
        }
      >
        {props.text}
      </span>
    </div>
  );
};

class SkillTreeNavBar extends Component {
  renderValues = values => {
    let components = [];
    values.map((e, index) =>
      components.push(
        <NavComponent
          key={index}
          active={e === this.props.category ? true : false}
          text={e}
          handleChangeCategory={this.props.handleChangeCategory}
        />
      )
    );
    return components;
  };

  render() {
    return (
      <div className="skillTreeNavBar">
        {this.renderValues(this.props.values)}
      </div>
    );
  }
}

export default SkillTreeNavBar;
