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

/**
 * TODO
 * Commit 1
 * almost there just fix the way currentelement is handled
 * refractor code before uploading to github
 *
 * Commit 2
 * Simple Login system will be added for feeders
 * more refractoring
 *
 * Commit 3
 * Big ui improvements
 * big refractoring of chat screen by making it its own component
 *
 * Commit 4
 * Improve the way data is stored
 * possibly integrate redux
 *
 * Commit 5x plus
 * extra flex features
 */

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
      <h2></h2>
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
    currentElem: -1, //convo id
    currentMessages: [],
    currentMessageInBox: "",
    app: null,
    connected: false,
    feederScreen: false,
    name: "",
    feederScreenInput: { name: "", din: "" }
  };

  render() {
    //console.log(classes;
    console.log(this.state.viewMode);
    if (this.state.curr == 0) {
      this.init();
    }
    //console.log(this.state.currentMessages);
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
            {this.state.feeders[this.state.currentElem - 1].name}
          </h1>
          <React.Fragment>
            <ul id="messageArea">
              <MessageList messages={this.state.currentMessages} />{" "}
            </ul>
            <div style={{ display: "inline-block" }}>
              <TextField
                type="text"
                //onChange={this.props.onChange}
                name="name"
                class="question"
                id="nme"
                required
                autocomplete="off"
                onChange={this.userChange}
                style={{ margin: "0px 90px" }}
                inline
              />
              <label for="nme">
                <span></span>
              </label>
              <Button
                variant="contained"
                inline
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
            </div>
          </React.Fragment>
        </div>
      );
    } else if (!this.state.viewMode) {
      return (
        <div>
          <FeederScreen
            name={this.onFeederScreenChange}
            diningHall={this.onFeederScreenChange2}
            oc={this.onFeederScreenClick}
          />
        </div>
      );
    } else {
      //We know that this is the feeder's chat view
      //if student is here return chat

      window.setInterval(() => {
        this.getMessages(this.state.currentElem);
        console.log(this.state.currentElem);
        console.log("message_length", this.state.currentMessages.length);
        if (this.state.currentMessages.length != 0) {
          return (
            <div>
              <h1>
                Welcome to the Chatroom, You paired up with a student
                {this.state.feeders[this.state.currentElem - 1].name}
              </h1>
              <React.Fragment>
                <ul id="messageArea">
                  <MessageList messages={this.state.currentMessages} />{" "}
                </ul>
                <div style={{ display: "inline-block" }}>
                  <TextField
                    type="text"
                    //onChange={this.props.onChange}
                    name="name"
                    class="question"
                    id="nme"
                    required
                    autocomplete="off"
                    onChange={this.userChange}
                    style={{ margin: "0px 90px" }}
                    inline
                  />
                  <label for="nme">
                    <span></span>
                  </label>
                  <Button
                    variant="contained"
                    inline
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
                </div>
              </React.Fragment>
            </div>
          );
        } else {
          return <h1>Waiting for student</h1>;
        }
      }, 1000);
    }
    if (this.state.viewMode && this.state.feederScreen) {
      if (this.state.currentMessages.length != 0) {
        return (
          <div>
            <h1>
              Welcome to the Chatroom, You paired up with a student
              {this.state.feeders[this.state.currentElem - 1].name}
            </h1>
            <React.Fragment>
              <ul id="messageArea">
                <MessageList messages={this.state.currentMessages} />{" "}
              </ul>
              <div style={{ display: "inline-block" }}>
                <TextField
                  type="text"
                  //onChange={this.props.onChange}
                  name="name"
                  class="question"
                  id="nme"
                  required
                  autocomplete="off"
                  onChange={this.userChange}
                  style={{ margin: "0px 90px" }}
                  inline
                />
                <label for="nme">
                  <span></span>
                </label>
                <Button
                  variant="contained"
                  inline
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
              </div>
            </React.Fragment>
          </div>
        );
      } else {
        return <h1>Waiting for student</h1>;
      }
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
    let conn = false;
    /* get data from firebae */

    console.log("in init");
    if (!this.state.connected) {
      app = firebase.initializeApp(this.state.firebasekey);
      this.setState({ app });
      let connected = true;
      this.setState({ connected });
      //console.log("connected");
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

    setTimeout(() => {
      if (dat === undefined || dat === null) {
        sleep(100).then(() => {
          //console.log(dat);
          if (dat === undefined || dat == null) {
            //this.addFeeder("Koda", 1, "berk", 15, true);
            this.addFeeder("Cooper", 2, "woosta", 13, true);

            database.ref("feeders").update({
              feeders: this.state.feeders
            });
            return;
          } else {
            // console.log(dat);
            let feeders = dat.feeders;
            this.setState({ feeders });
            let curr = feeders.length;
            this.setState({ curr });
            return;
          }
        });

        //console.log(this.state.feeders);
      } else {
        console.log(dat);
        let feeders = dat.feeders;
        this.setState({ feeders });
        let curr = feeders.length;
        this.setState({ curr });
        return;
      }
    }, 1000);
  };

  join = elem => {
    let viewMode = false;
    let currentElem = elem + 1;
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
      //console.log("connected");
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
      //console.log("connected");
    }
    //console.log(app);
    let database = app.database();

    let currentMessages = this.state.currentMessages;
    //console.log(this.state.currentMessageInBox);
    let sendN = this.state.feederScreen
      ? this.state.feederScreenInput.name
      : "student";
    currentMessages.push({
      message: this.state.currentMessageInBox,
      senderName: sendN
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
    let viewMode = false;
    this.setState({ viewMode });
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
  hashCode = function(s) {
    return s.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  onFeederScreenChange = event => {
    //console.log(event.target.value);
    let feederScreenInput = {
      name: event.target.value,
      din: this.state.feederScreenInput.din
    };
    this.setState({ feederScreenInput });
  };
  onFeederScreenChange2 = event => {
    //console.log(event.target.value);
    let feederScreenInput = {
      name: this.state.feederScreenInput.name,
      din: event.target.value
    };
    this.setState({ feederScreenInput });
    //console.log(feederScreenInput);
  };
  onFeederScreenClick = () => {
    /*
    Pushes a new feeder to firebae
    //change interface to chat ->
      -> Work on chat interface first
    */
    let database = firebase.database();
    this.addFeeder(
      this.state.feederScreenInput.name,
      this.state.curr++,
      this.state.feederScreenInput.din,
      5,
      true
    );
    database.ref("feeders").update({
      feeders: this.state.feeders
    });
    let viewMode = true;
    let currentElem = this.state.curr;
    this.setState({ viewMode });
    this.setState({ currentElem });
  };

  getChatView = () => {
    return (
      <div>
        <h1>
          Welcome to the Chatroom, You are paired up with{" "}
          {this.state.feeders[this.state.currentElem].name}
        </h1>
        <React.Fragment>
          <ul id="messageArea">
            <MessageList messages={this.state.currentMessages} />{" "}
          </ul>
          <div style={{ display: "inline-block" }}>
            <TextField
              type="text"
              //onChange={this.props.onChange}
              name="name"
              class="question"
              id="nme"
              required
              autocomplete="off"
              onChange={this.userChange}
              style={{ margin: "0px 90px" }}
              inline
            />
            <label for="nme">
              <span></span>
            </label>
            <Button
              variant="contained"
              inline
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
          </div>
        </React.Fragment>
      </div>
    );
  };
}

export default App;
