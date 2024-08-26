import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllCommentsFromServer,
  filterComments,
  filterShownComments,
} from "../../../Redux/store/Comments";

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
          event.target.value === "-1"
            ? dispatch(getAllCommentsFromServer())
            : event.target.value === "score"
            ? dispatch(filterComments(event.target.value))
            : dispatch(filterShownComments());
        }}
      >
        <option value="-1">پیش فرض</option>
        <option value="score">امتیاز کاربر</option>
        <option value="isActive">نمایش داده شده</option>
      </select>
    </div>
  );
}
