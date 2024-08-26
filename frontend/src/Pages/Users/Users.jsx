import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import insertUserSchema from "../../Utils/Validation/insertUser";
import Title from "../../Components/Title";
import Pagination from "../../Components/Pagination";
import UsersFilter from "./components/UsersFilter";
import Modal from "../../Components/Modal";
import DeleteModal from "../../Components/DeleteModal";
import Loading from "../../Components/Loading";
import {
  getAllUsersFromServer,
  insertUserToServer,
  removeUserFromServer,
} from "../../Redux/store/Users";
import { HiOutlineTrash } from "react-icons/hi2";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [shownUsers, setShownUsers] = useState(users);
  const [mainUser, setMainUser] = useState({});
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersFromServer());
  }, []);

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
    dispatch(insertUserToServer(newUser));
    reset();
  };

  const removeUserHandler = (userObj) => {
    setMainUser(userObj);
    setCurrentModal("delete");
  };

  return (
    <>
      <Title title="افزودن کاربر جدید" />
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
        <button className="btn-form w-fit mr-4">ثبت کاربر</button>
      </form>
      <Title title="لیست تمامی کاربران" />
      {shownUsers.length ? (
        <Pagination
          items={users}
          pathName={"/users"}
          setShownItems={setShownUsers}
          filterElement={<UsersFilter />}
        >
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام</th>
                <th>نام کاربری</th>
                <th className="hidden sm:table-cell">ایمیل</th>
                <th className="hidden lg:table-cell">رمز عبور</th>
                <th className="hidden lg:table-cell">تلفن</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {shownUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td className="hidden sm:table-cell">{user.email}</td>
                  <td className="hidden lg:table-cell">{user.password}</td>
                  <td className="hidden lg:table-cell">{user.phone}</td>
                  <td>
                    <button
                      className="cms-btn delete"
                      onClick={() => removeUserHandler(user)}
                    >
                      <span className="hidden sm:inline-flex">حذف</span>
                      <HiOutlineTrash className="icon-sm" />
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
          <DeleteModal
            closeModal={() => setCurrentModal(null)}
            confirmModal={() => dispatch(removeUserFromServer(mainUser.id))}
          />
        </Modal>
      )}
    </>
  );
}
