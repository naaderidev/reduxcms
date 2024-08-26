import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllDiscountsFromServer,
  filterDiscounts
} from "../../../Redux/store/Discounts";

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
            ? dispatch(filterDiscounts(event.target.value))
            : dispatch(getAllDiscountsFromServer());
        }}
      >
        <option value="-1">پیش فرض</option>
        <option value="percent">درصد تخفیف</option>
      </select>
    </div>
  );
}
