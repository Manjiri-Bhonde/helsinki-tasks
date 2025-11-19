import { createSlice } from "@reduxjs/toolkit";
import {
  createNewAnecdote,
  getAll,
  voteForAnaecdote,
} from "../services/anecdotes";
import {
  hideNotification,
  newAncdtNotification,
  setNotification,
} from "./notificationReducer";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },

    voteFor(state, action) {
      const id = action.payload.id;

      // const newAnedt = state.find((andt) => andt.id === id);
      // const changedAncdt = {
      //   ...newAnedt,
      //   votes: newAnedt.votes + 1,
      // };
      return state.map((obj) => (obj.id !== id ? obj : action.payload));
    },
  },
});
export const { voteFor, setAnecdotes, createAnecdote } = anecdoteSlice.actions;

export const initializeApp = () => {
  return async (dispatch) => {
    const response = await getAll();
    dispatch(setAnecdotes(response));
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const response = await createNewAnecdote(content);
    dispatch(createAnecdote(response));
    dispatch(newAncdtNotification(response.content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const response = await voteForAnaecdote(anecdote);
    dispatch(voteFor(response));
    dispatch(setNotification(`${response.content}`,1000));
  };
};
export default anecdoteSlice.reducer;
