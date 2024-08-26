import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../Utils/constants";

export const getAllTeachersFromServer = createAsyncThunk(
  "teachers/getAllTeachersFromServer",
  async () => {
    return fetch(`${BASE_URL}/teachers`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const insertTeacherToServer = createAsyncThunk(
  "teachers/insertTeacherToServer",
  async (teacherObj) => {
    return fetch(`${BASE_URL}/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const filterTeachers = createAsyncThunk(
  "teachers/filterTeachers",
  async (filterParam) => {
    return fetch(`${BASE_URL}/teachers?_sort=${filterParam}`)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const removeTeacherFromServer = createAsyncThunk(
  "teachers/removeTeacherFromServer",
  async (teahcerId) => {
    return fetch(`${BASE_URL}/teachers/${teahcerId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateTeacherInServer = createAsyncThunk(
  "teachers/updateTeacherInServer",
  async (teacherObj) => {
    return fetch(`${BASE_URL}/teachers/${teacherObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherObj),
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "teachers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachersFromServer.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterTeachers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeTeacherFromServer.fulfilled, (state, action) => {
        const updateTeachers = state.filter(
          (teacher) => teacher.id !== action.payload.id
        );
        return updateTeachers;
      })
      .addCase(updateTeacherInServer.fulfilled, (state, action) => {
        let updateIndex = state.findIndex(
          (teacher) => teacher.id === action.payload.id
        );
        if (updateIndex !== -1) {
          state[updateIndex] = action.payload;
        }
        return state;
      });
  },
});

export default slice.reducer;
