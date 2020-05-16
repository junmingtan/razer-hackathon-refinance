import React, { Component, useEffect, useRef, useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import VisaCard from "../components/VisaCard";
import Profile from "../components/Profile";

import "./LandingPage.css";
import ProgressBar from "../components/ProgressBar";
import Hero from "../components/Hero";
import QuestCard from "../components/QuestCard.jsx";
import Section from "../components/Section";

const defaultQuests = [
  { name: "Make your first deposit", progress: 0, criteria: 1, exp: 500 },
  { name: "Direct credit your salary", progress: 2, criteria: 6, exp: 500 },
  {
    name: "Save into fixed deposits",
    progress: 2200,
    criteria: 10000,
    exp: 1000
  }
];

const defaultUser = {
  name: "Shin Chan",
  balance: 0,
  level: 1,
  exp_earned: 0,
  exp_required: 2000,
  skills: []
};

const LandingPage = ({
  handleNav,
  quests = defaultQuests,
  user = defaultUser
}) => {
  const { name, balance } = user;
  useEffect(() => {
    fetch("/user/123")
      .then(e => e.json())
      .then(b => console.log(b));
  });

  return (
    <div className="page">
      <Hero
        heroContent={
          <div>
            <h1>Welcome back, {name}</h1>
            <p>${balance}</p>
          </div>
        }
        navbarContent={
          <div>
            <p>${name}</p>
            <p>${balance}</p>
          </div>
        }
      />
      <div className="content">
        <Section section="Profile">
          <Profile user={user} />
        </Section>
        <Section section="Quests">
          {quests.map(q => (
            <QuestCard quest={q} key={q.name} />
          ))}
        </Section>
      </div>
      <BottomNavBar active={"home"} handleNav={handleNav} />
    </div>
  );
};

export default LandingPage;
