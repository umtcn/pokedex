import { createSlice } from "@reduxjs/toolkit";
import { ErrorPopup } from "examples/ErrorPopup";
import Swal from "sweetalert2";

const fetchFavoritesLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");

  if (favorites) {
    return JSON.parse(localStorage.getItem("favorites"));
  } else {
    return [];
  }
};

const fetchFavoriteItemsCount = () => {
  let favorites = localStorage.getItem("favorites");

  if (favorites) {
    return JSON.parse(localStorage.getItem("favorites")).length;
  } else {
    return 0;
  }
};

const setStoreFavoritesLocalStorage = (data) => {
  localStorage.setItem("favorites", JSON.stringify(data));
};

const initialState = {
  favorites: fetchFavoritesLocalStorage(),
  favoriteitemsCount: fetchFavoriteItemsCount(),
};

const favoritesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const isInItemFavorites = state.favorites.find((item) => item.id === action.payload.id);

      if (isInItemFavorites) {
        ErrorPopup({ message: "You've already added this pokémon to your favourite list!" });
      } else {
        state.favorites.push(action.payload);
        state.favoriteitemsCount = state.favorites.length;
        setStoreFavoritesLocalStorage(state.favorites);

        Swal.fire("Good job!", "You've added Pokémon to your Favourite List!", "success");
      }
    },
    removeFromFavorites: (state, action) => {
      const tempCart = state.favorites.filter((item) => item.id !== action.payload);
      state.favorites = tempCart;

      state.favoriteitemsCount = state.favorites.length;

      setStoreFavoritesLocalStorage(state.favorites);

      Swal.fire("Good job!", "You took Pokemon off your favourite list!", "success");
    },
    clearFavorites: (state) => {
      state.favorites = [];
      setStoreFavoritesLocalStorage(state.favorites);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export const getCartCount = (state) => state.favoriteitemsCount;

export default favoritesSlice.reducer;
