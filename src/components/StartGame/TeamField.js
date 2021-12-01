const TeamField = (props) => {
  return (
    <div className="form-group pb-2">
      <input
        className="form-control"
        onChange={props.handleChange}
        type="text"
        name={`team${props.teamNumber}`}
      />
    </div>
  );
};

export default TeamField;
