import React, { Component } from "react";
import Card from "./Card";
class Cardlist extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">{this.setNumberCards()}</div>
      </div>
    );
  }
  setNumberCards() {
    let cardsN = [];
    //console.log("stock len", this.props.stocks.length);
    for (let c = 0; c < this.props.feeders.length; c++) {
      cardsN.push(
        <Card
          key={c}
          id={c}
          // card={card}
          //onChange={this.props.onChange}
          onClick={this.props.onClick}
          join={this.props.join}
          // value={this.props.value}
          name={this.props.feeders[c].location}
          mealCount={this.props.feeders[c].mealCount}
          //   status={this.props.stocks[c].status}
          //   delete={this.props.delete}
          //   init={this.props.init}
          //   url={this.props.stocks[c].url}
        />
      );
    }
    return cardsN;
  }
}

export default Cardlist;
