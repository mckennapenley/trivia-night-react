import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Trivia Night</h1>
      <Link to={`/game`}>Start a Game</Link>
    </div>
  );
};

export default Home;
