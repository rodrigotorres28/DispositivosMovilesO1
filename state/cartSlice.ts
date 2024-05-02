import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartItem {
  product: { name: string; price: number; imagePath: string; id: number };
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ name: string; price: number; imagePath: string; id: number }>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.product.id === productToAdd.id); //devuelve el item o undefined
      if (existingItem != undefined) { // si el item existe aumenta la cantidad sino lo agrega a la lista
        existingItem.quantity++;
      } else {
        state.items.push({ product: productToAdd, quantity: 1 });
      }
      console.log(state)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      const indexToRemove = state.items.findIndex(item => item.product.id === productIdToRemove);
      if (indexToRemove !== -1) {// findIndex devuelve -1 si no encuentra el item
        const itemToRemove = state.items[indexToRemove];
        if (itemToRemove.quantity > 1) { //reduce la cantidad del producto o lo elimina si hay 1 o más
          itemToRemove.quantity--;
        } else {
          state.items.splice(indexToRemove, 1);
        }
      }
      console.log(state)
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
