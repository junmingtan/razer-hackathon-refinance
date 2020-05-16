import React, { Component, useState } from "react";
import ProgressBar from "./ProgressBar";

const Skill = ({ name, icon }) => <div className="skill"></div>;

const Profile = ({ user: { level, exp_earned, exp_required, skills } }) => {
  return (
    <div className="card">
      <div className="level">Level {level} Novice</div>
      <div className="experience_container">
        <ProgressBar
          progress={(exp_earned / exp_required) * 100}
          frontColor="#7BC415FF"
          backColor="#AEFF0088"
        />
      </div>
      <div className="skills_container">
        {skills.map(s => (
          <div>{s}</div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
