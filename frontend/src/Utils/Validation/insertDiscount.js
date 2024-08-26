import * as Yup from "yup";

const insertDiscountSchema = Yup.object({
  code: Yup.string()
    .required("وارد کردن کد تخفیف الزامی است")
    .min(5, "کد تخفیف حداقل شامل 5 کاراکتر می باشد")
    .max(12, "کد تخفیف حداکثر شامل 12 کاراکتر می باشد"),
  percent: Yup.string().required("وارد کردن درصد تخفیف الزامی است"),
  startDate: Yup.string().required("وارد کردن تاریخ شروع الزامی است"),
  stopDate: Yup.string().required("وارد کردن تاریخ پایان الزامی است"),
});

export default insertDiscountSchema;
