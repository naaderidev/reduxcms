import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllTeachersFromServer,
  filterTeachers,
} from "../../../Redux/store/Teachers";

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
            ? dispatch(filterTeachers(event.target.value))
            : dispatch(getAllTeachersFromServer());
        }}
      >
        <option value="-1">پیش فرض</option>
        <option value="courses">دوره های تدریس شده</option>
      </select>
    </div>
  );
}
