import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Title from "../../Components/Title";
import Modal from "../../Components/Modal";
import Pagination from "../../Components/Pagination";
import CourseFilter from "./components/CourseFilter";
import DeleteModal from "../../Components/DeleteModal";
import EditCourseModal from "./components/EditCourseModal";
import { getAllCategoriesFromServer } from "../../Redux/store/Categories";
import { getAllTeachersFromServer } from "../../Redux/store/Teachers";
import insertCourseSchema from "../../Utils/Validation/insertCourse";
import Loading from "../../Components/Loading";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import {
  getAllCoursesFromServer,
  insertCourseToServer,
  removeCourseFromServer,
} from "../../Redux/store/Courses";

export default function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const categories = useSelector((state) => state.categories);
  const teachers = useSelector((state) => state.teachers);
  const [mainCourse, setMainCourse] = useState(null);
  const [shownCourses, setShownCourses] = useState(courses);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    dispatch(getAllCoursesFromServer());
    dispatch(getAllCategoriesFromServer());
    dispatch(getAllTeachersFromServer());
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      teacher: "-1",
      category: "-1",
      price: "",
      duration: "",
      image: "",
    },
    resolver: yupResolver(insertCourseSchema),
    resetOptions: {
      keepDirty: false,
    },
  });

  const formSubmitHandler = (newCourse) => {
    dispatch(insertCourseToServer(newCourse));
    reset();
  };

  const removeCourseHandler = (courseObj) => {
    setMainCourse(courseObj);
    setCurrentModal("delete");
  };

  const editCourseHandler = (courseObj) => {
    setMainCourse(courseObj);
    setCurrentModal("edit");
  };

  return (
    <>
      <Title title="افزودن دوره آموزشی جدید" />
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="pb-4 border-b-2 border-white"
      >
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="course-title">عنوان دوره</label>
            <input
              type="text"
              id="course-title"
              {...register("title")}
              placeholder="عنوان دوره را وارد نمایید"
            />
            {errors.title && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="course-teacher">مدرس دوره</label>
            <select id="course-teacher" {...register("teacher")}>
              <option value="-1">مدرس دوره را انتخاب کنید</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.name}>
                  {teacher.name}
                </option>
              ))}
            </select>
            {errors.teacher && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.teacher.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="course-category">دسته بندی دوره</label>
            <select id="course-category" {...register("category")}>
              <option value="-1">
                لطفا دوره آموزشی را در دسته بندی مناسب قرار دهید
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.value}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.category.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="course-price">قیمت دوره</label>
            <input
              type="text"
              id="course-price"
              {...register("price", {
                // required: "وارد کردن هزینه دوره الزامی است",
                // validate: (value) => {
                //   return (
                //     Number(value) !== 0 || "لطفا از کلمه رایگان استفاده کنید"
                //   );
                // },
              })}
              placeholder="قیمت دوره را وارد نمایید"
            />
            {errors.price && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="course-duration">مدت زمان دوره</label>
            <input
              type="text"
              id="course-duration"
              {...register("duration")}
              placeholder="مدت زمان دوره را وارد نمایید"
            />
            {errors.duration && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.duration.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="course-image">کاور دوره</label>
            <input
              type="text"
              id="course-image"
              {...register("image")}
              placeholder="use this website: https://devicon.dev"
            />
            {errors.image && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.image.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ثبت دوره</button>
      </form>
      <Title title="لیست دوره های آموزشی" />
      {shownCourses.length ? (
        <Pagination
          items={courses}
          pathName={"/courses"}
          setShownItems={setShownCourses}
          filterElement={<CourseFilter />}
        >
          <table className="cms-table">
            <thead>
              <tr>
                <th className="hidden sm:table-cell">کاور</th>
                <th>عنوان</th>
                <th>مدرس</th>
                <th>موضوع</th>
                <th className="hidden sm:table-cell">قیمت</th>
                <th className="hidden sm:table-cell">زمان</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {shownCourses.map((course) => (
                <tr key={course.id}>
                  <td className="hidden sm:table-cell">
                    <img className="cms-image" src={course.image} alt="" />
                  </td>
                  <td>{course.title}</td>
                  <td>{course.teacher}</td>
                  <td>{course.category}</td>
                  <td className="hidden sm:table-cell">
                    {Number(course.price).toLocaleString()} تومان
                  </td>
                  <td className="hidden sm:table-cell">
                    {course.duration} ساعت
                  </td>
                  <td>
                    <button
                      className="cms-btn delete"
                      onClick={() => removeCourseHandler(course)}
                    >
                      <span className="hidden sm:inline-flex">حذف</span>
                      <HiOutlineTrash className="icon-sm" />
                    </button>
                    <button
                      className="cms-btn"
                      onClick={() => editCourseHandler(course)}
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
                dispatch(removeCourseFromServer(mainCourse.id))
              }
            />
          ) : (
            <EditCourseModal
              courseId={mainCourse.id}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
