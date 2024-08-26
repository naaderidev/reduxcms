import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Pagination({
  items,
  pathName,
  setShownItems,
  filterElement,
  children,
}) {
  const [pageCount, setPageCount] = useState(null);
  const [itemsCount, setItemsCount] = useState(4);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownItems(paginatedItems);

    let pagesNumber = Math.ceil(items.length / itemsCount);
    setPageCount(pagesNumber);
  }, [page, items, itemsCount]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm bg-green-200 py-2 px-4 w-full">
        {filterElement}
        <div className="flex items-center gap-2">
          <span className="text-sm text-teal-800 font-Lalezar">
            تعداد نمایش داده شده
          </span>
          <select
            name=""
            id=""
            className="text-xs font-VazirMedium"
            onChange={(event) => {
              setItemsCount(event.target.value);
            }}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
      {children}
      <div className="flex-center gap-x-4 my-6 font-VazirMedium">
        <div className="flex gap-x-2">
          {Array(pageCount)
            .fill(0)
            .map((item, index) => (
              <Link
                to={`${pathName}/${index + 1}`}
                key={index}
                className={
                  index + 1 === Number(page)
                    ? "px-2 rounded cursor-pointer transition-all hover:bg-green-200 border border-teal-800"
                    : "px-2 rounded cursor-pointer transition-all hover:bg-green-200"
                }
              >
                {index + 1}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
