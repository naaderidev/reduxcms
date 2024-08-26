import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../Components/Title";
import Pagination from "../../Components/Pagination";
import TeachersFilter from "./components/TeachersFilter";
import Modal from "../../Components/Modal";
import EditTeacherModal from "./components/EditTeacherModal";
import insertUserSchema from "../../Utils/Validation/insertUser";
import Loading from "../../Components/Loading";
import {
  getAllTeachersFromServer,
  insertTeacherToServer,
} from "../../Redux/store/Teachers";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function Teachers() {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const [shownTeachers, setShownTeachers] = useState(teachers);
  const [mainTeacher, setMainTeacher] = useState({});
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    dispatch(getAllTeachersFromServer());
  }, []);

  const editTeacherHandler = (teacherObj) => {
    setMainTeacher(teacherObj);
    setCurrentModal("edit");
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirm: "",
    },
    resolver: yupResolver(insertUserSchema),
    resetOptions: {
      keepDirty: false,
    },
  });

  const formSubmitHandler = (newUser) => {
    dispatch(insertTeacherToServer(newUser));
    reset();
  };

  return (
    <>
      <Title title="افزودن استاد جدید" />
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="pb-4 border-b-2 border-white"
      >
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="user-name">نام و نام خانوداگی</label>
            <input
              type="text"
              id="user-name"
              {...register("name")}
              placeholder="نام و نام خانوداگی را وارد نمایید"
            />
            {errors.name && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="user-username">نام کاربری</label>
            <input
              type="text"
              id="user-username"
              {...register("username")}
              placeholder="نام کاربری را وارد نمایید"
            />
            {errors.username && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.username.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="user-phone">تلفن همراه</label>
            <input
              type="text"
              id="user-phone"
              {...register("phone")}
              placeholder="شماره تلفن همراه را وارد نمایید"
            />
            {errors.phone && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="user-email">ایمیل</label>
            <input
              type="text"
              id="user-email"
              {...register("email")}
              placeholder="ایمیل را وارد نمایید"
            />
            {errors.email && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="user-password">رمز عبور</label>
            <input
              type="text"
              id="user-password"
              {...register("password")}
              placeholder="رمز عبور را وارد نمایید"
            />
            {errors.password && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="user-confirm">تکرار رمز عبور</label>
            <input
              type="text"
              id="user-confirm"
              {...register("confirm")}
              placeholder="رمز عبور را تکرار کنید"
            />
            {errors.confirm && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.confirm.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ثبت استاد</button>
      </form>
      <Title title="لیست تمامی اساتید" />
      {shownTeachers.length ? (
        <Pagination
          items={teachers}
          pathName={"/teachers"}
          setShownItems={setShownTeachers}
          filterElement={<TeachersFilter />}
        >
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام</th>
                <th>نام کاربری</th>
                <th className="hidden sm:table-cell">ایمیل</th>
                <th className="hidden lg:table-cell">رمز عبور</th>
                <th className="hidden lg:table-cell">تلفن</th>
                <th className="hidden lg:table-cell">دوره ها</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {shownTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.username}</td>
                  <td className="hidden sm:table-cell">{teacher.email}</td>
                  <td className="hidden lg:table-cell">{teacher.password}</td>
                  <td className="hidden lg:table-cell">{teacher.phone}</td>
                  <td className="hidden lg:table-cell">{teacher.courses}</td>
                  <td>
                    <button
                      className="cms-btn"
                      onClick={() => editTeacherHandler(teacher)}
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
          <EditTeacherModal
            teacherId={mainTeacher.id}
            closeModal={() => setCurrentModal(null)}
          />
        </Modal>
      )}
    </>
  );
}
