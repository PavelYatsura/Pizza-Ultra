import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FatchPizzasArgs = {
  sortBy: string;
  category: string;
  search: string;
  pageCount: number;
};

type DataType = {
  meta: { total_pages: number };
  items: PizzaItem[];
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: FatchPizzasArgs) => {
    const { category, sortBy, search, pageCount } = params;
    const { data } = await axios.get<DataType>(
      `https://efe9deefd29e1c95.mokky.dev/pizza?page=${pageCount}&limit=5&${category}&sortBy=${sortBy}${search}`
    );

    return data;
  }
);
type PizzaItem = {
  id: number;
  name: string;
  price: number;
  count: number;
  src: string;
  type: number[];
  size: number[];
};

interface PizzaSliseState {
  items: PizzaItem[];
  status: "loading" | "success" | "error";
  allPages: number;
}

const initialState: PizzaSliseState = {
  status: "loading",
  items: [],
  allPages: 1,
};
const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.allPages = action.payload.meta.total_pages;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
