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
        <Grid item>home</Grid>
        <Grid item>perks</Grid>
        <Grid item>transfer</Grid>
        <Grid item>quest</Grid>
        <Grid item>history</Grid>
      </Grid>
    );
  }
}

export default BottomNavBar;
