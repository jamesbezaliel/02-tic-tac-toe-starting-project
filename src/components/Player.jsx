import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangePlayerName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    // not the good option for react
    // setIsEditing(!isEditing);

    // better option:
    setIsEditing((prevIsEditing) => !prevIsEditing);

    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }

  function editPlayerName(event) {
    setPlayerName(event.target.value);
  }

  // max's way:
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        onChange={editPlayerName}
        value={playerName}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* my way: */}
        {/* {isEditing ? (
          <input type="text" onChange={editPlayerName} value={playerName} />
        ) : (
          <span required className="player-name">{playerName}</span>
        )} */}

        {/* max's way: */}

        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
