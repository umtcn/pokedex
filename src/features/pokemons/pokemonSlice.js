import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "global";
import { ErrorPopup } from "examples/ErrorPopup";
import getData from "../api/request";

const initialState = {
  pokemons: [],
  offset: 0,
};

export const fetchPokemonInfo = createAsyncThunk(
  "pokemon/fetchPokemonInfo",
  async (pokemonListOffset) => {
    try {
      const response = await getData(`${baseURL}/pokemon?limit=50&offset=${pokemonListOffset}`);
      localStorage.setItem("allPokemonCount", JSON.stringify(response?.count));

      const pokemonUrls = response.results.map((pokemon) => pokemon.url);

      const pokemonDetails = await Promise.all(pokemonUrls.map((url) => getData(url)));

      return pokemonDetails;
    } catch (error) {
      ErrorPopup({ message: error });
    }
    return [];
  }
);

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    onClickLoadMore: (state) => {
      state.offset += 50;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonInfo.fulfilled, (state, action) => {
      state.pokemons.push(...action.payload);
    });
  },
});

export const { onClickLoadMore } = pokemonSlice.actions;
export const getPokemonsInfo = (state) => state.pokemons;
export const getPokemonsOffset = (state) => state.offset;
export default pokemonSlice.reducer;
