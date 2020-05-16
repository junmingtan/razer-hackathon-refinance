import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const History = ({history, handleNav}) => (
    <div className="page">
        History Page
        <BottomNavBar active={"history"} handleNav={handleNav} />
    </div>
)

export default History
