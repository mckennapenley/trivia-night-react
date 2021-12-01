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
    <div>
      <p>Results</p>
      <ol>
        {teams.map((team) => {
          return (
            <li key={team.id}>
              {team.name}: {team.score}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Results;
