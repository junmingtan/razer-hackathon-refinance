import React, { Component } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import "./CreateAccountCard.css";

// TODO: Handle post request for handleSubmit

class CreateAccountCard extends Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: ""
  };

  handleFirstNameChange = e => {
    const firstName = e.target.value;
    this.setState({ firstName });
  };

  handleLastNameChange = e => {
    const lastName = e.target.value;
    this.setState({ lastName });
  };

  handleAddressChange = e => {
    const address = e.target.value;
    this.setState({ address });
  };
  handleEmailChange = e => {
    const email = e.target.value;
    this.setState({ email });
  };
  handlePasswordChange = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleSubmit = handleCreateUser => {
    handleCreateUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
  };

  render() {
    return (
      <Paper className="createAccountCard" elevation={3}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item className="createAccountCard__header">
            Create a new account
          </Grid>

          <Grid item xs={12} className="createAccountCard__textField">
            <TextField
              label="First Name"
              variant="outlined"
              className="createAccountCard__textField"
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
            />
          </Grid>

          <Grid item xs={12} className="createAccountCard__textField">
            <TextField
              label="Last Name"
              variant="outlined"
              className="createAccountCard__textField"
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
            />
          </Grid>

          <Grid item xs={12} className="createAccountCard__textField">
            <TextField
              label="Address"
              variant="outlined"
              className="createAccountCard__textField"
              onChange={this.handleAddressChange}
              value={this.state.address}
            />
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
            <Button variant="contained" color="secondary">
              Upload NRIC
              <input type="file" style={{ display: "none" }} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit(this.props.handleCreateUser)}
            >
              Submit
            </Button>
          </Grid>

          <Grid item>
            <div
              onClick={() => this.props.handleChangeCard()}
              className="createAccountCard__footer"
            >
              <p>Have an account?</p>
              <p>Log in</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default CreateAccountCard;
