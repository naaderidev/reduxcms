import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "./store/Courses";
import categoriesReducer from "./store/Categories";
import teachersReducer from "./store/Teachers";
import usersReducer from "./store/Users";
import commentsReducer from "./store/Comments";
import discountsReducer from "./store/Discounts";

export default configureStore({
  reducer: {
    courses: coursesReducer,
    categories: categoriesReducer,
    teachers: teachersReducer,
    users: usersReducer,
    comments: commentsReducer,
    discounts: discountsReducer,
  },
});
