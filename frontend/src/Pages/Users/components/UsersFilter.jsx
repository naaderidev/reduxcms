import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllUsersFromServer,
  filterUsers
} from "../../../Redux/store/Users";

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
            ? dispatch(filterUsers(event.target.value))
            : dispatch(getAllUsersFromServer());
        }}
      >
        <option value="-1">پیش فرض</option>
        <option value="transaction">ترنزکشن</option>
        <option value="birthyear">سال تولد</option>
      </select>
    </div>
  );
}
