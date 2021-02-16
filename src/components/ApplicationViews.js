import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { EventProvider } from "./event/EventProvider";
import { EventList } from "./event/EventList";
import { GameForm } from "./game/GameForm";

export const ApplicationViews = (props) => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <Route exact path="/games">
            <GameList />
          </Route>
        </GameProvider>

        <GameProvider>
          <EventProvider>
            <Route exact path="/games/new">
              <GameForm {...props} />
            </Route>
          </EventProvider>
        </GameProvider>

        <EventProvider>
          <Route exact path="/events">
            <EventList />
          </Route>
        </EventProvider>
      </main>
    </>
  );
};
