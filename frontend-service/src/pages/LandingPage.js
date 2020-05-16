import React, { Component } from "react";
import BottomNavBar from "../components/BottomNavBar";

class LandingPage extends Component {

  state = {};
  render() {
    const {handleNav} = this.props;
    return (
      <div>
        <BottomNavBar active={"home"} handleNav={handleNav}/>
      </div>
    );
  }
}

export default LandingPage;
