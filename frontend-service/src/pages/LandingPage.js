import React, { Component } from "react";
import BottomNavBar from "../components/BottomNavBar";
import VisaCard from "../components/VisaCard";
import Profile from '../components/Profile';

import "./LandingPage.css";

class LandingPage extends Component {

  state = {};
  render() {
    const {handleNav} = this.props;
    return (
      <div>
        <div className="content">
            <div className="hero">
                <VisaCard />
            </div>
            <Profile />
        </div>
        <BottomNavBar active={"home"} handleNav={handleNav}/>
      </div>
    );
  }
}

export default LandingPage;
