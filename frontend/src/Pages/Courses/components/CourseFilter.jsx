import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllCoursesFromServer,
  filterCoursesByCategory,
} from "../../../Redux/store/Courses";

export default function Filter() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-Lalezar text-teal-800">مرتب سازی</span>
      <select
        name=""
        id=""
        className="text-xs font-VazirMedium"
        onChange={(event) => {
          event.target.value !== "-1"
            ? dispatch(filterCoursesByCategory(event.target.value))
            : dispatch(getAllCoursesFromServer());
        }}
      >
        <option value="-1">بر اساس موضوع</option>
        <option value="frontend">فرانت اند</option>
        <option value="backend">بک اند</option>
        <option value="security">امنیت و شبکه</option>
      </select>
    </div>
  );
}
