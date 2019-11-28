import React, { Component } from "react";
class Message extends Component {
  render() {
    return (
      <div class="card">
        <p>
          {this.props.sender}: {this.props.name}
        </p>
      </div>
    );
  }
}

export default Message;
