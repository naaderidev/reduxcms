import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../Components/Title";
import Modal from "../../Components/Modal";
import DeleteModal from "../../Components/DeleteModal";
import EditCommentModal from "./components/EditCommentModal";
import ShowContentModal from "./components/ShowContentModal";
import CommentFilter from "./components/CommentFilter";
import Pagination from "../../Components/Pagination";
import Loading from "../../Components/Loading";
import {
  getAllCommentsFromServer,
  removeCommentFromServer,
} from "../../Redux/store/Comments";
import {
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiMiniEye,
  HiMiniEyeSlash,
} from "react-icons/hi2";

export default function Comments() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [shownComments, setShownComments] = useState(comments);
  const [mainComment, setMainComment] = useState({});
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    dispatch(getAllCommentsFromServer());
  }, []);

  const removeCommentHandler = (commentObj) => {
    setMainComment(commentObj);
    setCurrentModal("delete");
  };
  const editCommentHandler = (commentObj) => {
    setMainComment(commentObj);
    setCurrentModal("edit");
  };
  const showContentHandler = (commentObj) => {
    setMainComment(commentObj);
    setCurrentModal("content");
  };

  return (
    <>
      <Title title="لیست تمامی دیدگاه ها" />
      {shownComments.length ? (
        <Pagination
          items={comments}
          pathName={"/comments"}
          setShownItems={setShownComments}
          filterElement={<CommentFilter />}
        >
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام دوره</th>
                <th>وضعیت نمایش</th>
                <th>امتیاز</th>
                <th>متن پیام</th>
                <th className="hidden sm:table-cell">آی دی کاربر</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {shownComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.courseId}</td>
                  <td>
                    {Number(comment.isActive) ? (
                      <div className="flex-center gap-2">
                        <span className="hidden sm:table-cell">نمایش</span>
                        <HiMiniEye className="icon-md text-teal-800" />
                      </div>
                    ) : (
                      <div className="flex-center gap-2">
                        <span className="hidden sm:table-cell">مخفی</span>
                        <HiMiniEyeSlash className="icon-md text-red-500" />
                      </div>
                    )}
                  </td>
                  <td>{comment.score}</td>
                  <td>
                    <button
                      className="bg-green-200 px-3 py-1 rounded-md shadow-sm hover:shadow-lg"
                      onClick={() => showContentHandler(comment)}
                    >
                      متن پیام
                    </button>
                  </td>
                  <td className="hidden sm:table-cell">{comment.userId}</td>
                  <td>
                    <button
                      className="cms-btn delete"
                      onClick={() => removeCommentHandler(comment)}
                    >
                      <span className="hidden sm:inline-flex">حذف</span>
                      <HiOutlineTrash className="icon-sm" />
                    </button>
                    <button
                      className="cms-btn"
                      onClick={() => editCommentHandler(comment)}
                    >
                      <span className="hidden sm:inline-flex">ویرایش</span>
                      <HiOutlinePencilSquare className="icon-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Pagination>
      ) : (
        <Loading />
      )}

      {currentModal && (
        <Modal>
          {currentModal === "delete" ? (
            <DeleteModal
              closeModal={() => setCurrentModal(null)}
              confirmModal={() =>
                dispatch(removeCommentFromServer(mainComment.id))
              }
            />
          ) : currentModal === "edit" ? (
            <EditCommentModal
              commentId={mainComment.id}
              closeModal={() => setCurrentModal(null)}
            />
          ) : (
            <ShowContentModal
              content={mainComment.message}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
