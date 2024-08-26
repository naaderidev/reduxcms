import * as Yup from "yup";

const insertUserSchema = Yup.object({
  name: Yup.string()
    .required("وارد کردن نام و نام خانوادگی الزامی است")
    .min(5, "نام و نام خانوداگی حداقل شامل 5 کاراکتر می باشد"),
  username: Yup.string()
    .required("انتخاب نام کاربری الزامی است")
    .min(8, "نام کاربری حداقل شامل 8 کاراکتر می باشد")
    .max(20, "نام کاربری حداکثر شامل 20 کاراکتر می باشد"),

  phone: Yup.string()
    .required("وارد کردن شماره نلفن الزامی است")
    .length(11, "شماره تلفن وارد شده معتبر نمی باشد"),
  email: Yup.string()
    .required("وارد کردن ایمیل الزامی است")
    .email("ایمیل وارد شده معتبر نمی باشد"),
  password: Yup.string()
    .required("انتخاب رمز عبور الزامی است")
    .min(8, "رمز عبور حداقل شامل 8 کاراکتر می باشد")
    .max(20, "رمز عبور حداکثر شامل 20 کاراکتر می باشد"),
  confirm: Yup.string()
    .required("تکرار رمز عبور الزامی است")
    .min(8, "رمز عبور حداقل شامل 8 کاراکتر می باشد")
    .max(20, "رمز عبور حداکثر شامل 20 کاراکتر می باشد"),
});

export default insertUserSchema;
