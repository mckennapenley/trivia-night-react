import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Teams = (props) => {
  const CorrectButton = styled.button`
    background-color: ${(props) => (props.selected ? "green" : "transparent")};
  `;

  const IncorrectButton = styled.button`
    background-color: ${(props) => (props.selected ? "red" : "transparent")};
  `;

  const [answerSelected, setAnswerSelected] = useState("");

  useEffect(() => {
    if (props.clearAnswerSelections === true) {
      setAnswerSelected("");
    }
  }, [props.clearAnswerSelections]);

  return (
    <div id={props.team.id} key={props.team.id} className="card-body d-flex">
      <h4 className="card-title">{props.team.name}</h4>

      <CorrectButton
        selected={answerSelected === "correct"}
        className="answer-btn correct-btn btn btn-outline-success col-2 inline"
        onClick={(target) => {
          props.handleCorrectResponse(target);
          setAnswerSelected("correct");
        }}
      >
        <i className="bi bi-check-lg"></i>
      </CorrectButton>
      <IncorrectButton
        selected={answerSelected === "incorrect"}
        className="answer-btn incorrect-btn btn btn-outline-danger col-2 inline"
        onClick={(target) => {
          props.handleIncorrectResponse(target);
          setAnswerSelected("incorrect");
        }}
      >
        <i className="bi bi-x-lg"></i>
      </IncorrectButton>
      <span className="float-right">{props.team.score}</span>
    </div>
  );
};

export default Teams;
