import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes = new Array(anecdotes.length).fill(0);

  
  const voteAnecdote = (index) => {
    const newVotes = [...anecdotesVotes]
    newVotes[index] += 1
    setAnecdotesVotes(newVotes)
  }
   
  const [anecdotesVotes, setAnecdotesVotes] = useState(votes)
  const [selected, setSelected] = useState(0)

  const highestVoteCount = Math.max(...anecdotesVotes)
  const mostAnecdoteVotes = anecdotes[anecdotesVotes.indexOf(Math.max(...anecdotesVotes))]
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>{anecdotes[selected]}</div>
        <div> has {anecdotesVotes[selected]} votes</div>
        <Button onClick={() => voteAnecdote(selected)} text='vote' />
        <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>
          {mostAnecdoteVotes}
        </div>
        <div> has {highestVoteCount} votes</div>
      </div>
    </div>
  )
}

export default App