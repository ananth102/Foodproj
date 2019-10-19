import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Card extends Component {
  state = {};
  render() {
    return (
      <div class="card">
        <p>
          {this.props.id + 1} {this.props.name} {this.props.mealCount}
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
