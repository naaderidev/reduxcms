import React from "react";

export default function ShowContentModal(props) {
  return (
    <div className="modal-wrapper w-1/2">
      <p>{props.content}</p>
      <button className="modal-btn accept-btn my-4" onClick={props.closeModal}>
        بستن پیام
      </button>
    </div>
  );
}
