import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (p) => p._id === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.cart.find(
        (p) => p._id === action.payload
      );
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find(
        (p) => p._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(
          (p) => p._id !== action.payload
        );
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );
    },
   clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
