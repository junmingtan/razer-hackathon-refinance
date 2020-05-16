import React, { Component } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";

class LoginCard extends Component {
  state = {
    email: "",
    password: ""
  };

  handleEmailChange = e => {
    const email = e.target.value;
    this.setState({ email });
  };
  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleSubmit = () => {
    // if authenticated

    this.props.handleChangePage("landing page");
    // else
    // display error
  };

  render() {
    return (
      <Paper
        className="createAccountCard createAccountCard--login"
        elevation={3}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item className="createAccountCard__header">
            Login
          </Grid>

          <Grid item xs={12} className="createAccountCard__textField">
            <TextField
              label="Email"
              variant="outlined"
              className="createAccountCard__textField"
              onChange={this.handleEmailChange}
              value={this.state.email}
            />
          </Grid>
          <Grid item xs={12} className="createAccountCard__textField">
            <TextField
              label="Password"
              variant="outlined"
              className="createAccountCard__textField"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <div
              onClick={() => this.props.handleChangeCard()}
              className="createAccountCard__footer"
            >
              <p>Create an account</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default LoginCard;
