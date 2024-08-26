import React from "react";

export default function Title({ title }) {
  return (
    <div className="flex items-center justify-start gap-2 py-4">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-700 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-800"></span>
      </span>
      <h1 className="text-xl text-teal-800 font-Lalezar">{title}</h1>
    </div>
  );
}
