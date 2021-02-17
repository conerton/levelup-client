import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";

export const GameForm = (props) => {
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    title: "",
    gameTypeId: 0,
    numberOfPlayers: 0,
    description: "",
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameTypes();
  }, []);

  /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
  const changeGameState = (domEvent) => {
    const newGameState = Object.assign({}, currentGame);
    newGameState[domEvent.target.name] = domEvent.target.value;
    setCurrentGame(newGameState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gameType">Game Type: </label>
          <select
            name="gameTypeId"
            className="form-control"
            value={currentGame.gameTypeId}
            onChange={changeGameState}
          >
            <option name="" value="0">
              Select a game type...
            </option>
            {gameTypes.map((type) => (
              <option name={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Max Players: </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentGame.description}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            description: currentGame.description,
            gameTypeId: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => props.history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
