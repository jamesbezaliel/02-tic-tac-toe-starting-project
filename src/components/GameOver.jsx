export default function GameOver({ winner, resetGame }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>The Winner is: {winner}</p>}
      {!winner && <p>It's a Draw!</p>}
      <p>
        <button onClick={resetGame}>Rematch!</button>
      </p>
    </div>
  );
}
