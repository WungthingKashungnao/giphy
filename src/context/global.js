import { createContext, useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/globalReducer";
import axios from "axios";
import {
  GET_RANDOM,
  GET_SEARCH,
  GET_TRENDING,
  LOADING,
} from "../utils/globalActions";

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

  //   get random Gifs
  const getRandom = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/random?api_key=${apikey}&tag=&rating=g`
    );

    dispatch({ type: GET_RANDOM, payload: res.data.data });
  };

  //   get search restult Gifs
  const getSearch = async (query) => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/search?api_key=${apikey}&q=${query}&limit=30&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );

    dispatch({ type: GET_SEARCH, payload: res.data.data });
  };

  return (
    <GlobalContext.Provider value={{ ...state, getRandom, getSearch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
