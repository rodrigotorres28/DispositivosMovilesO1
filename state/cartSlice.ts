import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);
      if (existingItem !== undefined) {
        existingItem.quantity++;
      } else {
        state.items.push({ productId: id, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const indexToRemove = state.items.findIndex(
        (item) => item.productId === idToRemove,
      );
      if (indexToRemove !== -1) {
        const itemToRemove = state.items[indexToRemove];
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity--;
        } else {
          state.items.splice(indexToRemove, 1);
        }
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
