import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllCoursesFromServer = createAsyncThunk(
  "courses/getAllCoursesFromServer",
  async () => {
    return fetch(`${BASE_URL}/courses`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterCoursesByCategory = createAsyncThunk(
  "courses/filterCoursesByCategory",
  async (categoryName) => {
    return fetch(`${BASE_URL}/courses?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const removeCourseFromServer = createAsyncThunk(
  "courses/removeCourseFromServer",
  async (courseId) => {
    return fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const insertCourseToServer = createAsyncThunk(
  "courses/insertCourseToServer",
  async (courseObj) => {
    return fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateCourseInServer = createAsyncThunk(
  "courses/updateCourseInServer",
  async (courseObj) => {
    return fetch(`${BASE_URL}/courses/${courseObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeCourseFromServer.fulfilled, (state, action) => {
        const updateCourses = state.filter(
          (course) => course.id !== action.payload.id
        );
        return updateCourses;
      })
      .addCase(updateCourseInServer.fulfilled, (state, action) => {
        let updateIndex = state.findIndex(
          (course) => course.id === action.payload.id
        );
        if (updateIndex !== -1) {
          state[updateIndex] = action.payload;
        }
        return state;
      })
      .addCase(insertCourseToServer.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(filterCoursesByCategory.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default slice.reducer;
