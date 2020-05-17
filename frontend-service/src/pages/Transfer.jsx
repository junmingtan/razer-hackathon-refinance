import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const Transfer = ({ handleNav }) => (
  <div className="page">
    This page will handle the transactions for transferring of money
    <BottomNavBar active={"transfer"} handleNav={handleNav} />
  </div>
);

export default Transfer;
