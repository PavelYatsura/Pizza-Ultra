import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart, { CART_KEY } from "./slices/cartSlice";
import pizzas from "./slices//pizzasSlise";
import { useDispatch } from "react-redux";
import { saveSorage } from "./storage";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
});

store.subscribe(() => {
  saveSorage(store.getState().cart, CART_KEY);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
