import React, { useState } from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'


const NewGameForm = (props) =>{
   const [game, setGame] = useState()
   const [toNextQuestion, setToNextQuestion] = useState(false)


  // Modify text in game
  const handleChange = (e) => {
    setGame(Object.assign({}, game, {[e.target.name]: e.target.value}))
  }

  // Create a game
  // const handleSubmit = () => {
  //   axios.post("http://localhost:3000/api/games/start_game", { game } )
  //   .then(() => setToNextQuestion(true))
  // }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/api/games/start_game", { game } )
      .then((response) => {
        console.log(response);
        setToNextQuestion(true)
      })
  }

  if (toNextQuestion) {
    return <Redirect to='/question' />
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
