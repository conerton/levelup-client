import React, { useContext, useEffect, useHistory } from "react";
import { GameContext } from "./GameProvider.js";

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);
  //   const newGame() {
  //       let history = useHistory();
  //   }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          props.history.push({ pathname: "/games/new" });
          console.log("PROPS", props);
        }}
      >
        Register New Game
      </button>
      <article className="games">
        {games.map((game) => {
          return (
            <section key={`game--${game.id}`} className="game">
              <div className="game__title">{game.title}</div>
              <div className="game__players">
                players needed: {game.number_of_players}
              </div>
              <div className="game__description">
                Description: {game.description}
              </div>
            </section>
          );
        })}
      </article>
    </>
  );
};
