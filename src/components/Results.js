import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = (props) => {
  const [teams, setTeams] = useState([]);
  const game_id = props.match.params.game_id;
  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/games/${game_id}/end_game`)
      .then((response) => {
        const teams = response.data.teams;

        teams.sort((a, b) => {
          return b.score - a.score;
        });
        setTeams(teams);
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <p className="h2 mb-5">Results</p>

      {teams.map((team, index) => {
        return (
          <div key={team.id} className="container" id="results-container">
            <div className="row justify-content-md-center">
              <div className="col-2">
                <p className="text-center h3">{index + 1}.</p>
              </div>
              <div className="col-2">
                <p className="text-center h3">{team.name}</p>
              </div>
              <div className="col-2">
                <p className="text-center h3">{team.score}</p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Results;
