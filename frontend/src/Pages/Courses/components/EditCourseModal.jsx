import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BASE_URL from "../../../Utils/constants";
import insertCourseSchema from "../../../Utils/Validation/insertCourse";
import { updateCourseInServer } from "../../../Redux/store/Courses";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function EditCourseModal(props) {
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(insertCourseSchema),
    resetOptions: {
      keepDirty: false,
    },
    defaultValues: async () => {
      const result = await fetch(`${BASE_URL}/courses?id=${props.courseId}`)
        .then((res) => res.json())
        .then((data) => data[0]);
      return {
        title: result.title,
        teacher: result.teacher,
        category: result.category,
        price: result.price,
        duration: result.duration,
        image: result.image,
      };
    },
  });
  const formSubmitHandler = (newCourse) => {
    dispatch(updateCourseInServer({...newCourse, id: props.courseId}));
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
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="course-title">عنوان دوره</label>
            <input type="text" id="course-title" {...register("title")} />
            {errors.title && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="course-teacher">مدرس دوره</label>
            <input type="text" id="course-teacher" {...register("teacher")} />
            {errors.teacher && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.teacher.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="course-category">دسته بندی دوره</label>
            <input type="text" id="course-category" {...register("category")} />
            {errors.category && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.category.message}
              </span>
            )}
            {errors.category && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="course-price">قیمت دوره</label>
            <input type="text" id="course-price" {...register("price")} />
            {errors.price && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="course-duration">مدت زمان دوره (ساعت)</label>
            <input type="text" id="course-duration" {...register("duration")} />
            {errors.duration && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.duration.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="course-image">کاور دوره</label>
            <input type="text" id="course-image" {...register("image")} />
            {errors.image && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ویرایش دوره</button>
      </form>
    </div>
  );
}
