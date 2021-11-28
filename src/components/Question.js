import React, { useState, useEffect } from "react"
import axios from 'axios'
import he from 'he'
import { Link } from "react-router-dom"
// import Teams from "./Teams"

const Question = (props) =>{
  const [questionOrder, setQuestionOrder] = useState(parseInt(props.match.params.order)) 
  const [prompt, setPrompt] = useState()
  const [answer, setAnswer] = useState()
  const [teams, setTeams] = useState([])
  const [game, setGame] = useState({})
  const nextQuestionOrder = questionOrder + 1

  const [toNextQuestion, setToNextQuestion] = useState(false)

  const game_id = props.match.params.game_id
  const question_quantity = game?.question_quantity
  
  const htmlDecode = (input) => {
    return he.decode(input)
  }

  useEffect(() => {    
    axios.post(`http://localhost:3000/api/games/${game_id}/questions/${questionOrder}`, { game_id }).then((response) => {
      const prompt = htmlDecode(response.data.prompt)
      const answer = htmlDecode(response.data.answer)
      
      setPrompt(prompt)
      setAnswer(answer)
    })
  }, [game_id, questionOrder])

  useEffect(() => {
    axios.post(`http://localhost:3000/api/games/${game_id}/teams`).then((response) => {
      setTeams(response.data.teams)
      setGame(response.data.game)
    })
  }, [])

  const handleClick = () => {
    if (questionOrder < question_quantity) {
      setQuestionOrder(questionOrder + 1)
    }
  }

  return (
    <div>
      <p>Question: { prompt }</p>
      <p>Answer: { answer }</p>
      {teams.map((team)=>{
        return <p key={team.id}>{team.name}</p>
      })}
      {/* if questionOrder is < question quantity then show next question */}
      {/* <button onClick={handleClick}>Next Question</button> */}
      <Link onClick={handleClick} to={`/game/${game_id}/question/${nextQuestionOrder}`}>Next Question</Link>
      {/* If questionOrder >= question quantity then show finish game which hits the games#end_game endpoint*/}
    </div>
  )
}

export default Question
