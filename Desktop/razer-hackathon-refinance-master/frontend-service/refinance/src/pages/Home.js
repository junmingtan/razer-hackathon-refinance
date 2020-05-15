import React, { Component } from "react";
import CreateAccountCard from "../components/CreateAccountCard";
import { Grid } from "@material-ui/core";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Grid container direction="row" className="home">
          <Grid item md={7} xs={12}></Grid>
          <Grid
            item
            direction="row"
            justify="center"
            container
            md={5}
            xs={12}
            className="home__card"
          >
            <Grid item>
              <CreateAccountCard />
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
