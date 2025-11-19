import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdt = event.target.anecdt.value;
    event.target.anecdt.value = "";
    dispatch(addNewAnecdote(anecdt));
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(event) => {
          addAnecdote(event);
        }}
      >
        <div>
          <input name="anecdt" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
