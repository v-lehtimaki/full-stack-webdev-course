import { useState } from 'react'


const Header = ({headline}) => (
  <>
    <h1>{headline}</h1>
  </>
)

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

const Display = ({anecdote, votes}) => {
  return (
    <>
      <p>
        {anecdote}
      </p>
      <p>
        <span>has </span> <span>{votes}</span> <span> votes</span>
      </p>
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const textFields = {
    upperHeadline: "Anecdote Of The Day",
    lowerHeadline: "Anecdote With Most Votes",
  }

  const [points, setPoints] = useState(new Uint8Array(8));
  const [selected, setSelected] = useState(0)

  const randomIntInclusive = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const getMostVotedAnecdote = points => {

    const maxNumber = Math.max(...points);
    const maxIndex = points.indexOf(maxNumber);

    return { maxNumber, maxIndex };
  }

  const voteAnecdote = selected => {
    const copyOfPoints = [...points]
    copyOfPoints[selected] += 1

    setPoints(copyOfPoints);
    return selected
  }

  return (
    <div>
      <Header headline={textFields.upperHeadline} />
      <Display anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={() => setSelected(voteAnecdote(selected))} text="Vote" />
      <Button handleClick={() => setSelected(randomIntInclusive(0, 7))} text="Next anecdote" />
      <Header headline={textFields.lowerHeadline} />
      <Display anecdote={anecdotes[getMostVotedAnecdote(points).maxIndex]} votes={getMostVotedAnecdote(points).maxNumber} />
    </div>
  )
}

export default App