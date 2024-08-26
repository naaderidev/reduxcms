import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllDiscountsFromServer = createAsyncThunk(
  "discounts/getAllDiscountsFromServer",
  async () => {
    return fetch(`${BASE_URL}/discounts`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterDiscounts = createAsyncThunk(
  "discounts/filterDiscounts",
  async (filterParam) => {
    return fetch(`${BASE_URL}/discounts?_sort=${filterParam}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const insertDiscountToServer = createAsyncThunk(
  "discounts/insertDiscountToServer",
  async (discountObj) => {
    return fetch(`${BASE_URL}/discounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discountObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const removeDiscountFromServer = createAsyncThunk(
  "discounts/removeDiscountFromServer",
  async (discountId) => {
    return fetch(`${BASE_URL}/discounts/${discountId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateDiscountInServer = createAsyncThunk(
  "discounts/updateDiscountInServer",
  async (discountObj) => {
    return fetch(`${BASE_URL}/discounts/${discountObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discountObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "discounts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDiscountsFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterDiscounts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeDiscountFromServer.fulfilled, (state, action) => {
        const updateDiscounts = state.filter(
          (discount) => discount.id !== action.payload.id
        );
        return updateDiscounts;
      })
      .addCase(insertDiscountToServer.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(updateDiscountInServer.fulfilled, (state, action) => {
        let updateIndex = state.findIndex(
          (discount) => discount.id === action.payload.id
        );
        if (updateIndex !== -1) {
          state[updateIndex] = action.payload;
        }
        return state;
      });
  },
});

export default slice.reducer;
