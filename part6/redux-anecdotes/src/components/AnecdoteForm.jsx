import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, newAncdtNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdt = event.target.anecdt.value;
    event.target.anecdt.value = "";
    dispatch(createAnecdote(anecdt));
    dispatch(newAncdtNotification(anecdt));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
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
