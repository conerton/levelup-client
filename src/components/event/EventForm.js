import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../game/GameProvider.js";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router-dom";

export const EventForm = (props) => {
  const history = useHistory();

  const [game, setGame] = useState({});

  const { createEvent } = useContext(EventContext);

  const [currentEvent, setEvent] = useState({
    description: "",
    date: "",
    time: "",
    gameId: parseInt(game.id),
    organizer: localStorage.getItem("lu_token"),
  });

  const { getGames, games } = useContext(GameContext);

  useEffect(() => {
    getGames();
  }, []);

  const handleControlledInputChange = (e) => {
    const newEvent = Object.assign({}, currentEvent);
    newEvent[e.target.name] = e.target.value;
    setEvent(newEvent);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDescription">Description: </label>
          <input
            type="text"
            id="eventDescription"
            required
            autoFocus
            className="form-control"
            name="description"
            placeholder="Enter a description..."
            prototype="varchar"
            defaultValue={currentEvent.description}
            onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Date: </label>
          <input
            type="date"
            id="eventDate"
            required
            className="form-control"
            name="date"
            prototype="date"
            defaultValue={currentEvent.date}
            onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventTime">Time: </label>
          <input
            type="time"
            id="eventTime"
            required
            className="form-control"
            name="time"
            prototype="time"
            defaultValue={currentEvent.time}
            onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={handleControlledInputChange}
          >
            <option name="" value="0">
              Select a game...
            </option>
            {games.map((game) => (
              <option name={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          const event = {
            gameId: parseInt(currentEvent.gameId),
            organizer: localStorage.getItem("lu_token"),
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
          };
          createEvent(event).then(() => history.push("/events"));
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
