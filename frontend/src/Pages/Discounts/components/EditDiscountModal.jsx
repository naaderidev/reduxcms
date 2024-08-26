import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BASE_URL from "../../../Utils/constants";
import insertDiscountSchema from "../../../Utils/Validation/insertDiscount";
import { updateDiscountInServer } from "../../../Redux/store/Discounts";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function EditDiscountModal(props) {
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(insertDiscountSchema),
    resetOptions: {
      keepDirty: false,
    },
    defaultValues: async () => {
      const result = await fetch(
        `${BASE_URL}/discounts?id=${props.discountId}`
      )
        .then((res) => res.json())
        .then((data) => data[0]);
      return {
        code: result.code,
        percent: result.percent,
        startDate: result.startDate,
        stopDate: result.stopDate,
      };
    },
  });
  const formSubmitHandler = (newDiscount) => {
    dispatch(updateDiscountInServer({ ...newDiscount, id: props.discountId }));
    props.closeModal();
    reset();
  };

  return (
    <div className="modal active">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="p-4 bg-white rounded-md"
      >
        <div className="flex-center gap-2 py-6 text-teal-800">
          <HiOutlinePencilSquare className="icon-md" />
          <h1 className="text-lg text-center  font-Lalezar">
            لطفا اصلاحات مورد نظر را انجام دهید...
          </h1>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="course-code">کد تخفیف</label>
            <input type="text" id="course-code" {...register("code")} />
            {errors.code && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.code.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="course-percent">درصد تخفیف</label>
            <input type="text" id="course-percent" {...register("percent")} />
            {errors.percent && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.percent.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="edit-form-col-50">
            <label htmlFor="course-startDate">تاریخ آغاز</label>
            <input
              type="text"
              id="course-startDate"
              {...register("startDate")}
            />
            {errors.startDate && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div className="edit-form-col-50">
            <label htmlFor="course-stopDate">تاریخ پایان</label>
            <input type="text" id="course-stopDate" {...register("stopDate")} />
            {errors.stopDate && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.stopDate.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ویرایش تخفیف</button>
      </form>
    </div>
  );
}
