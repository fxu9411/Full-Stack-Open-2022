import { useState } from 'react'

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
      <p>
        Good: {props.good}
      </p>
      <p>
        Neutral: {props.neutral}
      </p>
      <p>
        Bad: {props.bad}
      </p>
      <p>
        All: {props.good + props.neutral + props.bad}
      </p>
      <p>
        Average: {(props.good - props.bad) / (props.good + props.neutral + props.bad)}
      </p>
      <p>
        Positive: {props.good / (props.good + props.neutral + props.bad) * 100}%
      </p>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.setValue}>{props.text}</button>
    </div>
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
      <Button setValue={setGood(good + 1)} text={"Good"} />
      <Button setValue={setGood(neutral + 1)} text={"Neutral"} />
      <Button setValue={setGood(bad + 1)} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;