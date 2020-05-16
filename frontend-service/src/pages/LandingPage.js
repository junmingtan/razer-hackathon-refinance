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
    name: "Shin Chan"
}

const LandingPage = ({handleNav, quests=defaultQuests, user: {name}=defaultUser}) => {
    const ref = useRef();
    useEffect(() => {
        document.onscroll = (e) => setOffset(document.scrollingElement.scrollTop * 1)
    })
    const [offset, setOffset] = useState(0);
    return (
      <div className="page" ref={ref}>
          <div className="hero">
              {/*<VisaCard />*/}
              <div className="hero-content" style={{marginTop: `${offset}px`}}>
                  <h1>
                      Welcome back, {name}
                  </h1>
              </div>
          </div>
        <div className="content" style={{height: "200vh"}}>
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
