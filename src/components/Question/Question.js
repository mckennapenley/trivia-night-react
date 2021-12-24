import React, { useState, useEffect } from "react";
import { API_ROOT } from "../../apiRoot";
import axios from "axios";
import he from "he";
import { Link } from "react-router-dom";
import Team from "./Team";

const Question = (props) => {
  const [questionOrder, setQuestionOrder] = useState(
    parseInt(props.match.params.order)
  );
  const [prompt, setPrompt] = useState();
  const [answer, setAnswer] = useState();
  const [teams, setTeams] = useState([]);
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
  }, [questionOrder]);

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
      <div className="col-5 p-0 mx-2" id="left-col">
        <div className="mt-2 m-md-5 ps-4 p-md-4" id="left-scroll">
          {teams.map((team) => {
            return (
              <>
                <Team
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
      <div className="col-6 p-0">
        <div className="mt-2 d-flex flex-column" id="right-col">
          <div id="prompt-answer" className="mt-md-5">
            <div className="p-2 my-5 mx-2 mx-lg-5" id="prompt">
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
                to={`/game/${game_id}/results`}
                className="btn me-3 me-md-5"
                id="end-game-btn"
              >
                End Game
              </Link>
            ) : (
              <Link
                onClick={handleClick}
                to={`/game/${game_id}/question/${nextQuestionOrder}`}
                className="btn me-3 me-md-5"
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
