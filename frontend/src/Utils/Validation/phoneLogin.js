import * as Yup from "yup";

const phoneLoginSchema = Yup.object().shape({
  phone: Yup.string("لطفا شماره صحیح وارد نمایید")
    .length(11, "شماره وارد شده صحیح نمی باشد")
    .required("وارد کردن شماره تلفن الزامی است"),
});

export default phoneLoginSchema;
