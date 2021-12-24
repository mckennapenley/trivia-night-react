import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Teams = (props) => {
  const CorrectButton = styled.button`
    background-color: ${(props) =>
      props.selected ? "#00dac5" : "transparent"};
    color: ${(props) => (props.selected ? "white" : "#00dac5")};
    transition: all 0.3s ease 0s;
    margin-right: 5px;
    width: 50%;
    max-width: 75px;
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
    width: 50%;
    max-width: 75px;
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
      className="team-div card d-flex mt-4 border-0"
    >
      <div className="card-body p-1 pe-2">
        <div className="card-title">
          <h3>{props.team.name}</h3>
        </div>
        <div className="row">
          <div className="col-10 col-md-7">
            <div className="d-flex justify-content-center">
              <CorrectButton
                selected={answerSelected === "correct"}
                className="answer-btn correct-btn btn"
                onClick={(event) => {
                  props.handleCorrectResponse(event);
                  setAnswerSelected("correct");
                }}
              >
                <i className="bi bi-check-lg"></i>
              </CorrectButton>

              <IncorrectButton
                selected={answerSelected === "incorrect"}
                className="answer-btn incorrect-btn btn w-35 w-md-75"
                onClick={(event) => {
                  props.handleIncorrectResponse(event);
                  setAnswerSelected("incorrect");
                }}
              >
                <i className="bi bi-x-lg"></i>
              </IncorrectButton>
            </div>
          </div>

          <div id="team-score" className="col-10 col-md-5 p-0 mt-2">
            <div className="d-flex justify-content-center">
              <p className="mt-2 h5">{props.team.score}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
