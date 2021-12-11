import React from "react";
import { Link } from "react-router-dom";
import img from "../images/pexels-marcus-herzberg-1058277.jpg";
import styled from "styled-components";

const StyledWelcome = styled.div`
    background-image: url("src/images/pexels-marcus-herzberg-1058277.jpg");
    background-image: url(${img});
    color: #fcbf49;
    min-height: 100vh;
    background-size: cover;
    box-shadow: inset 0 0 0 2000px rgba(60,145,230,0.6);
  }
`;

const Home = () => {
  return (
    <StyledWelcome>
      <h1>
        Trivia Night lets any bar host their own team trivia competition -
        completely in house!
      </h1>
      <h3>
        Select question difficulty, number of questions, and enter as many teams
        you need.
      </h3>
      <Link to={`/game`} className="btn btn-outline-light" id="home-page-btn">
        Get Started - it's free!
      </Link>
    </StyledWelcome>
  );
};

export default Home;
