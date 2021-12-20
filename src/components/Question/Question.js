import React, { useState, useEffect } from "react";
import { API_ROOT } from "../../apiRoot";
import axios from "axios";
import he from "he";
import { Link } from "react-router-dom";
import Teams from "./Teams";

const Question = (props) => {
  const [questionOrder, setQuestionOrder] = useState(
    parseInt(props.match.params.order)
  );
  const [prompt, setPrompt] = useState();
  const [answer, setAnswer] = useState();
  const [teams, setTeams] = useState([]);
  const [game, setGame] = useState({});
  const [clearAnswerSelections, setClearAnswerSelections] = useState(false);
  const nextQuestionOrder = questionOrder + 1;

  const [displayEndGame, setDisplayEndGame] = useState(false);
  const [questionQuantity, setQuestionQuantity] = useState();

  const game_id = props.match.params.game_id;

  const htmlDecode = (input) => {
    return he.decode(input);
  };

  useEffect(() => {
    axios.get(`${API_ROOT}/api/games/${game_id}/teams`).then((response) => {
      setTeams(response.data.teams);
      setGame(response.data.game);
      setQuestionQuantity(response.data.game.question_quantity);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_ROOT}/api/games/${game_id}/questions/${questionOrder}`)
      .then((response) => {
        const prompt = htmlDecode(response.data.prompt);
        const answer = htmlDecode(response.data.answer);

        setPrompt(prompt);
        setAnswer(answer);
        setClearAnswerSelections(false);
      });
  }, [game_id, questionOrder]);

  // Handles case where user arrives at last question url, it will check to use endgame on render
  useEffect(() => {
    if (questionOrder === questionQuantity) {
      setDisplayEndGame(true);
    }
  }, [questionOrder, questionQuantity]);

  const handleClick = () => {
    setQuestionOrder(questionOrder + 1);
    setClearAnswerSelections(true);
  };

  const handleCorrectResponse = (event) => {
    axios
      .post(
        `${API_ROOT}/api/games/${game_id}/questions/${questionOrder}/create`,
        {
          team_id: event.target.closest(".team-div").getAttribute("id"),
          answered_correctly: true,
        }
      )
      .then((response) => {
        setTeams(response.data.teams);
      });
  };

  const handleIncorrectResponse = (event) => {
    axios
      .post(
        `${API_ROOT}/api/games/${game_id}/questions/${questionOrder}/create`,
        {
          team_id: event.target.closest(".team-div").getAttribute("id"),
          answered_correctly: false,
        }
      )
      .then((response) => {
        setTeams(response.data.teams);
      });
  };

  return (
    <div className="row">
      <div className="col-6 col-md-4" id="left-col">
        <div className="m-5 p-4" id="left-scroll">
          {teams.map((team) => {
            return (
              <>
                <Teams
                  team={team}
                  handleCorrectResponse={handleCorrectResponse}
                  handleIncorrectResponse={handleIncorrectResponse}
                  clearAnswerSelections={clearAnswerSelections}
                />
              </>
            );
          })}
        </div>
      </div>
      <div className="col">
        <div className="d-flex flex-column" id="right-col">
          <div id="prompt-answer" className="mt-5 me-5">
            <div className="p-2 my-5 mx-5" id="prompt">
              <h2>{prompt}</h2>
            </div>
            <div
              className="p-2 my-5 mx-5 d-flex justify-content-center"
              id="answer"
            >
              <h2>{answer}</h2>
            </div>
          </div>
          <div className="align-self-end" id="next">
            {displayEndGame ? (
              <Link
                onClick={handleClick}
                to={`/game/${game_id}/end_game`}
                className="btn me-5"
                id="end-game-btn"
              >
                End Game
              </Link>
            ) : (
              <Link
                onClick={handleClick}
                to={`/game/${game_id}/question/${nextQuestionOrder}`}
                className="btn me-5"
                id="next-question-btn"
              >
                Next Question <i class="bi bi-arrow-right"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
