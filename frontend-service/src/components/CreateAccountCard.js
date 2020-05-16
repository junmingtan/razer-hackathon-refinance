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
    handleCreateUser(this.state);
  };

  render() {
    return (
      <div className="createAccountCard__container">
        <div className="createAccountCard" elevation={3}>
          <Grid item className="createAccountCard__header">
            Create a new account
          </Grid>
          <div className="createAccountCard__fnln createAccountCard__fnln--marginRight ">
            <TextField
              label="First Name"
              variant="outlined"
              onChange={this.handleFirstNameChange}
              className="createAccountCard__textField createAccountCard__component"
              value={this.state.firstName}
              size="small"
            />
          </div>
          <div className="createAccountCard__fnln createAccountCard__fnln--marginLeft">
            <TextField
              label="Last Name"
              variant="outlined"
              className="createAccountCard__textField createAccountCard__component"
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
              size="small"
            />
          </div>

          <TextField
            label="Address"
            variant="outlined"
            className="createAccountCard__textField createAccountCard__component"
            onChange={this.handleAddressChange}
            value={this.state.address}
            size="small"
          />

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
            <Button variant="contained" color="secondary">
              Upload NRIC
              <input type="file" style={{ display: "none" }} />
            </Button>
          </div>

          <div className="createAccountCard__component">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit(this.props.handleCreateUser)}
              className="createAccountCard__component"
            >
              Submit
            </Button>
          </div>

          <div
            onClick={() => this.props.handleChangeCard()}
            className="createAccountCard__footer"
          >
            <p>Have an account?</p>
            <p>Log in</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccountCard;
