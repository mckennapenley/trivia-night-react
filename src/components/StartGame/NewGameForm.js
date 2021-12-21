import React, { useState } from "react";
import { API_ROOT } from "../../apiRoot";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TeamField from "./TeamField";

const NewGameForm = (props) => {
  const [game, setGame] = useState();
  const [gameId, setGameId] = useState();
  const [toNextQuestion, setToNextQuestion] = useState(false);
  const [teamCount, setTeamCount] = useState(1);
  const [error, setError] = useState();

  const handleChange = (event) => {
    setGame({ ...game, [event.target.name]: event.target.value });
  };

  const handleAddTeam = () => {
    setTeamCount(teamCount + 1);
  };

  const handleStartGame = (event) => {
    event.preventDefault();

    axios
      .post(`${API_ROOT}/api/games/start_game`, { game })
      .then((response) => {
        setGameId(response.data.id);
        setToNextQuestion(true);
      })
      .catch((error) => {
        setError(
          "There was an issue creating the game. Make sure you enter the difficulty, number of questions, and team names to start a game."
        );
      });
  };

  if (toNextQuestion) {
    return (
      <Redirect
        to={{
          pathname: `/game/${gameId}/question/1`,
        }}
      />
    );
  }

  return (
    <div>
      {error && (
        <div className="d-flex justify-content-center">
          <div class="mt-2 alert alert-danger w-75" role="alert">
            {error}
          </div>
        </div>
      )}
      <form
        className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 card p-5 my-5"
        id="form-bg"
        onSubmit={handleStartGame}
      >
        <div className="text-center  h2">Start a Game</div>
        <div className="form-group pb-4 ">
          <label className="h5" htmlFor="difficulty">
            Difficulty
          </label>

          <select
            className="form-control"
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
          >
            <option selected disabled>
              Select Question Difficulty
            </option>

            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>
        <div className="form-group pb-4 ">
          <label className="h5" htmlFor="question_qty">
            Number of Questions
          </label>

          <input
            className="form-control"
            id="question_qty"
            onChange={handleChange}
            type="text"
            name="question_qty"
          />
        </div>
        <div id="game-field">
          <div id="team-names" className="form-group pb-4 ">
            <label className="h5">Add Teams</label>

            {[...Array(teamCount)].map((_, index) => {
              return (
                <TeamField
                  key={index}
                  teamNumber={index + 1}
                  handleChange={handleChange}
                />
              );
            })}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-lg"
            id="add-team-button"
            onClick={handleAddTeam}
          >
            <i className="bi bi-plus bi-2x"></i>
          </button>
          <button type="submit" className="btn btn-lg" id="start-game-btn">
            Start Game
          </button>
        </div>
        {props.error && (
          <div className="alert alert-danger" role="alert">
            {props.error}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewGameForm;
