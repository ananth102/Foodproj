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

let app;
let useStyles;
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
    feederScreen: false
  };

  render() {
    const classes = this.useStyles();

    if (this.state.curr == 0) {
      this.addFeeder("Koda", 1, "berk", 15, true);
      this.addFeeder("Cooper", 2, "woosta", 13, true);
    }
    console.log(this.state.currentMessages);
    if (this.state.viewMode && !this.state.feederScreen) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.becomeaFeeder}
          >
            Become a feeder
          </Button>
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
            <Card className={classes.card}>
              <CardContent>woof</CardContent>
            </Card>
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
          <h1>Welcome to the feeder Screen</h1>
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

  useStyles = () => {
    return makeStyles({
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
  };
}

export default App;
