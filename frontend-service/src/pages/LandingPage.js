import React, {Component, useEffect, useRef, useState} from "react";
import BottomNavBar from "../components/BottomNavBar";
import VisaCard from "../components/VisaCard";
import Profile from '../components/Profile';

import "./LandingPage.css";
import ProgressBar from "../components/ProgressBar";

const Section = ({section, children}) => (
    <div className="section">
        <h2>{section}</h2>
        {children}
    </div>
);

const defaultQuests = [
    {name: "Direct credit your salary", progress: 2, criteria: 6, exp: 500},
    {name: "Save into fixed deposits", progress: 2200, criteria: 10000, exp: 1000},
    ];

const defaultUser = {
    name: "Shin Chan",
    balance: 5683
}

let travel;

function calcFadeIn(offsetHeight, bottom) {
    const bar_height = 40
    if (!travel) {
        travel = offsetHeight - bar_height;
    }
    const progress = (travel - (bottom * 2)) / (travel / 2)
    return Math.min(1, progress)
}


const LandingPage = ({handleNav, quests=defaultQuests, user: {name, balance}=defaultUser}) => {
    const ref = useRef()
    useEffect(() => {
        document.onscroll = (e) => {
            const bottom = ref.current.getBoundingClientRect().bottom
            setFadeOut(ref.current.offsetHeight - bottom)
            setFadeIn( calcFadeIn(ref.current.offsetHeight, bottom))
        }
    })
    const [fadeOut, setFadeOut] = useState(0);
    const [fadeIn, setFadeIn] = useState(0);
    return (
      <div className="page">
          <div className="hero" ref={ref}>
              {/*<VisaCard />*/}
              <div className="hero-content" style={{marginTop: `${fadeOut}px`, opacity: `${Math.max(0, 1 - (fadeOut / 100))}`}}>
                  <h1>
                      Welcome back, {name}
                  </h1>
                  <p>${balance}</p>
              </div>
          </div>
          <div className="top_bar" style={{opacity: `${fadeIn}`}}>
              <div style={{marginLeft: `${20 - (fadeIn - 0.5) * 2 * 10}px`}}>
                  <p>${name}</p>
                  <p>${balance}</p>
              </div>
          </div>
        <div className="content">
            <Section section="Profile">
                <Profile />
            </Section>
            <Section section="Quests">
                {quests.map(({name, criteria, progress, exp}) => (
                    <div className="quest card" key={name}>
                        <div className="header">
                            <p>{name}</p>
                            <p>{exp} EXP</p>
                        </div>
                        <p className="fulfilled">Completed: {progress} of {criteria}</p>
                        <ProgressBar frontColor="#7BC415FF" backColor="#AEFF0088" progress={progress / criteria * 100} />
                    </div>
                ))}
            </Section>
        </div>
        <BottomNavBar active={"home"} handleNav={handleNav}/>
      </div>
    );
}

export default LandingPage;
