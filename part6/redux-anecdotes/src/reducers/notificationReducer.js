import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "Notifications are shown here", hide: true };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    voteNotification(state, action) {
      return { hide: false, message: "voted for " + action.payload };
    },
    hideNotification(state) {
      return { ...state, hide: true };
    },
    newAncdtNotification(state, action) {
      return { hide: false, message: "Created new note: " + action.payload };
    },
  },
});

export const { voteNotification, hideNotification, newAncdtNotification } =
  notificationSlice.actions;

export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(voteNotification(text));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
