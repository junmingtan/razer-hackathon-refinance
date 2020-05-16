import React, {Component, useEffect, useRef, useState} from "react";
import BottomNavBar from "../components/BottomNavBar";
import VisaCard from "../components/VisaCard";
import Profile from '../components/Profile';

import "./LandingPage.css";
import Hero from "../components/Hero";
import QuestCard, {QuestModal} from "../components/QuestCard";
import Section from "../components/Section";

const defaultQuests = [
    {name: "Direct credit your salary", progress: 2, criteria: 6, exp: 500},
    {name: "Save into fixed deposits", progress: 2200, criteria: 10000, exp: 1000},
    ];

const defaultUser = {
    name: "Shin Chan",
    balance: 5683,
    level: 6,
    exp_earned:500,
    exp_required: 2000,
    skills: []
}


const LandingPage = ({handleNav, quests=defaultQuests, user=defaultUser}) => {
    const {name, balance} = user;
    useEffect(() => {
        fetch("/user/123")
            .then((e) => e.json())
            .then(b => console.log(b))
    })

    const [openQuest, setOpenQuest] = useState({})
    const [modalOpen, setModalOpen] = useState(false);
    const handleClick = (q) => {
        setOpenQuest(q);
        setModalOpen(true);
    }
    return (
      <div className="page">
          <Hero
            heroContent={
                <div>
                    <h1>
                        Welcome back, {name}
                    </h1>
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
            <Section section="Profile" onClick={() => handleNav("perks")}>
                <Profile user={user}/>
            </Section>
            <Section section="Quests">
                {quests.map(q => <QuestCard quest={q} key={q.name} handleClick={() => handleClick(q)}/>)}
            </Section>
        </div>
          <QuestModal open={modalOpen} quest={openQuest} handleClose={() => setModalOpen(false)} />
        <BottomNavBar active={"home"} handleNav={handleNav}/>
      </div>
    );
}


export default LandingPage;
