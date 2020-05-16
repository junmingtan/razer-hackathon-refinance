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


const serverQuests = [
  {
    name: "Create account",
    progress: 1,
    clear_condition: 1,
    exp: 500,
    description: "Hooray, you joined us! It's such a momentous event that it's even helped you clear your first quest! " +
        "If you level up, you can use your skill point to pick a perk in the perks page.",
    "qid": 0
  },
  {
    "clear_condition": 6,
    "description": null,
    "exp": 500,
    "name": "Direct credit your salary",
    "qid": 1
  },
  {
    "clear_condition": 2200,
    "description": null,
    "exp": 1000,
    "name": "Save into fixed deposits",
    "qid": 2
  },
  {
    "clear_condition": 100,
    "description": null,
    "exp": 100,
    "name": "Spend on dining",
    "qid": 3
  },
  {
    "clear_condition": 100,
    "description": null,
    "exp": 100,
    "name": "Spend on dining",
    "qid": 4
  },
  {
    "clear_condition": 150,
    "description": null,
    "exp": 200,
    "name": "Spend on retail",
    "qid": 5
  },
  {
    "clear_condition": 500,
    "description": null,
    "exp": 1000,
    "name": "Spend on travel",
    "qid": 6
  },
  {
    "clear_condition": 800,
    "description": "Reach $10,000 as savings in your account at any one time to clear this quest",
    "exp": 10000,
    "name": "Have $10,000 in your account",
    "qid": 7
  }
]

const defaultQuests =


    [
  {
    name: "Create account",
    progress: 1,
    criteria: 1,
    exp: 500,
    description: "Hooray, you joined us! It's such a momentous event that it's even helped you clear your first quest!"
  },
  {
    name: "Direct credit your salary",
    progress: 0,
    criteria: 6,
    exp: 500,
    description: "Have you started your career? Congratulations! Let's set up direct credit so that we can keep track of your finances together!"
  },
  {
    name: "Save into fixed deposits",
    progress: 0,
    criteria: 10000,
    exp: 1000,
    description: "You never know when a rainy day will happen. "
  },
  {
    name: "Get married to The One",
    progress: 0,
    criteria: 1,
    exp: 2000,
    description: "Some people think that it's impossible. Others say that there are more than one. " +
        "Whatever it is, you've found your soulmate! Let us celebrate by helping you unlock your next perk!"
  },
];


// Sample user level
class App extends Component {
  state = {
    // Sets which page is to be rendered
    page: "",
    user: {},
    account: {},
    quests: [],
    userId: "",
    accountId: ""
  };

  updateUserAndAccount = (mambuid) => {
      const mambuuser = fetch("/user/" + mambuid)
          .then((r) => r.json());
      const account = fetch("/accounts/" + mambuid)
          .then(r => r.json())
          .then(a => a[0]);
      const quests = fetch("/quest/" + mambuid)
          .then(r => r.json())
    return Promise.all([mambuuser, account, quests])
        .then(([mambuuser, account, quests]) => {
            const {firstName, lastName} = mambuuser;
            const {balance} = account;

          const user = {
            level: 0,
            title: "Beginner",
            exp_earned: 0,
            exp_required: 500,
            skills: [],
            quests: serverQuests.map(q => {
              const uqs = quests.filter(uq => uq.qid === q)
              if (uqs.length === 1) {
                return Object.assign(q, uqs[0])
              } else {
                return q
              }
            }),
            balance, firstName, lastName
          }
          this.setState({user, quests: serverQuests})
        })
        .catch(e => console.log(e))
  }

  componentWillMount() {
    fetch("/quest", {"mode": "no-cors"})
        .then(r => r.text()).then(r => console.log(r))
    fetch("/quest")
        .then(r => r.json())
        .then(q => {
          const want = q.reduce((a, c) => {
            a[c.qid] = c;
            return a;
          }, {});
          this.setState({
            questList: want
          });
        })
        .catch(e => console.log(e));
  }

  handleCollectQuest = (quest) => {
    let {quests, user} = this.state;
    let q = quests.filter(q => q.name !== quest.name)
    quest.completed = true;
    q.push(quest)
    user.exp_earned += quest.exp;
    this.setState({quests: q, user})
  }

  handleLogin = (login) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    };
    fetch("/login" , requestOptions)
      .then(e => e.json())
      .then(({firstname, lastname, mambuid}) => {
        this.updateUserAndAccount(mambuid).then(() => this.handleChangePage("home"))
      })
      .catch(err => console.log(err));
  };

  handleCreateUser = ({ firstName, lastName, email, password }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password,
      })
    };
    fetch("/user/create", requestOptions)
      .then(e => e.json())
      .then(({mambuid, success}) => {
        this.setState({userId: mambuid})
        return mambuid
      })
      .catch(err => console.log(err))
        .then(mambuid => {
            this.updateUserAndAccount(mambuid).then(() => this.handleChangePage("home"))
        });
  };

  handleChangePage = page => {
    window.scroll(0,0);
    this.setState({ page });
  };
  renderPage = page => {
    const {user, quests} = this.state;
    switch (page) {
      default:
        return (
          <Home
              handleLogin={this.handleLogin}
            handleCreateUser={this.handleCreateUser}
            handleChangePage={this.handleChangePage}
          />
        );
      case "home":
        return <LandingPage
            handleNav={this.handleChangePage}
            user={user}
            quests={quests}
            handleCollectQuest={this.handleCollectQuest}
        />;
      case "perks":
        return (
          <Perks
            skillPoints={2}
            userLevel={2}
            handleNav={this.handleChangePage}
          />
        );
      case "quests":
        return <Quests
            handleNav={this.handleChangePage}
            handleCollectQuest={this.handleCollectQuest}
            quests={this.state.user.quests}
        />;
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
