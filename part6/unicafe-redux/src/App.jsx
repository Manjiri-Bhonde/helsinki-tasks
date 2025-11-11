import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const values = useSelector((state) => state);
  return (
    <div>
      <button onClick={() => dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => dispatch({ type: "OK" })}>ok</button>
      <button onClick={() => dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => dispatch({ type: "RESET" })}>reset stats</button>
      <div>good {values.good}</div>
      <div>ok {values.ok}</div>
      <div>bad{values.bad}</div>
    </div>
  );
};

export default App;
