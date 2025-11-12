import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  voteNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);

  const anecdotes = useSelector((state) => {
    if (filter === "") return state.anecdotes;
    else
      return state.anecdotes.filter((string) =>
        string.content.includes(filter)
      );
  });

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteFor(id));
    dispatch(voteNotification(content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => a.votes - b.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
