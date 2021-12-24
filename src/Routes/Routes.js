import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Pages/Nav";
import NewGameForm from "../components/NewGameForm";
import Question from "../components/Question/Question";
import Results from "../components/Results";

const Routes = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/game" render={() => <NewGameForm />} />
          <Route
            exact
            path="/game/:game_id/question/:order"
            render={(props) => <Question {...props} />}
          />
          <Route
            exact
            path="/game/:game_id/results"
            render={(props) => <Results {...props} />}
          />
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
