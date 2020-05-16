import React, { Component, useState } from "react";
import ProgressBar from "./ProgressBar";

import "./Profile.css";

const Skill = ({ name, icon }) => <div className="skill"></div>;

const renderSkillIcons = skills => {
  const arr = [];
  skills.map((skill, index) => {
    arr.push(<Skill skill={skill} key={index} />);
  });
  return arr;
};

const Profile = ({
  user: {
    level = 0,
    exp_earned = 0,
    exp_required = 500,
    skills = [{ name: "xx", icon: "" }],
    title = "Beginner"
  }
}) => {
  return (
    <div className="card">
      <div className="level">
        Level {level} {title}
      </div>
      <div className="experience_container">
        <div className="subtitle">
          <p>
            {exp_earned} of {exp_required} EXP
          </p>
          <p
            className={
              "levelup " + (exp_earned === exp_required) ? "active" : ""
            }
          >
            Level Up! Pick a perk
          </p>
        </div>
        <ProgressBar
          progress={(exp_earned / exp_required) * 100}
          frontColor="#7BC415FF"
          backColor="#AEFF0088"
        />
      </div>
      <div className="skills_container">{renderSkillIcons(skills)}</div>
    </div>
  );
};

export default Profile;
