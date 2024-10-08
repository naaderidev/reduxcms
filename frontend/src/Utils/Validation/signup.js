import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(8, "نام و نام خانوادگی حداقل شامل 8 کاراکتر است")
    .max(30, "نام و نام خانوداگی حداکثر شامل 30 کاراکتر است")
    .required("وارد کردن نام و نام خانوادگی الزامی است"),
  username: Yup.string()
    .min(8, "نام کاربری حداقل شامل 8 کاراکتر است")
    .max(12, "نام کاربری حداکثر شامل 12 کاراکتر است")
    .required("انتخاب نام کاربری الزامی است"),
  phone: Yup.string("لطفا شماره صحیح وارد نمایید")
    .length(11, "شماره وارد شده صحیح نمی باشد")
    .required("وارد کردن شماره تلفن الزامی است"),
  email: Yup.string()
    .email("فرمت ایمیل وارد شده صحیح نمی باشد")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string()
    .min(8, "رمز عبور شامل حداقل 8 کاراکتر است")
    .max(12, "رمز عبور شامل حداکثر 12 کاراکتر است")
    .required("انتخاب رمز عبور الزامی است"),
});

export default signUpSchema;
