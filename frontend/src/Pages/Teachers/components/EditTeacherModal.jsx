import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BASE_URL from "../../../Utils/constants";
import signUpSchema from "../../../Utils/Validation/signup";
import { updateTeacherInServer } from "../../../Redux/store/Teachers";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function EditTeacherModal(props) {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    resetOptions: {
      keepDirty: false,
    },
    defaultValues: async () => {
      const result = await fetch(
        `${BASE_URL}/teachers?id=${props.teacherId}`
      )
        .then((res) => res.json())
        .then((data) => data[0]);
      return {
        name: result.name,
        username: result.username,
        password: result.password,
        email: result.email,
        phone: result.phone,
        courses: result.courses,
      };
    },
  });
  const formSubmitHandler = (newTeacher) => {
    dispatch(updateTeacherInServer({ ...newTeacher, id: props.teacherId }));
    props.closeModal();
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
            <label htmlFor="teacher-name">نام مدرس</label>
            <input type="text" id="teacher-name" {...register("name")} />
            {errors.name && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="teacher-username">نام کاربری</label>
            <input
              type="text"
              id="teacher-username"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.username.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="teacher-password">رمز عبور</label>
            <input
              type="text"
              id="teacher-password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="teacher-email">ایمیل</label>
            <input type="text" id="teacher-email" {...register("email")} />
            {errors.email && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="teacher-phone">تلفن همراه</label>
            <input type="text" id="teacher-phone" {...register("phone")} />
            {errors.phone && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="teacher-courses">ـعداد دوره ها</label>
            <input type="text" id="teacher-courses" {...register("courses")} />
            {errors.courses && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.courses.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ویرایش اطلاعات</button>
      </form>
    </div>
  );
}
