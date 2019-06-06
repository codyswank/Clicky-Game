import React, { Component } from "react";
import "./style.css";

class App extends Component {
  state = {
    clickedFriends: [],
    win: false,
    score: 0,
    roundEnd: false,
    friends: [
      {
        gif: require("./gifs/char.gif"),
        id: 1
      },
      {
        gif: require("./gifs/kenny.gif"),
        id: 2
      },
      {
        gif: require("./gifs/pika.gif"),
        id: 3
      },
      {
        gif: require("./gifs/sponge.gif"),
        id: 4
      },
      {
        gif: require("./gifs/courage.gif"),
        id: 5
      },
      {
        gif: require("./gifs/scooby.gif"),
        id: 6
      },
      {
        gif: require("./gifs/peter.gif"),
        id: 7
      },
      {
        gif: require("./gifs/cheese.gif"),
        id: 8
      }
    ]
  };

  roundReset = () => {
    let {clickedFriends, score, roundEnd} = this.state

    clickedFriends = []
    score = 0
    roundEnd = false

    this.setState({
      clickedFriends,
      score,
      roundEnd
    })
      
  }


onClick = (id) => {
  let { clickedFriends, friends, roundEnd, score, win } = this.state;
  let friendCount = friends.length;
  let friendSelected;
  let temp;

  if (clickedFriends.includes(id)){
    roundEnd = true;
    setTimeout(this.roundReset, 2000)
  }else {
    score++
    clickedFriends.push(id)
    if (score === friendCount){
      roundEnd = true;
      win = true;
    }
  }

  while (friendCount > 0) {
    friendSelected = Math.floor(Math.random() * friendCount);
    friendCount--;
    temp = friends[friendCount];
    friends[friendCount] = friends[friendSelected];
    friends[friendSelected] = temp;
  }

  this.setState({
    clickedFriends,
    score,
    friends,
    roundEnd,
    friendCount,
    win
  })
}

  render() {
    return (
      <div className="App">
        <h1>Clicky Friends</h1>
        <p>Click all the friends, with no duplicates</p>
        <h1>{this.state.score}</h1>
        <div className="friend-zone">
        {(this.state.roundEnd && !this.state.win) ? (<h1>You Lose</h1>) 
        : 
        (this.state.roundEnd && this.state.win) ? (<h1>Congrats you won</h1>)
        :
        (this.state.friends.map(friend => <img onClick={() => this.onClick(friend.id)} key={friend.id} src={friend.gif} alt="placeholder" />
        ))}
      </div>
      </div>
    );
  }
}

export default App;


