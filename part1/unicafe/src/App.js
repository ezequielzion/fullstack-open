import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  const noStats = good === 0 && neutral === 0 && bad === 0
  
  if(noStats){
    return (
      <p>No feedback given</p>
    )
  } else return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine
            text="good"
            value={good}
          />
          <StatisticLine
            text="neutral"
            value={neutral}
          />
          <StatisticLine
            text="bad"
            value={bad}
          />
          <StatisticLine
            text="all"
            value={all}
          />
          <StatisticLine
            text="average"
            value={average}
          />
          <StatisticLine
            text="positive"
            value={positive}
          />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / 3
  const positive = good / all

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button
          text="good"
          handleClick={() => setGood(good + 1)}
        />
        <Button
          text="neutral"
          handleClick={() => setNeutral(neutral + 1)}
        />
        <Button
          text="bad"
          handleClick={() => setBad(bad + 1)}
        />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App