export default function GameOver({ winner, resetGame }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {/* use this: */}
      {/* <p>{winner && `The Winner is: ${winner}`}</p> */}
      {/* or */}
      {winner && <p>The Winner is: {winner}</p>}
      {!winner && <p>It's a Draw!</p>}
      <p>
        <button onClick={resetGame}>Rematch!</button>
      </p>
    </div>
  );
}
