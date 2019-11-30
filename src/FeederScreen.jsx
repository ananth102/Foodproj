import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";

class FeederScreen extends Component {
  render() {
    //render feederscreen or chat

    return (
      <React.Fragment>
        <h1>Welcome to the feeder Screen</h1>
        <TextField onChange={this.props.name} label="Name"></TextField>
        <TextField
          onChange={this.props.diningHall}
          label="Prefered Dining Hall"
        ></TextField>
        <h1></h1>
        <Button onClick={this.props.oc} variant="contained" color="Secondary">
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default FeederScreen;
