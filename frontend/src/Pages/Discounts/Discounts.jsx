import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../../Components/Title";
import Pagination from "../../Components/Pagination";
import DiscountsFilter from "./components/DiscountsFilter";
import Modal from "../../Components/Modal";
import DeleteModal from "../../Components/DeleteModal";
import EditDiscountModal from "./components/EditDiscountModal";
import insertDiscountSchema from "../../Utils/Validation/insertDiscount";
import Loading from "../../Components/Loading";
import {
  getAllDiscountsFromServer,
  insertDiscountToServer,
  removeDiscountFromServer,
} from "../../Redux/store/Discounts";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";

export default function Discounts() {
  const dispatch = useDispatch();
  const discounts = useSelector((state) => state.discounts);
  const [shownDiscounts, setShownDiscounts] = useState(discounts);
  const [mainDiscount, setmainDiscount] = useState({});
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    dispatch(getAllDiscountsFromServer());
  }, []);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      percent: "",
      startDate: "",
      stopDate: "",
    },
    resolver: yupResolver(insertDiscountSchema),
    resetOptions: {
      keepDirty: false,
    },
  });

  const formSubmitHandler = (newDiscount) => {
    console.log("newDiscount", newDiscount);
    dispatch(insertDiscountToServer(newDiscount));
    reset();
  };

  const removeDiscountHandler = (discountObj) => {
    setCurrentModal("delete");
    setmainDiscount(discountObj);
  };
  const editDiscountHandler = (discountObj) => {
    setCurrentModal("edit");
    setmainDiscount(discountObj);
  };

  return (
    <>
      <Title title="افزودن کد تخفیف جدید" />
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="pb-4 border-b-2 border-white"
      >
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="discount-code">کد تخفیف</label>
            <input
              type="text"
              id="discount-code"
              {...register("code")}
              placeholder="کد تخفیف را وارد نمایید"
            />
            {errors.code && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.code.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="discount-percent">درصد تخفیف</label>
            <input
              type="text"
              id="discount-percent"
              {...register("percent")}
              placeholder="درصد تخفیف را وارد نمایید"
            />
            {errors.percent && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.percent.message}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-col-50">
            <label htmlFor="discount-start">تاریخ شروع تخفیف</label>
            <input
              type="date"
              id="discount-start"
              {...register("startDate")}
              placeholder="تاریخ شروع تخفیف را وارد نمایید"
            />
            {errors.startDate && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div className="form-col-50">
            <label htmlFor="discount-stop">تاریخ پایان تخفیف</label>
            <input
              type="date"
              id="discount-stop"
              {...register("stopDate")}
              placeholder="تاریخ پایان تخفیف را وارد نمایید"
            />
            {errors.stopDate && (
              <span className="text-xs text-red-500 font-VazirMedium">
                {errors.stopDate.message}
              </span>
            )}
          </div>
        </div>
        <button className="btn-form w-fit mr-4">ثبت تخفیف</button>
      </form>
      <Title title="لیست تمامی تخفیف ها" />
      {shownDiscounts.length ? (
        <Pagination
          items={discounts}
          pathName={"/discounts"}
          setShownItems={setShownDiscounts}
          filterElement={<DiscountsFilter />}
        >
          <table className="cms-table">
            <thead>
              <tr>
                <th>کد تخفیف</th>
                <th>درصد تخفیف</th>
                <th>تاریخ شروع</th>
                <th>تاریخ پایان</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {shownDiscounts.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.code}</td>
                  <td>{discount.percent}</td>
                  <td>{discount.startDate}</td>
                  <td>{discount.stopDate}</td>
                  <td>
                    <button
                      className="cms-btn delete"
                      onClick={() => removeDiscountHandler(discount)}
                    >
                      <span className="hidden sm:inline-flex">حذف</span>
                      <HiOutlineTrash className="icon-sm" />
                    </button>
                    <button
                      className="cms-btn"
                      onClick={() => editDiscountHandler(discount)}
                    >
                      <span className="hidden sm:inline-flex">ویرایش</span>
                      <HiOutlinePencilSquare className="icon-sm" />
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
          {currentModal === "delete" ? (
            <DeleteModal
              closeModal={() => setCurrentModal(null)}
              confirmModal={() =>
                dispatch(removeDiscountFromServer(mainDiscount.id))
              }
            />
          ) : (
            <EditDiscountModal
              discountId={mainDiscount.id}
              closeModal={() => setCurrentModal(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
