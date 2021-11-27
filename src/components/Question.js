import React, { useState, useEffect } from "react"
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import he from 'he'

const Question = (props) =>{
  const [questionOrder, setQuestionOrder] = useState(1)
  const [prompt, setPrompt] = useState()
  const [answer, setAnswer] = useState()

  const [toNextQuestion, setToNextQuestion] = useState(false)

  const game_id = props.match.params.game_id
  const question_quantity = props.location.state.question_quantity
  
  const htmlDecode = (input) => {
    return he.decode(input)
  }

  

  useEffect(() => {    
    axios.post(`http://localhost:3000/api/games/${game_id}/questions/${questionOrder}`, {game_id}).then((response) => {
      const prompt = htmlDecode(response.data.prompt)
      const answer = htmlDecode(response.data.answer)

      setQuestionOrder(1)
      setPrompt(prompt)
      setAnswer(answer)
    })
  }, [game_id, questionOrder])
   
  return (
    <div>
      <p>Question: { prompt }</p>
      <p>Answer: { answer }</p>
    </div>
  )
}

export default Question
