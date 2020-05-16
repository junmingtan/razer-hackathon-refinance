import React, { Component } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { homePageTheme } from "./themes/theme";
import "./App.css";

// Pages to render
import Home from "./pages/Home";
import Perks from "./pages/Perks";
import LandingPage from "./pages/LandingPage";

class App extends Component {
  state = {
    // Sets which page is to be rendered
    page: "perks"
  };

  handleChangePage = page => {
    this.setState({ page });
  };
  renderPage = page => {
    switch (page) {
      default:
        return <Home handleChangePage={this.handleChangePage} />;
      case "landing page":
        return <LandingPage handleNav={this.handleChangePage} />;
      case "perks":
        return <Perks handleNav={this.handleChangePage} />;
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
