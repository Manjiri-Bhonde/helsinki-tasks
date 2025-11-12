const initialState = "";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterChange = (string) => {
  return {
    type: "FILTER",
    payload: string,
  };
};

export default filterReducer;
