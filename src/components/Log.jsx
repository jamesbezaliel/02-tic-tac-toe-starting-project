export default function Log({ turns, players }) {
  return (
    <ol id="log">
      {/* {turns.map((turn) => {
        const { square, activePlayer } = turn;
        const { row, col } = square;
        return (
          <li key={`${turn.square.row}${turn.square.col}`}>
            Player {activePlayer} moved to row {row + 1}, column {col + 1}
          </li>
        );
      })} */}

      {/* max's way: */}
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {players[turn.activePlayer]} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}

      {/* my way: */}
      {/* {turns.map((turn) => (
        <li key={`${turn.row}${turn.col}`}>
          {turn.activePlayer} selected {turn.row}, {turn.col}
        </li>
      ))} */}
    </ol>
  );
}
