import React, { Component } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { homePageTheme } from "./themes/theme";
import "./App.css";

// Pages to render
import Home from "./pages/Home";
import Perks from "./pages/Perks";
import LandingPage from "./pages/LandingPage";
import Quests from "./pages/Quests";
import Transfer from "./pages/Transfer";
import History from "./pages/History";

// Sample user level
class App extends Component {
  state = {
    // Sets which page is to be rendered
    page: "perks",
    user: ""
  };

  handleGetUserById = client_id => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };
    fetch("/user/" + client_id, requestOptions)
      .then(e => e.json())
      .then(user => {
        this.setState({ user });
        if (this.state.user != "") {
          this.setState({ page: "home" });
        }
      })
      .catch(err => console.log(err));
  };

  handleCreateUser = ({ firstName, lastName }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName
      })
    };
    fetch("/user/create", requestOptions)
      .then(e => e.json())
      .then(client_id => this.handleGetUserById(client_id))
      .catch(err => console.log(err));
  };

  handleChangePage = page => {
    this.setState({ page });
  };
  renderPage = page => {
    switch (page) {
      default:
        return (
          <Home
            handleCreateUser={this.handleCreateUser}
            handleChangePage={this.handleChangePage}
          />
        );
      case "home":
        return <LandingPage handleNav={this.handleChangePage} />;
      case "perks":
        return (
          <Perks
            skillPoints={2}
            userLevel={2}
            handleNav={this.handleChangePage}
          />
        );
      case "quests":
        return <Quests handleNav={this.handleChangePage} />;
      case "transfer":
        return <Transfer handleNav={this.handleChangePage} />;
      case "history":
        return <History handleNav={this.handleChangePage} />;
    }
  };
  render() {
    return (
      <React.Fragment>
        <StylesProvider injectFirst>
          <ThemeProvider theme={homePageTheme}>
            {this.renderPage(this.state.page)}
          </ThemeProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default App;
