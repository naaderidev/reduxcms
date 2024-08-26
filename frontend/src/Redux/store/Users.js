import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllUsersFromServer = createAsyncThunk(
  "users/getAllUsersFromServer",
  async () => {
    return fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterUsers = createAsyncThunk(
  "users/filterUsers",
  async (filterParam) => {
    return fetch(`${BASE_URL}/users?_sort=${filterParam}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const insertUserToServer = createAsyncThunk(
  "users/insertUserToServer",
  async (userObj) => {
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const removeUserFromServer = createAsyncThunk(
  "users/removeUserFromServer",
  async (userId) => {
    return fetch(`${BASE_URL}/users/${userId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeUserFromServer.fulfilled, (state, action) => {
        const updateUsers = state.filter(
          (user) => user.id !== action.payload.id
        );
        return updateUsers;
      })
      .addCase(insertUserToServer.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export default slice.reducer;
