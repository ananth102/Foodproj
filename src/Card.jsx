import React, { Component } from "react";
class Card extends Component {
  state = {};
  render() {
    return (
      <div class="card">
        <p>
          {this.props.id + 1} {this.props.name} {this.props.mealCount}
        </p>
        <button
          onClick={() =>
            this.props.join(this.props.id)
          } /* class="btn btn-outline-secondary"*/
        >
          Join
        </button>
      </div>
    );
  }
}

export default Card;
