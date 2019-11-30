import React, { Component } from "react";
class Message extends Component {
  render() {
    //console.log(this.props.sender);
    return (
      <div class="card">
        <p>
          {this.props.senderName}: {this.props.name}
        </p>
      </div>
    );
  }
}

export default Message;
