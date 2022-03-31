import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>Total {props.total}</p>
      <p>Average {props.totalScore / props.total}</p>
      <p>Positive {props.good / props.total}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const setGoodClick = (goodValue) => {
    setGood(goodValue);
    setTotal(total + 1);
    setTotalScore(totalScore + 1);
  };

  const setNeutralClick = (neutralValue) => {
    setNeutral(neutralValue);
    setTotal(total + 1);
  };

  const setBadClick = (badValue) => {
    setBad(badValue);
    setTotal(total + 1);
    setTotalScore(totalScore - 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGoodClick(good + 1)}>good</button>
      <button onClick={() => setNeutralClick(neutral + 1)}>neutral</button>
      <button onClick={() => setBadClick(bad + 1)}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} />
    </div>
  );
};

export default App;
