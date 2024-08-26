import React from "react";

export default function Modal(props) {
  return <div className="modal active">
    {props.children}
  </div>;
}

