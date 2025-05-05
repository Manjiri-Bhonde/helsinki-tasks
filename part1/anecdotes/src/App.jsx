import { useState } from "react";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    setSelected(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  const handleVoteClick = () => {
    console.log({ ...votes, [selected]: votes[selected] + 1 });
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const findHighestVotes = () => {
    let arr = Object.values(votes);
    let max = Math.max(...arr);
    const key = Object.keys(votes).find((key) => votes[key] === max);
    console.log(key);
    return [anecdotes[key],max];
  };
  return (
    <>
      <div>
        <h2> {anecdotes[selected]}</h2>
        has {votes[selected]} votes
        <br />
        <Button text="next anecdotes" onClick={() => getRandomInt(1, 7)} />
        <Button text="vote" onClick={() => handleVoteClick()} />
      </div>
      <div>
        <h2>Anecdotes with most votes</h2>
        <p>{findHighestVotes()[0]}</p>
        has {findHighestVotes()[1]} votes
      </div>
    </>
  );
};

export default App;
