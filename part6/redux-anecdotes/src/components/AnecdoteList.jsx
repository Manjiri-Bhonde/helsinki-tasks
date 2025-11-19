import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";

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

  const vote = (content) => {
    dispatch(updateVote(content));
  };
  console.log(anecdotes);
  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => a.votes - b.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  vote(anecdote);
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
