import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "./BottomNavBar.css";

class BottomNavBar extends Component {
  state = {};
  render() {
    return (
      <Grid
        alignItems="flex-end"
        justify="space-around"
        container
        direction="row"
        className="bottomNavBar"
      >
        <Grid className="bottomNavBar__item">
          <span>home</span>
        </Grid>
        <Grid className="bottomNavBar__item">perks</Grid>
        <Grid className="bottomNavBar__item">transfer</Grid>
        <Grid className="bottomNavBar__item">quest</Grid>
        <Grid className="bottomNavBar__item">history</Grid>
      </Grid>
    );
  }
}

export default BottomNavBar;
