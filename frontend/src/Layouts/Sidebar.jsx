import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineUsers,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBriefcase,
  HiArrowLeftOnRectangle,
  HiOutlineGift,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { FaLeaf } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <aside className=" h-screen border-l-2 border-white">
      <div className="flex-center  border-b-2 border-white">
        <FaLeaf className="icon-lg text-teal-800" />
        <h1 className="hidden md:block text-lg text-center text-teal-800 py-3 font-Lalezar">
          منوی پنل کاربری
        </h1>
        <FaLeaf className="icon-lg text-teal-800 rotate-180" />
      </div>
      <NavLink
        to="/login/phone"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiArrowLeftOnRectangle className="icon-sm" />
        <span className="hidden md:inline-flex">ورود | عضویت</span>
      </NavLink>

      <NavLink
        to="/courses/1"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiOutlineClipboardDocumentList className="icon-sm" />
        <span className="hidden md:inline-flex">دوره ها</span>
      </NavLink>

      <NavLink
        to="/users/1"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiOutlineUsers className="icon-sm" />
        <span className="hidden md:inline-flex">کاربران</span>
      </NavLink>

      <NavLink
        to="/teachers/1"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiOutlineBriefcase className="icon-sm" />
        <span className="hidden md:inline-flex">اساتید</span>
      </NavLink>

      <NavLink
        to="/discounts/1"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiOutlineGift className="icon-sm" />
        <span className="hidden md:inline-flex">تخفیف ها</span>
      </NavLink>

      <NavLink
        to="/comments/1"
        className={(link) => (link.isActive ? "active nav-link" : "nav-link")}
      >
        <HiOutlineChatBubbleLeftRight className="icon-sm" />
        <span className="hidden md:inline-flex">دیدگاه ها</span>
      </NavLink>
    </aside>
  );
}
