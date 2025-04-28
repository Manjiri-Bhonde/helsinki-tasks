import React from "react";
import StatisticLine from "./StatsLine";

const Statistics = ({ good, bad, neutral }) => {
  const sum = good + neutral + bad;
  const avg = sum / 3;
  const positiveAvg = sum > 0 ? (good / sum) * 100 : 0;
  {
    if (sum > 0) {
      return (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Total" value={sum} />
            <StatisticLine text="Avg" value={avg} />
            <StatisticLine text="Positive %" value={positiveAvg} />
          </tbody>
        </table>
      );
    } else {
      return <div>No feedback Given</div>;
    }
  }
};

export default Statistics;
