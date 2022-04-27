import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>
          No Feedback Given
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="average" value={((props.good - props.bad) / (props.good + props.neutral + props.bad)).toFixed(2)} />
          <StatisticLine text="positive" value={(props.good / (props.good + props.neutral + props.bad) * 100).toFixed(2) + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.setValue}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button setValue={() => setGood(good + 1)} text={"Good"} />
      <Button setValue={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button setValue={() => setBad(bad + 1)} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;