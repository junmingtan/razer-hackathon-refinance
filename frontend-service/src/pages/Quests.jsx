import React, {useState} from "react";
import BottomNavBar from "../components/BottomNavBar";
import QuestCard, {QuestModal} from "../components/QuestCard";
import Hero from "../components/Hero";
import Section from "../components/Section";
import {IoIosCheckmarkCircleOutline, IoIosBulb, IoMdStopwatch} from 'react-icons/io';

import "./Quests.css"

const defaultQuests = [
    {
        name: "Create account",
        progress: 1,
        criteria: 1,
        exp: 500,
        description: "Hooray, you joined us! It's such a momentous event that it's even helped you clear your first quest!"
    },
    {
        name: "Direct credit your salary",
        progress: 0,
        criteria: 6,
        exp: 500,
        description: "Have you started your career? Congratulations! Let's set up direct credit so that we can keep track of your finances together!"
    },
    {
        name: "Save into fixed deposits",
        progress: 0,
        criteria: 10000,
        exp: 1000,
        description: "You never know when a rainy day will happen. "
    },
    {
        name: "Get married to The One",
        progress: 0,
        criteria: 1,
        exp: 2000,
        description: "Some people think that it's impossible. Others say that there are more than one. " +
            "Whatever it is, you've found your soulmate! Let us celebrate by helping you unlock your next perk!"
    },
];

const Quests = ({quests=defaultQuests, handleNav, handleCollectQuest=() => ""}) => {
    const qs = {
        completed: {
            name: "Completed",
            quests: [],
            icon: IoIosCheckmarkCircleOutline,
        },
        inProgress: {
            name: "In Progress",
            quests: [],
            icon: IoMdStopwatch,
        },
        newQuests: {
            name: "New",
            quests: [],
            icon: IoIosBulb,
        },
        collected: {
            name: "Past Quests",
            quests: [],
            icon: IoIosCheckmarkCircleOutline,
        },
    }
    quests.forEach((q) => {
        if (q.completed) {
            qs.collected.quests.push(q)
        } else {
            if ( q.progress === q.clear_condition) {
                qs.completed.quests.push(q)
            }
            else if ( q.progress > 0 && q.progress !== q.clear_condition) {
                qs.inProgress.quests.push(q)
            }
            else {
                qs.newQuests.quests.push(q)
            }
        }
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
            backgroundImage={"/hero_quest.png"}
            heroContent={
                <div>
                    <h2 style={{marginBottom: "0px"}}>Quests</h2>
                    <span className="quests-status-container">
                        {Object.values(qs).filter(c => c.name !== "Past Quests" && c.quests.length > 0)
                            .map(({name, quests, icon}) => {
                                return (
                                    <div className={"quests-status"}>
                                        <div className={"quests-quantity"}>
                                            {icon()}
                                            <p>{quests.length} </p>
                                        </div>
                                        <p>{name} </p>
                                    </div>
                                )
                            })}
                    </span>
                </div>
            }
            navbarContent={
                <div className={"quests-navbar"}>
                    {
                        Object.values(qs).filter(c => c.name !== "Past Quests" && c.quests.length > 0)
                            .map(({ quests, icon}) => (
                                <div>
                                    {icon()}
                                    <p>{quests.length} </p>
                                </div>
                            ))
                    }
                </div>
            }
        />
        <div className="content">
            {Object.values(qs).filter(cat => cat.quests.length > 0).map(({name, quests}) => (
                <Section section={name} >
                    {quests.map((q, i) => <QuestCard quest={q} key={i} handleClick={() => handleClick(q)}/>)}
                </Section>
            ))}
        </div>
        <QuestModal open={modalOpen} quest={openQuest} handleClose={() => setModalOpen(false)} onCollect={() => {handleCollectQuest(openQuest); setModalOpen(false)}}/>
        <BottomNavBar active={"quests"} handleNav={handleNav} />
    </div>
)}

export default Quests
