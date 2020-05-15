import React, { Component } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { homePageTheme } from "./themes/theme";

import "./App.css";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <StylesProvider injectFirst>
          <ThemeProvider theme={homePageTheme}>
            <Home />
          </ThemeProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default App;
