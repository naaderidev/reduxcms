import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlinePower } from "react-icons/hi2";

export default function Header() {
  return (
    <header className="bg-green-100 border-b-2 border-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="profile"
            className="flex-center rounded-full w-16 h-16 border-2 border-teal-800"
          />
          <div className="hidden md:block font-VazirMedium text-teal-800">
            <h1 className="text-base">بهاره نادری</h1>
            <h3 className="text-sm">09193571290</h3>
            <h6 className="text-sm">naaderidev@gmail.com</h6>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <div className="hidden md:flex-center bg-white px-3 py-1 rounded-md">
              <input
                type="search"
                placeholder="جستجو کنید..."
                className="text-sm font-VazirMedium border-none outline-none bg-transparent"
              />
              <button className="hover:text-orange-300 transition-colors">
                <HiOutlineMagnifyingGlass className="icon-md" />
              </button>
            </div>
            <Link to="/" className="hover:text-orange-300 transition-colors">
              <HiOutlinePower className="icon-md" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
