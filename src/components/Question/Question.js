import React, { useState, useEffect } from "react";
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
  // const [questionId, setQuestionId] = useState()
  const [teams, setTeams] = useState([]);
  const [game, setGame] = useState({});
  const nextQuestionOrder = questionOrder + 1;

  const [displayEndGame, setDisplayEndGame] = useState(false);
  const [questionQuantity, setQuestionQuantity] = useState();

  const game_id = props.match.params.game_id;

  const htmlDecode = (input) => {
    return he.decode(input);
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:3000/api/games/${game_id}/questions/${questionOrder}`,
        { game_id }
      )
      .then((response) => {
        const prompt = htmlDecode(response.data.prompt);
        const answer = htmlDecode(response.data.answer);

        setPrompt(prompt);
        setAnswer(answer);
      });
  }, [game_id, questionOrder]);

  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/games/${game_id}/teams`)
      .then((response) => {
        setTeams(response.data.teams);
        setGame(response.data.game);
        setQuestionQuantity(response.data.game.question_quantity);
      });
  }, []);

  useEffect(() => {
    if (questionOrder === questionQuantity) {
      setDisplayEndGame(true);
    }
  }, [questionQuantity]);

  const handleClick = () => {
    if (nextQuestionOrder === questionQuantity) {
      setDisplayEndGame(true);
    }

    setQuestionOrder(questionOrder + 1);

    document.querySelectorAll(".answer-btn").forEach((element) => {
      element.classList.remove("active");
    });
  };

  const handleCorrectResponse = (event) => {
    axios
      .post(
        `http://localhost:3000/api/games/${game_id}/questions/${questionOrder}/create`,
        {
          team_id: event.target.parentNode.getAttribute("id"),
          answered_correctly: true,
        }
      )
      .then((response) => {
        setTeams(response.data.teams);
        event.target.classList.add("active");
        event.target.parentElement
          .querySelector(".incorrect-btn")
          .classList.remove("active");
      });
  };

  const handleIncorrectResponse = (event) => {
    axios
      .post(
        `http://localhost:3000/api/games/${game_id}/questions/${questionOrder}/create`,
        {
          team_id: event.target.parentNode.getAttribute("id"),
          answered_correctly: false,
        }
      )
      .then((response) => {
        setTeams(response.data.teams);
        event.target.classList.add("active");
        event.target.parentElement
          .querySelector(".correct-btn")
          .classList.remove("active");
      });
  };

  return (
    <div className="row">
      <div className="col" id="left-scroll">
        <Teams
          teams={teams}
          handleCorrectResponse={handleCorrectResponse}
          handleIncorrectResponse={handleIncorrectResponse}
        />
      </div>
      <div className="col">
        <p>Question: {prompt}</p>
        <p>Answer: {answer}</p>

        {displayEndGame ? (
          <Link onClick={handleClick} to={`/game/${game_id}/end_game`}>
            End Game
          </Link>
        ) : (
          <Link
            onClick={handleClick}
            to={`/game/${game_id}/question/${nextQuestionOrder}`}
          >
            Next Question
          </Link>
        )}
      </div>
    </div>
  );
};

export default Question;