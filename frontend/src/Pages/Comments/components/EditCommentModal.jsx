import React from 'react'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import BASE_URL from '../../../Utils/constants';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { updateCommentInServer } from '../../../Redux/store/Comments';

export default function EditCommentModal(props) {
    const dispatch = useDispatch();

    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resetOptions: {
        keepDirty: false,
      },
      defaultValues: async () => {
        const result = await fetch(`${BASE_URL}/comments?id=${props.commentId}`)
          .then((res) => res.json())
          .then((data) => data[0]);
        return {
          message: result.message,
          courseId: result.courseId,
          userId: result.userId,
          isActive: result.isActive,
          score: result.score,
        };
      },
    });
    const formSubmitHandler = (newComment) => {
      dispatch(updateCommentInServer({...newComment, id: props.commentId}));
      props.closeModal()
      reset();
    };
  
    return (
      <div className="modal active">
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="p-4 bg-white rounded-md"
        >
          <div className="flex-center gap-2 py-6 text-teal-800">
            <HiOutlinePencilSquare className="icon-md" />
            <h1 className="text-lg text-center  font-Lalezar">
              لطفا اصلاحات مورد نظر را انجام دهید...
            </h1>
          </div>
          <div className="">
            <div className="edit-form-col-50">
              <label htmlFor="comment-message">متن کامنت</label>
              <textarea cols={10} rows={10} id="comment-message" {...register("message")} />
              {errors.message && (
                <span className="text-xs text-red-500 font-VazirMedium">
                  {errors.message.message}
                </span>
              )}
            </div>
            <div className="edit-form-col-50">
              <label htmlFor="comment-isActive">وضعیت نمایش</label>
              <input type="text" id="comment-isActive" {...register("isActive")} />
              {errors.isActive && (
                <span className="text-xs text-red-500 font-VazirMedium">
                  {errors.isActive.message}
                </span>
              )}
            </div>
          </div>
          <button className="btn-form w-fit mr-4">ویرایش دیدگاه</button>
        </form>
      </div>
    );
}
