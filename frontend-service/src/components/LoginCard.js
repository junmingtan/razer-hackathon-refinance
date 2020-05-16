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
      <div className="createAccountCard__container">
        <div
          className="createAccountCard createAccountCard--login"
          elevation={3}
        >
          <Grid item className="createAccountCard__header">
            Login
          </Grid>

          <TextField
            label="Email"
            variant="outlined"
            className="createAccountCard__textField createAccountCard__component"
            onChange={this.handleEmailChange}
            value={this.state.email}
            size="small"
          />

          <TextField
            label="Password"
            variant="outlined"
            className="createAccountCard__textField createAccountCard__component"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            size="small"
          />

          <div className="createAccountCard__component">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
          <div className="createAccountCard__component">
            <div
              onClick={() => this.props.handleChangeCard()}
              className="createAccountCard__footer"
            >
              <p>Create an account</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginCard;
