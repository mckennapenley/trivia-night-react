import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Teams = (props) => {
  const CorrectButton = styled.button`
    background-color: ${(props) => (props.selected ? "green" : "transparent")};
    color: ${(props) => (props.selected ? "white" : "green")};
    width: 75px;
    margin-right: 5px;
    border: 2px solid;
    border-color: green;
  `;

  const IncorrectButton = styled.button`
    background-color: ${(props) => (props.selected ? "red" : "transparent")};
    color: ${(props) => (props.selected ? "white" : "red")};
    width: 75px;
    border: 2px solid;
    border-color: red;
  `;

  const [answerSelected, setAnswerSelected] = useState("");

  useEffect(() => {
    if (props.clearAnswerSelections === true) {
      setAnswerSelected("");
    }
  }, [props.clearAnswerSelections]);

  return (
    <div
      id={props.team.id}
      key={props.team.id}
      className="team-div card d-flex"
    >
      <div className="card-body p-1 pe-2">
        <div className="card-title">
          <h4>{props.team.name}</h4>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 w-md-75 mt-1">
            <CorrectButton
              selected={answerSelected === "correct"}
              className="answer-btn correct-btn btn"
              onClick={(target) => {
                props.handleCorrectResponse(target);
                setAnswerSelected("correct");
              }}
            >
              <i className="bi bi-check-lg"></i>
            </CorrectButton>

            <IncorrectButton
              selected={answerSelected === "incorrect"}
              className="answer-btn incorrect-btn btn btn-outline"
              onClick={(target) => {
                props.handleIncorrectResponse(target);
                setAnswerSelected("incorrect");
              }}
            >
              <i className="bi bi-x-lg"></i>
            </IncorrectButton>
          </div>

          <div className="h5 justify-content-center">
            <p className="mt-2">{props.team.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
