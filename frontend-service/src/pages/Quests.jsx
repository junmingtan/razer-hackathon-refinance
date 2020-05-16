import React from "react";
import BottomNavBar from "../components/BottomNavBar";
import QuestCard from "../components/QuestCard";

const Quests = ({quests=[], handleNav}) => (
    <div className="page">
        {quests.map(q => <QuestCard quest={q} /> )}
        <BottomNavBar active={"quests"} handleNav={handleNav} />
    </div>
)

export default Quests
