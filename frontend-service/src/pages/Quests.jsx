import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const Quests = ({quests, handleNav}) => (
    <div className="page">
        Quests Page
        <BottomNavBar active={"quests"} handleNav={handleNav} />
    </div>
)

export default Quests
