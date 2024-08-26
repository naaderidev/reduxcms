import React from "react";

export default function DeleteModal(props) {
  return (
    <div className="modal-wrapper">
      <h1>آیا از عملیات حذف اطمینان دارید؟!</h1>
      <div className="modal-btns">
        <button
          className="modal-btn accept-btn"
          onClick={() => {
            props.confirmModal();
            props.closeModal();
          }}
        >
          بله
        </button>
        <button className="modal-btn reject-btn" onClick={props.closeModal}>
          خیر
        </button>
      </div>
    </div>
  );
}
