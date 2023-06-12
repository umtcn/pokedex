import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import pokemonReducer from "../features/pokemons/pokemonSlice";
import pokemonDetailReducer from "features/pokemons/pokemonDetailSlice";
import favoritesReducer from "features/favorites/favoritesSlice";
import searchReducer from "features/search/searchSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    pokemons: pokemonReducer,
    pokemon: pokemonDetailReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
