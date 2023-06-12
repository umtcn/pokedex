import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "global";
import { ErrorPopup } from "examples/ErrorPopup";
import getData from "../api/request";

const initialState = {
  pokemon: {},
};

export const fetchPokemonDetailInfo = createAsyncThunk(
  "pokemon/fetchPokemonDetailInfo",
  async (pokemonId) => {
    try {
      const response = await getData(`${baseURL}/pokemon/${pokemonId}`);
      return response;
    } catch (error) {
      ErrorPopup({ message: error });
      return;
    }
  }
);

const pokemonDetailSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemonDetailInfo.fulfilled]: (state, action) => ({ ...state, pokemon: action.payload }),
  },
});

export const getPokemonsDetailInfo = (state) => state.pokemon;
export default pokemonDetailSlice.reducer;
