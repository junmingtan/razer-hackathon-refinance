import React, {useState} from "react";
import BottomNavBar from "../components/BottomNavBar";
import QuestCard, {QuestModal} from "../components/QuestCard";
import Hero from "../components/Hero";
import Section from "../components/Section";

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
        progress: 2,
        criteria: 6,
        exp: 500,
        description: "Have you started your career? Congratulations! Let's set up direct credit so that we can keep track of your finances together!"
    },
    {
        name: "Save into fixed deposits",
        progress: 2200,
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

const Quests = ({quests=defaultQuests, handleNav}) => {
    const qs = {
        completed: [],
        inProgress: [],
        newQuests: [],
        collected: []
    }
    quests.forEach((q) => {
        if (q.completed) {
            qs.collected.push(q)
        } else {
            if ( q.progress === q.criteria) {
                qs.completed.push(q)
            }
            if ( q.progress > 0 && q.progress !== q.criteria) {
                qs.inProgress.push(q)
            }
            if ( q.progress === 0) {
                qs.newQuests.push(q)
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
            backgroundImage={"/hero_quest.jpg"}
            heroContent={
                <div>
                    <h1>{`You have ${qs.inProgress.length} in progress, ${qs.newQuests.length} new quests`}</h1>
                </div>
            }
            navbarContent={
                <div>
                    <p>{`${qs.inProgress.length} in progress, ${qs.newQuests.length} new`}</p>
                </div>
            }
        />
        <div className="content">
            {qs.completed.length > 0 ?
                <Section section="Completed" >
                    {qs.completed.map(q => <QuestCard quest={q} handleClick={() => handleClick(q)}/>)}
                </Section> : ""
            }
            {qs.inProgress.length > 0 ?
                <Section section="In Progress" >
                    {qs.inProgress.map(q => <QuestCard quest={q} handleClick={() => handleClick(q)}/>)}
                </Section> : ""
            }
            {qs.newQuests.length > 0 ?
                <Section section="New" >
                    {qs.newQuests.map(q => <QuestCard quest={q} handleClick={() => handleClick(q)}/>)}
                </Section> : ""
            }
            {qs.collected.length > 0 ?
                <Section section="History" >
                    {qs.collected.map(q => <QuestCard quest={q} handleClick={() => handleClick(q)}/>)}
                </Section> : ""
            }
        </div>
        <QuestModal open={modalOpen} quest={openQuest} handleClose={() => setModalOpen(false)} />
        <BottomNavBar active={"quests"} handleNav={handleNav} />
    </div>
)}

export default Quests
