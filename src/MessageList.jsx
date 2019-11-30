import React, { Component } from "react";

import Message from "./Message";
class MessageList extends Component {
  render() {
    // console.log(this.props.mes)
    return (
      <div class="container">
        <div class="coloumn">{this.setNumberMessages()}</div>
      </div>
    );
  }
  setNumberMessages = () => {
    let cardsN = [];
    //console.log("stock len", this.props.stocks.length);
    console.log(this.props.messages);
    if (this.props.messages != null) {
      for (let c = 0; c < this.props.messages.length; c++) {
        cardsN.push(
          <Message
            key={c}
            id={c}
            Message={Message}
            senderName={this.props.messages[c].senderName}
            //   onChange={this.props.onChange}
            //   value={this.props.value}
            //sender={this.props.sender}
            name={this.props.messages[c].message}
            //   status={this.props.stocks[c].status}
            //   delete={this.props.delete}
            //   init={this.props.init}
            //   url={this.props.stocks[c].url}
          />
        );
      }
    }
    return cardsN;
  };
}

export default MessageList;
