import React, { Component } from "react";
import CreateAccountCard from "../components/CreateAccountCard";
import LoginCard from "../components/LoginCard";
import { Grid } from "@material-ui/core";

class Home extends Component {
  state = {
    login: true
  };

  handleChangeCard = () => {
    this.setState({ login: !this.state.login });
  };

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
              {this.state.login ? (
                <LoginCard
                  handleChangePage={this.props.handleChangePage}
                  handleChangeCard={this.handleChangeCard}
                />
              ) : (
                <CreateAccountCard
                  handleChangePage={this.props.handleChangePage}
                  handleChangeCard={this.handleChangeCard}
                  handleCreateUser={this.props.handleCreateUser}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
