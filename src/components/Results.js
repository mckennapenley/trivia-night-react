import React, { useState, useEffect } from "react";
import { API_ROOT } from "../apiRoot";
import axios from "axios";

const Results = (props) => {
  const [teams, setTeams] = useState([]);
  const game_id = props.match.params.game_id;
  useEffect(() => {
    axios.get(`${API_ROOT}/api/games/${game_id}/teams`).then((response) => {
      const teams = response.data.teams;

      teams.sort((a, b) => {
        return b.score - a.score;
      });
      setTeams(teams);
    });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <p className="h2 mb-5 mt-5">Results</p>

      {teams.map((team, index) => {
        return (
          <div key={team.id} className="container" id="results-container">
            <div className="row justify-content-md-center">
              <div className="col-4 col-md-3">
                <p className="text-center h3">{index + 1}.</p>
              </div>
              <div className="col-4 col-md-3">
                <p className="text-center h3 text-break">{team.name}</p>
              </div>
              <div className="col-4 col-md-3">
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
