import React from "react";
import style from "./App.css";
import Modal from "../components/Modal";
import Board from "../components/Board";
import Result from "../components/Result";
import sudoku from "sudoku-umd";
import { hot } from "react-hot-loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      newGame: false,
      initialBoard: "",
      board: "",
      gameInfo: "Powodzenia"
    };
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal() {
    this.setState({
      openModal: !this.state.openModal
    });
  }

  startGame(level) {
    const board = sudoku.generate(level);
    this.setState({
      openModal: !this.state.openModal,
      newGame: true,
      board,
      initialBoard: board,
      gameInfo: "Powodzenia"
    });
  }

  reset() {
    this.setState({ board: this.state.initialBoard, gameInfo: "Powodzenia" });
  }

  handleChange(event, index) {
    // console.log(index);

    if (event.target.value > 0 && event.target.value <= 9) {
      let newBoard = this.state.board.split("").map((i) => {
        if (i == index) {
          this.setState({ board: event.target.value }) 
        }
      });
      this.setState({ board: newBoard })
  }



    // return(e) => {
    //   const newBoard = this.state.board.slice();
    //   newBoard(tile) = e.target.value;
    //   this.setState{( newBoard )};
    // }
  }

  check() {
    const solve = sudoku.solve(this.state.board);
    if (this.state.board == solve) {
      this.state({gameInfo: "Wszystko idzie w dobrą stronę"})
    }
    else {
      this.state({gameInfo: "Coś poszło nie tak"})
    }
  }

  solveTheGame() {
    const solve = sudoku.solve(this.state.initialBoard);
    if (solve) {
      this.state({board: solve})
    }
  }

  render() {
    return(
      <div className={style.container}>
        <h1>Sudoku</h1>
        <Modal
          show={this.state.openModal}
          action={this.startGame}
        />
        <Result 
          className={this.state.resultClassName} // S P R A W D Z I Ć   &   P O P R A W I Ć
          result={this.state.result}
        />
        <Board
          initialBoard = {this.state.initialBoard}
          board = {this.state.board}
          handleChange = {this.handleChange}
        />
        <div className={style.buttons}>
          <button onClick = {() => this.toggleModal()}>Nowa gra</button>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);