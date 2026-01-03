import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// helper function to switch active player
function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].activePlayer === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);

  // fill the game board based on turns prop
  for (let turn of gameTurns) {
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
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayerName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // right (must send return statement):
    // not used anymore
    // setActivePlayer((currActivePlayer) => {
    //   return currActivePlayer === "X" ? "O" : "X";
    // });

    // or:
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );

    // wrong
    // setActivePlayer((currActivePlayer) => {
    //   currActivePlayer === "X" ? "O" : "X";
    // });

    setGameTurns((prevGameTurns) => {
      const currPlayer = deriveActivePlayer(prevGameTurns);

      // max's way:
      let newTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          activePlayer: currPlayer,
        },
        ...prevGameTurns,
      ];

      // my way:
      // let newTurn = [
      //   {
      //     row: rowIndex,
      //     col: colIndex,
      //     activePlayer: currPlayer,
      //   },
      //   ...prevGameTurns,
      // ];

      return newTurn;
    });
  }

  function handleClickRematch() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayerName((prevPlayerNames) => ({
      ...prevPlayerNames,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handleChangePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handleChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} resetGame={handleClickRematch} />
        )}
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} players={players} />
    </main>
  );
}

export default App;

// coding exercise 16:
// import React from 'react';

// import Review from './Review';

// // don't change the Component name "App"
// function App() {
//     let [feedback, setFeedback] = React.useState();
//     let [student, setStudent] = React.useState();

//     function handleFeedback(event) {
//         setFeedback(event.target.value);
//     }

//     function handleStudent(event) {
//         setStudent(event.target.value);
//     }

//   return (
//     <>
//       <section id="feedback">
//         <h2>Please share some feedback</h2>
//         <p>
//           <label>Your Feedback</label>
//           <textarea onChange={handleFeedback} value={feedback} required />
//         </p>
//         <p>
//           <label>Your Name</label>
//           <input onChange={handleStudent} value={student} type="text" required />
//         </p>
//       </section>
//       <section id="draft">
//         <h2>Your feedback</h2>

//         <Review feedback={feedback} student={student} />

//         <p>
//           <button>Save</button>
//         </p>
//       </section>
//     </>
//   );
// }

// export default App;

// export default function Review({ feedback, student }) {

//   return (
//     <figure>
//       <blockquote>
//         <p>{feedback}</p>
//       </blockquote>
//       <figcaption>{student}</figcaption>
//     </figure>
//   );
// }
