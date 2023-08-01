import { createContext, useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/globalReducer";
import axios from "axios";
import {
  ADD_TO_FAVOURITES,
  GET_FAVOURITES,
  GET_RANDOM,
  GET_SEARCH,
  GET_TRENDING,
  LOADING,
} from "../utils/globalActions";
import { type } from "@testing-library/user-event/dist/type";

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

  // SAVE to favourites
  const saveToFavourites = (gif) => {
    const storedItems = JSON.parse(localStorage.getItem("Myfavourites")) || [];
    // adding items on the local storage if it is not yet added to liked
    if (!storedItems.some((item) => item.id === gif.id)) {
      const items = [...storedItems, gif];
      localStorage.setItem("Myfavourites", JSON.stringify(items));
      dispatch({ type: ADD_TO_FAVOURITES, payload: gif });
      alert("added to liked!");
    } else {
      alert("already exists");
    }
  };
  // getting favourite from localstorage
  const getFromLocalStorage = () => {
    const storedItems = JSON.parse(localStorage.getItem("Myfavourites")) || [];
    dispatch({ type: GET_FAVOURITES, payload: storedItems });
  };
  // removing giff localstorage
  const removeFromLocalStorage = (gif) => {
    const storedItems = JSON.parse(localStorage.getItem("Myfavourites"));
    const items = storedItems.filter((item) => item.id !== gif.id);
    localStorage.setItem("Myfavourites", JSON.stringify(items));
    getFromLocalStorage();
  };
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getRandom,
        getSearch,
        saveToFavourites,
        getFromLocalStorage,
        removeFromLocalStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
