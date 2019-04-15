import React from "react";
import Tile from "./Tile";
import style from "../containers/App.css";

// Stworzenie planszy z użyciem split i map
const Board = props => {
  const boardSplit = props.board.split("");
  const initialBoardSplit = props.initialBoard.split("");
  const value = boardSplit.map((number, index) => {
    return (
      <Tile
        key={index}
        // wypełnienie komórki stylami tła 
        className={number === initialBoardSplit[index] && number != "." ? style.tileinit : style.tile}
        // jeśli wartość to "." ustaw pusty "" przeciwnym razie wartość liczbową
        value={number === "." ? "" : number}
        // zablokowanie edycji komórki
        disabled={number === initialBoardSplit[index] && number != "." ? true : false}
        handleChange={event => props.handleChange(index, event.target.value)}
      />
    );
  });
  return <div className={style.board}>{value}</div>
};

export default Board;