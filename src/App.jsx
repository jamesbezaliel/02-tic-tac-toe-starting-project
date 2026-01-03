import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

// helper function to switch active player
function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].activePlayer === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleChangePlayer(rowIndex, colIndex) {
    // right (must send return statement):
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
      // get rid this duplication code
      // let currPlayer = "X";

      // if (prevGameTurns.length > 0 && prevGameTurns[0].activePlayer === "X") {
      //   currPlayer = "O";
      // }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard handleActivePlayer={handleChangePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
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
