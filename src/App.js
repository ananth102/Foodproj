import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cardlist from "./Cardlist";
import * as firebase from "firebase";
import Card from "@material-ui/core/Card";
import "firebase/database";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import MessageList from "./MessageList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FeederScreen from "./FeederScreen";
import SelectInput from "@material-ui/core/Select/SelectInput";

let app;
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const SampleCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <h2>woof</h2>
    </Card>
  );
};
class App extends Component {
  state = {
    firebasekey: {
      apiKey: "AIzaSyD1BQ58eBwNIVEQfCCQNxZ6yLURJ7t2LiI",
      authDomain: "foodproj-ebc7c.firebaseapp.com",
      databaseURL: "https://foodproj-ebc7c.firebaseio.com",
      projectId: "foodproj-ebc7c",
      storageBucket: "foodproj-ebc7c.appspot.com",
      messagingSenderId: "870955468156",
      appId: "1:870955468156:web:2b21089fedfa9dc34b10f9"
    },

    // firebasekey: {
    //   apiKey: "AIzaSyCP6jCJss6UtTtUBL9fof3375Tg9ZIPV5k",
    //   authDomain: "stock-portfolio-135dc.firebaseapp.com",
    //   databaseURL: "https://stock-portfolio-135dc.firebaseio.com",
    //   projectId: "stock-portfolio-135dc",
    //   storageBucket: "",
    //   messagingSenderId: "889470241430",
    //   appId: "1:889470241430:web:635e00fb02026d9b"
    // },
    feeders: [],
    curr: 0,
    viewMode: true,
    currentElem: -1,
    currentMessages: [],
    currentMessageInBox: "",
    app: null,
    connected: false,
    feederScreen: false,
    name: ""
  };

  render() {
    //console.log(classes;

    if (this.state.curr == 0) {
      console.log("meow");
      this.init();
    }
    console.log(this.state.currentMessages);
    if (this.state.viewMode && !this.state.feederScreen) {
      return (
        <div>
          <h1>Welcome to FoodProj</h1>
          <h3>
            You can pair up with any of these guys or feed a student yourself.
          </h3>

          <Button
            text-align="center"
            margin="0 auto"
            variant="contained"
            color="primary"
            onClick={this.becomeaFeeder}
          >
            Become a feeder
          </Button>
          <h6></h6>
          <h3>Before pairing up we would like to know your name.</h3>

          <Cardlist
            feeders={this.state.feeders}
            onClick={this.join}
            join={this.join}
          ></Cardlist>
        </div>
      );
    } else if (!this.state.feederScreen) {
      console.log(this.state.currentElem);
      console.log();
      /*{this.state.currentMessages}*/
      this.getMessages(this.state.currentElem);
      return (
        <div>
          <h1>
            Welcome to the Chatroom, You are paired up with{" "}
            {this.state.feeders[this.state.currentElem].name}
          </h1>
          <React.Fragment>
            {/* <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
              </CardContent>
            </Card> */}
            <SampleCard />
            <ul id="messageArea">
              <MessageList messages={this.state.currentMessages} />{" "}
            </ul>
            <TextField
              type="text"
              //onChange={this.props.onChange}
              name="name"
              class="question"
              id="nme"
              required
              autocomplete="off"
              onChange={this.userChange}
            />
            <label for="nme">
              <span></span>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.sendMessage(
                  this.state.currentElem,
                  this.state.currentMessageInBox
                )
              }
            >
              send
            </Button>
          </React.Fragment>
        </div>
      );
    } else {
      return (
        <div>
          <FeederScreen />
        </div>
      );
    }
  }
  //adds a new feeder to the element
  addFeeder = (nam, i, loc, mCount, a) => {
    let feeders = this.state.feeders; //[...this.state.feeders];
    console.log(feeders);
    let curr = this.state.curr + 1;
    feeders.push({
      name: nam,
      id: curr,
      location: loc,
      mealCount: mCount,
      active: a
    });

    this.setState({ curr });
    this.setState({ feeders });
  };

  init = () => {
    /* get data from firebae */
    console.log("in init");
    if (!this.state.connected) {
      app = firebase.initializeApp(this.state.firebasekey);
      this.setState({ app });
      let connected = true;
      this.setState({ connected });
      console.log("connected");
    }

    let database = firebase.database();
    let dat;
    database
      .ref("feeders")
      .once("value")
      .then(snapshot => {
        dat = snapshot.val();
        //let feeders = dat;
        //this.setState({fee})
        //SelectInput()
      });

    sleep(200).then(() => {
      console.log("Getting feeders", dat);
      if (dat === undefined) {
        sleep(500).then(() => {
          //console.log(dat);
          if (dat === undefined) {
            this.addFeeder("Koda", 1, "berk", 15, true);
            this.addFeeder("Cooper", 2, "woosta", 13, true);

            database.ref("feeders").update({
              feeders: this.state.feeders
            });
          } else {
            console.log(dat);
            let feeders = dat.feeders;
            this.setState({ feeders });
            let curr = feeders.length;
            this.setState({ curr });
          }
        });

        //console.log(this.state.feeders);
      } else {
        console.log(dat);
        let feeders = dat.feeders;
        this.setState({ feeders });
        let curr = feeders.length;
        this.setState({ curr });
      }
      //console.log("passed");
    });
  };

  join = elem => {
    let viewMode = false;
    let currentElem = elem;
    this.setState({ viewMode });
    this.setState({ currentElem });
  };
  //Gets messages from firebase database or just creates a new id
  getMessages = id => {
    if (!this.state.connected) {
      app = firebase.initializeApp(this.state.firebasekey);
      this.setState({ app });
      let connected = true;
      this.setState({ connected });
      console.log("connected");
    }
    let database = firebase.database();
    let currentMessages;
    database
      .ref("test/" + id)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() !== null) {
          currentMessages = snapshot.val().messages;
          //console.log(messages);

          if (currentMessages !== null) {
            console.log("updated");
            this.setState({ currentMessages });
            //console.log(this.state.stocks.stock);
          } else {
            this.createNewId(database);
          }
        }
      });
  };

  createNewId = (database, id) => {
    database.ref("test/" + id).set({
      messages: null
    });
  };

  sendMessage = id => {
    //console.log(message);
    if (!this.state.connected) {
      app = firebase.initializeApp(this.state.firebasekey);
      this.setState({ app });
      let connected = true;
      this.setState({ connected });
      console.log("connected");
    }
    //console.log(app);
    let database = app.database();

    let currentMessages = this.state.currentMessages;
    //console.log(this.state.currentMessageInBox);
    currentMessages.push({
      message: "You :" + this.state.currentMessageInBox,
      senderName: "foodneeder"
    });
    this.setState({ currentMessages });
    database.ref("test/" + id).update({
      messages: this.state.currentMessages
    });
  };
  userChange = message => {
    let value = message.target.value;
    this.setState({ currentMessageInBox: value });
  };

  //formatMessages = () => {};
  becomeaFeeder = () => {
    let feederScreen = true;
    this.setState({ feederScreen });
  };

  namePrompt() {
    return (
      <div>
        <TextField onChange="" label="Name"></TextField>
        <Button variant="contained" color="primary">
          Submit Name
        </Button>
      </div>
    );
  }
}

//   useStyles = () => {
//     return makeStyles({
//       card: {
//         minWidth: 275
//       },
//       bullet: {
//         display: "inline-block",
//         margin: "0 2px",
//         transform: "scale(0.8)"
//       },
//       title: {
//         fontSize: 14
//       },
//       pos: {
//         marginBottom: 12
//       }
//     });
//   };
// }

export default App;
