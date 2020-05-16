import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Theme for the home page
 */
export const homePageTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#5D5C61"
    },
    secondary: {
      main: "#379683"
    },
    c1: "#5D5C61",
    c2: "#379683",
    c3: "#7395AE",
    c4: "#557A95",
    c5: "#B1A296"
  },
  status: {
    danger: "orange"
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});
