import React, {useState} from "react";
import BottomNavBar from "../components/BottomNavBar";
import QuestCard, {QuestModal} from "../components/QuestCard";
import Hero from "../components/Hero";
import Section from "../components/Section";

const defaultQuests = [
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
    const inProgress = quests.filter(q => q.progress > 0);
    const newQuests = quests.filter(q => q.progress == 0);
    const [openQuest, setOpenQuest] = useState({})
    return (
    <div className="page">
        <Hero
            backgroundImage={"/hero_quest.jpg"}
            heroContent={
                <div>
                    <h1>{`You have ${inProgress.length} in progress, ${newQuests.length} new quests`}</h1>
                </div>
            }
            navbarContent={
                <div>
                    <p>{`${inProgress.length} in progress, ${newQuests.length} new`}</p>
                </div>
            }
        />
        <div className="content">
            {inProgress.length > 0 ?
                <Section section="In Progress" >
                    {inProgress.map(q => <QuestCard quest={q} handleClick={() => setOpenQuest(q)}/>)}
                </Section> : ""
            }
            {newQuests.length > 0 ?
                <Section section="New" >
                    {newQuests.map(q => <QuestCard quest={q} handleClick={() => setOpenQuest(q)}/>)}
                </Section> : ""
            }
        </div>
        <QuestModal open={!!!!Object.keys(openQuest).length} quest={openQuest} handleClose={() => setOpenQuest({})} />
        <BottomNavBar active={"quests"} handleNav={handleNav} />
    </div>
)}

export default Quests
