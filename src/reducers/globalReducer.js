import { GET_TRENDING, LOADING } from "../utils/globalActions";

export const globalReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_TRENDING:
      return { ...state, loading: false, trending: action.payload };
    default:
      break;
  }
  return state;
};
