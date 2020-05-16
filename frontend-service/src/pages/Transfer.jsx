import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const Transfer = ({handleNav}) => (
    <div className="page">
        Transfer Page
        <BottomNavBar active={"transfer"} handleNav={handleNav} />
    </div>
)

export default Transfer
