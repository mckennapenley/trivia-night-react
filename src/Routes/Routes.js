import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Nav from "../Pages/Nav";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import StartGame from "../components/StartGame/StartGame";
import Question from "../components/Question/Question";
import Results from "../components/Results";

const Routes = ({ user, setUser }) => {
  return (
    <div>
      <Router>
        <Nav setUser={setUser} />
        <div className="container">
          {/* <h1>Status: {user === "Logged" ? "Logged in" : "Not Logged in"}</h1> */}
          <Switch>
            <Route
              path="/signup"
              render={(props) => (
                <Signup {...props} user={user} setUser={setUser} />
              )}
            />
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
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login {...props} user={user} setUser={setUser} />
              )}
            />
            <Route path="/" render={(props) => <Home {...props} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
