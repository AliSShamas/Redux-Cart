import { createSlice } from "@reduxjs/toolkit";
// import { cartActions } from './cart-slice';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      console.log("addItemToCart reducer called:", state.items);
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.changed = true;
      state.totalQuantity++; 
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
   replaceCart(state,action){
    state.totalQuantity=action.payload.totalQuantity;
    state.items=action.payload.items;
   }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
