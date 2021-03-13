import { React, Component } from "react";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      gameArray: Array(9).fill(""),
      chance: "X",
      winner: undefined,
      draw: undefined,
      gameEnd: false,
      gameMovesLeft: 9

    }
  }
  render() {
    const headerInfo = !this.state.winner && !this.state.draw ? `It's ${this.state.chance} turn ` : this.reStart();
    return (

      <div id="component" onClick={(e) => {
        if (e.target.className === "square" && !this.state.gameEnd) {
          this.clicked(e);
        }

      }}>
        <div id="header">
          {headerInfo}
        </div>
        <div id="game">

          <div className="square" id="0"></div>
          <div className="square" id="1"></div>
          <div className="square" id="2"></div>
          <div className="square" id="3"></div>
          <div className="square" id="4"></div>
          <div className="square" id="5"></div>
          <div className="square" id="6"></div>
          <div className="square" id="7"></div>
          <div className="square" id="8"></div>

        </div>
      </div>
    );
  }


  drawBoard() {

  }


  async clicked(event) {

    const id = event.target.id;
    const { gameArray, chance, gameMovesLeft } = this.state;
    if (gameArray[id] !== "") return;

    event.target.innerText = this.state.chance;

    gameArray.splice(id, 1, chance)
    if (chance === "X") {
      await this.changeState({
        gameArray: gameArray,
        gameMovesLeft: gameMovesLeft - 1,
        chance: "O"
      })
    } else {
      await this.changeState({
        gameArray: gameArray,
        gameMovesLeft: gameMovesLeft - 1,
        chance: "X"
      })
    }
    this.win(gameArray, chance);
  }


  changeState(object) {
    this.setState(object);
    return;
  }

  win(array, chance) {
    const pattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ]

    for (let i = 0; i < pattern.length; i++) {
      if (array[pattern[i][0]] === "" || array[pattern[i][1]] === "" || array[pattern[i][2]] === "") {
        continue;
      }
      if (array[pattern[i][0]] === array[pattern[i][1]] && array[pattern[i][0]] === array[pattern[i][2]]) {
        this.changeState({
          gameEnd: true,
          winner: chance
        })
        console.log(this.state)
        return true;
      }
    }
    if (this.state.gameMovesLeft === 0) {
      this.changeState({
        gameEnd: true,
        draw: "Draw"
      })
      console.log(this.state)
      return;
    }

  }

  reStart() {
    return (
      <>
        {this.state.gameEnd && this.state.draw ? "Draw" : `${this.state.winner} Wins`}
        <br />
        <button onClick={(e) => {
          console.log(e)
          this.changeToNewConfig();
        }}>Restart</button>
      </>
    )
  }
  changeToNewConfig(e) {
    this.changeState(
      {

        gameArray: Array(9).fill(""),
        chance: "X",
        winner: undefined,
        draw: undefined,
        gameEnd: false,
        gameMovesLeft: 9
      }

    )
    for (let i = 0; i < 9; i++) {
      document.getElementById(`${i}`).innerText = ""
    }
  }
}

export default App;