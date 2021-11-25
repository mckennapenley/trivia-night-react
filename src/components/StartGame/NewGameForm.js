import React, { useState} from "react"
import axios from 'axios'

const NewGameForm = (props) =>{
   const [game, setGame] = useState()


  // Modify text in game
  const handleChange = (e) => {
    setGame(Object.assign({}, game, {[e.target.name]: e.target.value}))
  }

  // Create a game
  const handleSubmit = () => {
    axios.post("http://localhost:3000/api/games/start_game", { game } )
     .then(
    )
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-headline">Start a Game</div>
        <div className="input">
          <input onChange={handleChange} type="text" name="difficulty" placeholder="medium"  />
        </div>
        <div className="input">
          <input onChange={handleChange} type="text" name="question_qty" placeholder="10" />
        </div>
        <div className="input">
          <input onChange={handleChange} type="text" name="team1" placeholder="team name 1" />
        </div>
        <div className="input">
          <input onChange={handleChange} type="text" name="team2" placeholder="team name 2" />
        </div>
        <div className="input">
          <input onChange={handleChange} type="text" name="team3" placeholder="team name 3" />
        </div>
        
        <button type="Submit">Start Game</button>
        { 
          props.error && 
          <div>{props.error}</div>
        }
      </form>
    </div>
  )
}

export default NewGameForm
