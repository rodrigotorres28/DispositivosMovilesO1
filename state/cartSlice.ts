import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

import { Product } from "../components/ProductsSectionList";

interface CartItem {
  product: Product;
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
    addToCart: (
      state,
      action: PayloadAction<{
        name: string;
        price: number;
        imagePath: ImageSourcePropType;
        id: number;
      }>,
    ) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productToAdd.id,
      ); //returns the item or undefined
      if (existingItem !== undefined) {
        existingItem.quantity++;
      } else {
        state.items.push({ product: productToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      const indexToRemove = state.items.findIndex(
        (item) => item.product.id === productIdToRemove,
      );
      if (indexToRemove !== -1) {
        // findIndex returns -1 if the item is not found
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
