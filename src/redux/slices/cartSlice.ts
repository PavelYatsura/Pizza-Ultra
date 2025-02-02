import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loadState } from "../storage";

export const CART_KEY = "cart";

type CartItem = {
  id: number;
  name: string;
  price: number;
  count: number;
  src: string;
  type: string;
  size: number;
};

interface cartSliseState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: cartSliseState = loadState<cartSliseState>(CART_KEY) ?? {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count--;
        
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    deletedItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, deletedItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
