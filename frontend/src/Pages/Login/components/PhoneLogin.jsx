import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import phoneLoginSchema from '../../../Utils/Validation/phoneLogin'

export default function PhoneLogin() {
  const form = useFormik({
    initialValues: { phone: "" },
    validationSchema: phoneLoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        location.replace('/courses/1')
      }, 3000);
    },
  });
  return (
    <div className="max-w-[600px] z-1 bg-green-100 p-5 md:p-10 rounded-md">
      <h1 className="text-teal-800 text-center text-xl md:text-3xl font-Lalezar mb-4">
        ورود
      </h1>
      <div className="text-sm md:text-base text-teal-800 font-VazirMedium flex-center gap-2">
        <h5>حساب کاربری ندارید؟</h5>
        <NavLink
          to="/login/signup"
          className="text-sm text-orange-300 hover:text-orange-500 font-VazirMedium cursor-pointer"
        >
          ثبت نام
        </NavLink>
      </div>
      <form
        onSubmit={form.handleSubmit}
        className="flex flex-col gap-4 mt-4 text-teal-800"
      >
        <input
          type="text"
          name="phone"
          placeholder="شماره تلفن همراه"
          className="input-form"
          value={form.values.phone}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.phone && form.touched.phone && (
          <span className="text-xs font-VazirMedium text-red-500">
            {form.errors.phone}
          </span>
        )}
        <button type="submit" className="btn-form" disabled={form.isSubmitting}>
          {form.isSubmitting ? "درحال پردازش..." : "تایید"}
        </button>
      </form>
      <NavLink
        to="/login/email"
        className="text-sm text-orange-300 hover:text-orange-500 font-VazirMedium mt-4 cursor-pointer"
      >
        ورود با ایمیل
      </NavLink>
    </div>
  );
}
