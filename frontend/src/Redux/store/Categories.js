import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllCategoriesFromServer = createAsyncThunk(
  "categories/getAllCategoriesFromServer",
  async () => {
    return fetch(`${BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
  },
});

export default slice.reducer;
