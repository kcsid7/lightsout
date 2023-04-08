import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i=0; i < nrows; i++) {
        let row = []; // The row
        for (let j=0; j < ncols; j++) {
            row.push(Math.random() > chanceLightStartsOn); // Push col values into the row
        }
        initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every( r => r.every(c => !c));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const oldBoardCopy = oldBoard.map( r => [...r]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
        <div className="Board-Main">
        <h1 className="Board-Title-Won">Lights Out</h1>
        <h1 className="Board-Won">You Won!</h1>
    </div>
    )
  }

  // TODO
  // make table board
  let table = [];

  for (let i=0; i < nrows; i++) {
    let row = [];
    for (let j=0; j < ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(
            <Cell 
                key={coord}
                isLit={board[i][j]}
                flipCellsAroundMe={ () => flipCellsAround(coord)}
            />
        )
    }
    table.push( <tr key={i}>{row}</tr>);
  }

  // TODO
  return (
    <div className="Board-Main">
        <h1 className="Board-Title">Lights Out</h1>
        <h3 className="Board-Title-Instructions">
            Turn all lights to <span className="Board-Title-RED">RED</span>
        </h3>
        <table className="Board">
            <tbody>{table}</tbody>
        </table>
    </div>
  )

}

Board.defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
}

export default Board;
