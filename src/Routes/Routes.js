import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Pages/Nav";
import StartGame from "../components/StartGame/StartGame";
import Question from "../components/Question/Question";
import Results from "../components/Results";

const Routes = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route
            exact
            path="/game"
            render={(props) => <StartGame {...props} />}
          />
          <Route
            exact
            path="/game/:game_id/question/:order"
            render={(props) => <Question {...props} />}
          />
          <Route
            exact
            path="/game/:game_id/end_game"
            render={(props) => <Results {...props} />}
          />
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
