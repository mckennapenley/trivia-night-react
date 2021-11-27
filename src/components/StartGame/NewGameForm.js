import React, { useState } from "react"
import { Redirect } from 'react-router-dom'
import axios from 'axios'


const NewGameForm = (props) =>{
   const [game, setGame] = useState()
   const [gameId, setGameId] = useState()
   const [questionQty, setQuestionQty] = useState()
   const [toNextQuestion, setToNextQuestion] = useState(false)
  



  const handleChange = (e) => {
    setGame(Object.assign({}, game, {[e.target.name]: e.target.value}))
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/api/games/start_game", { game } )
      .then((response) => {
        setGameId(response.data.id)
        setQuestionQty(response.data.question_quantity)
        setToNextQuestion(true)
      })
  }

  if (toNextQuestion) {
    // console.log(`to next q: /game/${gameId}/question/1`)
    return <Redirect 
      to={{
        pathname: `/game/${gameId}/question/1`,
        state: {question_quantity: questionQty} 
      }}
    />
    
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
