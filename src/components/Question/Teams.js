import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Teams = (props) => {
  const CorrectButton = styled.button`
    background-color: ${(props) =>
      props.selected ? "#00dac5" : "transparent"};
    color: ${(props) => (props.selected ? "white" : "#00dac5")};
    transition: all 0.3s ease 0s;
    width: 75px;
    margin-right: 5px;
    border: 2px solid #00dac5;
    &:hover {
      box-shadow: 0px 15px 20px rgba(0, 184, 165, 0.4);
      color: #fff;
    }
  `;

  const IncorrectButton = styled.button`
    background-color: ${(props) =>
      props.selected ? "#cf6679" : "transparent"};
    color: ${(props) => (props.selected ? "white" : "#cf6679")};
    transition: all 0.3s ease 0s;
    width: 75px;
    border: 2px solid #cf6679;
    &:hover {
      box-shadow: 0px 15px 20px rgba(207, 102, 121, 0.4);
      color: #fff;
    }
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
      className="team-div card d-flex mt-4"
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
              className="answer-btn incorrect-btn btn "
              onClick={(target) => {
                props.handleIncorrectResponse(target);
                setAnswerSelected("incorrect");
              }}
            >
              <i className="bi bi-x-lg"></i>
            </IncorrectButton>
          </div>

          <div id="team-score" className="h5 justify-content-center">
            <p className="mt-2">{props.team.score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
