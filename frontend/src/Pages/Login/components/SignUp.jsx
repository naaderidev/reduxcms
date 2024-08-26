import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import signUpSchema from "../../../Utils/Validation/signup";
import { insertUserToServer } from "../../../Redux/store/Users";

export default function SignUp() {
  const dispatch = useDispatch()
  const form = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(insertUserToServer(values))
      setTimeout(() => {
        setSubmitting(false);
        location.replace('/courses/1')
      }, 3000);
    },
  });
  return (
    <div className="max-w-[600px] z-1 bg-green-100 p-5 md:p-10 rounded-md">
      <h1 className="text-teal-800 text-center text-xl md:text-3xl font-Lalezar mb-4">
        ثبت نام
      </h1>
      <div className="text-sm md:text-base text-teal-800 font-VazirMedium flex-center gap-2">
        <h5>قبلا ثبت نام کرده اید؟</h5>
        <NavLink
          to="/login/phone"
          className="text-sm text-orange-300 hover:text-orange-500 font-VazirMedium cursor-pointer"
        >
          ورود
        </NavLink>
      </div>
      <form
        onSubmit={form.handleSubmit}
        className="flex flex-col gap-4 mt-4 text-teal-800"
      >
        <input
          type="text"
          name="name"
          placeholder="نام و نام خانوداگی"
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className="input-form"
        />
        {form.errors.name && form.touched.name && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.name}
          </span>
        )}
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={form.values.username}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className="input-form"
        />
        {form.errors.username && form.touched.username && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.username}
          </span>
        )}
        <input
          type="text"
          name="phone"
          placeholder="تلفن همراه"
          value={form.values.phone}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className="input-form"
        />
        {form.errors.phone && form.touched.phone && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.phone}
          </span>
        )}
        <input
          type="email"
          name="email"
          placeholder="ایمیل معتبر"
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className="input-form"
        />
        {form.errors.email && form.touched.email && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.email}
          </span>
        )}
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          className="input-form"
        />
        {form.errors.password && form.touched.password && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.password}
          </span>
        )}
        <button type="submit" className="btn-form" disabled={form.isSubmitting}>
          {form.isSubmitting ? "درحال پردازش..." : "تایید"}
        </button>
      </form>
    </div>
  );
}
