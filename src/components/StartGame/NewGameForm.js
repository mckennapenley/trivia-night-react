import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import TeamField from "./TeamField";

const NewGameForm = (props) => {
  const [game, setGame] = useState();
  const [gameId, setGameId] = useState();
  const [questionQty, setQuestionQty] = useState();
  const [toNextQuestion, setToNextQuestion] = useState(false);
  const [teamCount, setTeamCount] = useState(1);

  const handleChange = (event) => {
    setGame({ ...game, [event.target.name]: event.target.value });
    console.log(game);
  };

  const handleAddTeam = () => {
    setTeamCount(teamCount + 1);
  };

  const handleStartGame = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/api/games/start_game", { game })
      .then((response) => {
        setGameId(response.data.id);
        setQuestionQty(response.data.question_quantity);
        setToNextQuestion(true);
      });
  };

  if (toNextQuestion) {
    // console.log(`to next q: /game/${gameId}/question/1`)
    return (
      <Redirect
        to={{
          pathname: `/game/${gameId}/question/1`,
          state: { question_quantity: questionQty },
        }}
      />
    );
  }

  return (
    <div>
      <form className="col-lg-6 offset-lg-3" onSubmit={handleStartGame}>
        <div className="form-headline">Start a Game</div>
        <div className="form-group pb-4">
          <label for="difficulty">Difficulty</label>
          <select
            class="form-control"
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
          >
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>
        <div className="form-group pb-4">
          <label for="question_qty">Number of Questions</label>
          <input
            className="form-control"
            id="question_qty"
            onChange={handleChange}
            type="text"
            name="question_qty"
          />
        </div>
        <div id="game-field">
          <div id="team-names" className="form-group pb-2">
            <label>Add Team Names</label>
            <button type="button" onClick={handleAddTeam}>
              Add Team
            </button>
            {[...Array(teamCount)].map((_, index) => {
              return (
                <TeamField teamNumber={index + 1} handleChange={handleChange} />
              );
            })}
          </div>
        </div>
        <button type="submit">Start Game</button>
        {props.error && <div>{props.error}</div>}
      </form>
    </div>
  );
};

export default NewGameForm;
