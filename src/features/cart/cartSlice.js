import { createSlice } from "@reduxjs/toolkit";
import { ErrorPopup } from "examples/ErrorPopup";
import Swal from "sweetalert2";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const fetchItemCount = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart")).length;
  } else {
    return 0;
  }
};

const setStoreLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
  itemCount: fetchItemCount(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isInItemCart = state.carts.find((item) => item.id === action.payload.id);

      if (isInItemCart) {
        ErrorPopup({ message: "You already caught this pokémon!" });
      } else {
        state.carts.push(action.payload);
        state.itemCount = state.carts.length;
        setStoreLocalStorage(state.carts);

        Swal.fire("Good job!", "You caught the Pokémon!", "success");
      }
    },
    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;

      state.itemCount = state.carts.length;

      setStoreLocalStorage(state.carts);

      Swal.fire("Good job!", "You released the Pokémon!", "success");
    },
    clearCart: (state) => {
      state.carts = [];
      setStoreLocalStorage(state.carts);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const getCartCount = (state) => state.itemCount;

export default cartSlice.reducer;
