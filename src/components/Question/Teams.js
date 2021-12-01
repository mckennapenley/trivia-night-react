const Teams = (props) => {
  return props.teams.map((team) => {
    return (
      <div id={team.id} key={team.id}>
        <p>
          {team.name}:{team.score}
        </p>
        <button
          className="answer-btn correct-btn btn btn-outline-success"
          onClick={(target) => props.handleCorrectResponse(target)}
        >
          <i className="bi bi-check-lg"></i>
          correct
        </button>
        <button
          className="answer-btn incorrect-btn btn btn-outline-danger"
          onClick={(target) => props.handleIncorrectResponse(target)}
        >
          <i className="bi bi-x-lg"></i>
          incorrect
        </button>
      </div>
    );
  });
};

export default Teams;
