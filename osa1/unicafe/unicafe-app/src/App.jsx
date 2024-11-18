import { useState } from 'react'

const Header = ({headline}) => (
  <>
    <h1>{headline}</h1>
  </>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({textFields, good, neutral, bad}) => {

  let total = good + neutral + bad
  let average, positiveFeedback

  const calculateAverage = total => (((good * 1) + (neutral * 0) + (bad * (-1))) / (total))
  const calculatePositiveFeedback = total => (((good) / (total)) * 100)   

  if (total !== 0) {
    average = calculateAverage(total)
    positiveFeedback = calculatePositiveFeedback(total)

    return (
      <>
        <p>
          <span>{textFields.good}</span> <span>{good}</span>
        </p>
        <p>
          <span>{textFields.neutral}</span> <span>{neutral}</span>
        </p>
        <p>
          <span>{textFields.bad}</span> <span>{bad}</span>
        </p>
        <p>
          <span>{textFields.all}</span> <span>{total}</span>
        </p>
        <p>
          <span>{textFields.average}</span> <span>{average}</span>
        </p>
        <p>
          <span>{textFields.positive}</span> <span>{positiveFeedback} %</span>
        </p>
      </>
    )
  } else {
    total = 0
    average = 0
    positiveFeedback = 0

    return (
      <>
        <p>
          <span>{textFields.nofeedback}</span>
        </p>
      </>
    )
  }
}

const App = () => {

  const headlines = {
    headlineFeedback: "Give Feedback",
    headlineStatistics: "Statistics"
  }
    
  const textFields = {
    good: "Good",
    neutral: "Neutral",
    bad: "Bad",
    all: "All",
    average: "Average",
    positive: "Positive",
    nofeedback: "No feedback given"
  }

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header headline={headlines.headlineFeedback} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header headline={headlines.headlineStatistics} />
      <Statistics textFields={textFields} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App