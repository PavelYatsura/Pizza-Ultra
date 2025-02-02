import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortType = {
  name: string;
  sortProperty: "rating" | "name" | "-rating" | "price" | "-price";
};

export interface filterStateInterface {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort: SortType;
}

const initialState: filterStateInterface = {
  searchValue: "",
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "Имени",
    sortProperty: "name",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  // actions
  reducers: {
    setCategoruId(state, action: PayloadAction<number>) {
      // в стейт сохроняем то что пойдет в актион
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<filterStateInterface>) {
      state.pageCount = action.payload.pageCount;
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoruId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
