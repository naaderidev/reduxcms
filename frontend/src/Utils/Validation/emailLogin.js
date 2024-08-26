import * as Yup from "yup";

const emailLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("فرمت ایمیل وارد شده صحیح نمی باشد")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string()
    .min(8, "رمز عبور شامل حداقل 8 کاراکتر است")
    .max(12, "رمز عبور شامل حداکثر 12 کاراکتر است")
    .required("وارد کردن رمز عبور الزامی است"),
});

export default emailLoginSchema;
