import { createContext, useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/globalReducer";
import axios from "axios";
import { GET_TRENDING, LOADING } from "../utils/globalActions";

const GlobalContext = createContext();
const apikey = process.env.REACT_APP_API_KEY;
const baseUrl = "https://api.giphy.com/v1/gifs";

export const GlobalProvider = ({ children }) => {
  useEffect(() => {
    getTrending();
  }, []);

  // initial state of the reducer
  const initialState = {
    loading: false,
    searchResults: [],
    trending: [],
    favourites: [],
    random: {},
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);

  //   get trending Gifs
  const getTrending = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/trending?api_key=${apikey}&limit=30`
    );

    dispatch({ type: GET_TRENDING, payload: res.data.data });
  };
  console.log(state);

  return (
    <GlobalContext.Provider value={"hello"}>{children}</GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
