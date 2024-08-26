import * as Yup from "yup";

const insertCourseSchema = Yup.object({
  title: Yup.string()
    .min(5, "عنوان دوره حداقل شامل 5 کاراکتر می باشد")
    .required("وارد کردن عنوان دوره الزامی است"),
  teacher: Yup.string().required("وارد کردن نام مدرس الزامی است"),
  category: Yup.string().required("انتخاب دسته بندی دوره الزامی است"),
  price: Yup.string().required("وارد کردن هزینه دوره الزامی است"),
  duration: Yup.string().required("وارد کردن مدت زمان دوره(ساعت) الزامی است"),
  image: Yup.string().required("وارد کردن آدرس کاور دوره الزامی است"),
});

export default insertCourseSchema;
