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
      gameInfo: "Powodzenia",
      gameInfoClassName: style.gameInfoInit
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
      gameInfo: "Powodzenia",
      gameInfoClassName: style.gameInfoInit
    });
  }

  reset() {
    this.setState({ board: this.state.initialBoard, gameInfo: "Powodzenia" });
  }

  handleChange(value, index) {
  // console.log('->', value, typeof value);
    
    if (value > 0 && value <= 9) {
      let newBoard = this.state.board.split("").map((val, i) => {
        if (i == index) {
          return Number(value);
        } 
        
        return val;
      }) ;

      this.setState({ board: newBoard.join('') });
    } 
    else if (value === "") {
      let newBoard = this.state.board.split("").map((val, i) => {
        if (i == index) {
          return ".";
        } 
        
        return val;
      });

      this.setState({ board: newBoard.join('') });
    }
  }

  check() {
    const solvedBoard = sudoku.solve(this.state.board);
    if (solvedBoard && !this.state.board.includes(".")) {
      this.setState({
        gameInfo: "Udało Ci się rozwiązać Sudoku !"
      });
    }
    else if (solvedBoard) {
      this.setState({
        gameInfo: "Wszystko idzie w dobrą stronę :)"
      });
    }
    else {
      this.setState({
        gameInfo: "Ups... Coś poszło nie tak"
      });
    }
  }

  solveTheGame() {
    const solve = sudoku.solve(this.state.initialBoard);
    if (solve) {
      this.setState({board: solve})
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
          gameInfo={this.state.gameInfo}
          className={this.state.gameInfoClassName}
        />
        <Board
          initialBoard = {this.state.initialBoard}
          board = {this.state.board}
          handleChange = {this.handleChange}
        />
        <div className={style.buttons}>
          <button onClick = {() => this.toggleModal()}>Nowa gra</button>
          {this.state.newGame ? <button onClick={() => this.solveTheGame()}>Pokaż rozwiązanie</button> : ''}
          {this.state.newGame ? <button onClick={() => this.check()}>Sprawdź</button> : ''}
          {this.state.newGame ? <button onClick={() => this.reset()}>Restart</button> : ''}
        </div>
      </div>
    );
  }
}

export default hot(module)(App);