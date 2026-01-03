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

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].activePlayer === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);

  for (let turn of gameTurns) {
    const { square, activePlayer } = turn;
    const { row, col } = square;
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
    setGameTurns((prevGameTurns) => {
      const currPlayer = deriveActivePlayer(prevGameTurns);

      let newTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          activePlayer: currPlayer,
        },
        ...prevGameTurns,
      ];

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
