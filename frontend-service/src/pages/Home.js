import React, { Component } from "react";
import CreateAccountCard from "../components/CreateAccountCard";
import LoginCard from "../components/LoginCard";
import "./Home.css";

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
        <div className="home">
          {this.state.login ? (
            <LoginCard
                handleLogin={this.props.handleLogin}
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
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
