import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllCommentsFromServer = createAsyncThunk(
  "comments/getAllCommentsFromServer",
  async () => {
    return fetch(`${BASE_URL}/comments`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterComments = createAsyncThunk(
  "comments/filterComments",
  async (filterParam) => {
    return fetch(`${BASE_URL}/comments?_sort=${filterParam}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterShownComments = createAsyncThunk(
  "comments/filterShownComments",
  async () => {
    return fetch(`${BASE_URL}/comments?isActive=1`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const removeCommentFromServer = createAsyncThunk(
  "comments/removeCommentFromServer",
  async (commentId) => {
    return fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateCommentInServer = createAsyncThunk(
  "comments/updateCommentInServer",
  async (commentObj) => {
    return fetch(`${BASE_URL}/comments/${commentObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterComments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterShownComments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeCommentFromServer.fulfilled, (state, action) => {
        const updateComments = state.filter(
          (comment) => comment.id !== action.payload.id
        );
        return updateComments;
      })
      .addCase(updateCommentInServer.fulfilled, (state, action) => {
        let updateIndex = state.findIndex(
          (comment) => comment.id === action.payload.id
        );
        if (updateIndex !== -1) {
          state[updateIndex] = action.payload;
        }
        return state;
      });
  },
});

export default slice.reducer;
