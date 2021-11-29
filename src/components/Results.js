import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = (props) => {
  const game_id = props.match.params.game_id;
  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/games/${game_id}/end_game`)
      .then((response) => {
        console.log(response);
        // setTeams(response.data.teams);
      });
  }, []);

  return <div>This is REsults</div>;
};

export default Results;
