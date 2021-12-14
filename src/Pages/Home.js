import React from "react";
import { Link } from "react-router-dom";
import img from "../images/pexels-julia-filirovska-4913788.jpg";
import styled from "styled-components";

const StyledWelcome = styled.div`
  background-image: url(${img});
  color: #949494;
  min-height: 100vh;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(40, 40, 40, 0.92);
  font-family: "Mulish", sans-serif;

  #home-page-btn {
    margin-top: 10px;
    background-color: #bb86fc;
    color: #121212;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    border-radius: 45px;
    transition: all 0.3s ease 0s;
  }

  #home-page-btn:hover {
    background-color: #9a4cfa;
    box-shadow: 0px 15px 20px rgba(154, 76, 250, 0.4);
    color: #fff;
    transform: translateY(-3px);
  }
`;

const Home = () => {
  return (
    <StyledWelcome>
      <div className="row" id="home-text-container">
        <div className="col-6 offset-3 ">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            id="home-text"
          >
            <h1 className="text-center" id="welcome-first-line">
              Trivia Night lets any bar host their own team trivia competition -
              completely in house!
            </h1>
            <h3 className="text-center mb-3">
              Select question difficulty, number of questions, and enter as many
              teams you need.
            </h3>
            <Link to={`/game`} className="btn" id="home-page-btn">
              Get Started - it's free!
            </Link>
          </div>
        </div>
      </div>
    </StyledWelcome>
  );
};

export default Home;
