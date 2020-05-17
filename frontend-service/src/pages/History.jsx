import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const History = ({ history, handleNav }) => (
  <div className="page">
    This page will show you all transaction history
    <BottomNavBar active={"history"} handleNav={handleNav} />
  </div>
);

export default History;
