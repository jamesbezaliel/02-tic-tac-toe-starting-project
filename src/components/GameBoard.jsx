// import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
// note:
// we need lifting state up concept in this GameBoard component and also
// in Player component because we need to know which player is currently playing
// (GameBoard for symbol, and Player for styling who is currently active)
// lifting state up concept means we need to lift (move) the state to the closest common ancestor component
// in this case, the common ancestor component is App component
export default function GameBoard({ handleActivePlayer, turns }) {
  let gameBoard = initialGameBoard;

  // fill the game board based on turns prop
  for (let turn of turns) {
    console.log(turn);

    // max's way:
    const { square, activePlayer } = turn;
    const { row, col } = square;

    // const { row, col } = turn.square;
    // const activePlayer  = turn.activePlayer;

    // my way:
    // const {row, col, activePlayer} = turn;
    // or:
    // const row = turn.row;
    // const col = turn.col;
    // const activePlayer = turn.activePlayer;

    gameBoard[row][col] = activePlayer;
  }

  // we commented this:
  // reason: because we need to lift the state up to App component, why?
  // because it's recommended to use 1 use state (in game board) rather than 2 use states (in game board and in app
  // (for log purposes))
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleClickButton(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     // create a new copy of the 2D array
  //     // this is called a "deep copy" and is necessary to avoid mutating state directly
  //     // this is crucial in React to ensure proper re-rendering
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;

  //     return updatedGameBoard;
  //   });

  //   handleActivePlayer();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleClickButton(rowIndex, colIndex)}>
                  {playerSymbol}
                </button> */}
                <button
                  onClick={
                    !gameBoard[rowIndex][colIndex]
                      ? () => handleActivePlayer(rowIndex, colIndex)
                      : undefined
                  }
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
