import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product_id: number;
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
      const existingItem = state.items.find((item) => item.product_id === id);
      if (existingItem !== undefined) {
        existingItem.quantity++;
      } else {
        state.items.push({ product_id: id, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const indexToRemove = state.items.findIndex(
        (item) => item.product_id === idToRemove,
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
    setToCart: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product_id === productId,
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity = quantity;
      } else {
        state.items.push({ product_id: productId, quantity });
      }
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, setToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
