import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

class Card extends Component {
  state = {};
  render() {
    //const classes = useStyles();
    //{this.props.id + 1}
    if (this.props.mealCount < 1) {
      return <p></p>;
    }
    return (
      <div class="card">
        <p>
          {this.props.name} who has {this.props.mealCount} meals availible.
        </p>
        <Button
          variant="contained"
          onClick={() =>
            this.props.join(this.props.id)
          } /* class="btn btn-outline-secondary"*/
        >
          Join
        </Button>
      </div>
    );
  }
}

export default Card;
