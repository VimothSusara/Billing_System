import SupplierSelector from "@/components/selectors/SupplierSelector";
import CategorySelector from "@/components/selectors/CategorySelector";
import ItemTypeSelector from "@/components/selectors/ItemTypeSelector";
import ItemMeasureSelector from "@/components/selectors/ItemMeasureSelector";
import WarrantySelector from "@/components/selectors/WarrantySelector";
import { createItem, getNextItemCode } from "@/services/itemService";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ItemList from "@/components/item-Stock/ItemList";
import EditItemDetail from "@/components/item-Stock/EditItemDetail";
import useItemStore from "@/store/itemStore";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FaRegSave } from "react-icons/fa";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  date: Yup.date().typeError("Invalid Date").required("Required"),
  supplier: Yup.string().typeError("Invalid").required("Required"),
  item_code: Yup.string().typeError("Invalid").required("Required"),
  product_code: Yup.string().typeError("Invalid").required("Required"),
  category: Yup.string().typeError("Invalid").required("Required"),
  item_type: Yup.string().typeError("Invalid").required("Required"),
  item_measure: Yup.string().typeError("Invalid").required("Required"),
  item_name: Yup.string().typeError("Invalid").required("Required"),
  reorder_level: Yup.number().typeError("Invalid").required("Required"),
  labeled_price: Yup.number().typeError("Invalid").required("Required"),
  buying_price: Yup.number().typeError("Invalid").required("Required"),
  barcode: Yup.string().typeError("Invalid").required("Required"),
  selling_price: Yup.number()
    .typeError("Invalid")
    .positive("Must be a positive value")
    .required("Selling Price is required"),
  warranty: Yup.string().typeError("Invalid").required("Required"),
});

const AddEditItems = () => {
  const { setItems, items } = useItemStore();
  const {
    fetchItemTypes,
    fetchItemCategories,
    fetchItemMeasures,
    fetchItemWarranties,
  } = useItemStore();

  useEffect(() => {
    fetchItemTypes();
    fetchItemCategories();
    fetchItemMeasures();
    fetchItemWarranties();
  }, [
    fetchItemTypes,
    fetchItemCategories,
    fetchItemMeasures,
    fetchItemWarranties,
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data) => {
    // console.log("Save Data: ", data);
    const response = await createItem(data);
    // console.log("Saving data: ", response);
    // console.table("Saved Data in table:", response);
    if (response) {
      toast.success("Item " + response.item_name + " saved successfully");
      // console.table(items);
      reset({
        date: new Date().toISOString().split("T")[0],
        supplier: "",
        item_code: "",
        product_code: "",
        category: "",
        item_type: "",
        item_measure: "",
        item_name: "",
        reorder_level: "",
        labeled_price: "",
        buying_price: "",
        barcode: "",
        selling_price: "",
        warranty: "",
      });
    } else {
      console.error("Error saving data:", response.error);
    }
  };

  useEffect(() => {
    const fetchNextItemNo = async () => {
      const response = await getNextItemCode();
      // console.log(response);
      if (response.success) {
        setValue("item_code", response.nextItemCode);
        setValue("product_code", response.nextItemCode);
      } else {
        console.error("Error fetching item code:", response.error);
      }
    };
    fetchNextItemNo();
  }, [setValue]);

  useEffect(() => {
    console.log(items);
  }, []);

  return (
    <>
      <div className="mt-0">
        <div className="container flex bg-indigo-800 rounded-md">
          <h1 className="text-2xl font-bold mx-auto py-1 text-white">
            Add Item Form
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="mt-2 mx-1 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="">
              <label htmlFor="date" className="font-semibold">
                Date
                {errors.date && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.date.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  id="date"
                  name="date"
                  tabIndex="1"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.date ? "outline-red-500" : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="supplier" className="font-semibold">
                Supplier
                {errors.supplier && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.supplier.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <Controller
                  id="supplier"
                  name="supplier"
                  tabIndex="2"
                  control={control}
                  render={({ field }) => <SupplierSelector {...field} />}
                  rules={{ required: "Supplier is required" }}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="item_code" className="font-semibold">
                Item Code
                {errors.item_code && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.item_code.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  readOnly
                  type="text"
                  id="item_code"
                  {...register("item_code")}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.item_code
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="product_code" className="font-semibold">
                Product Code
                {errors.product_code && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.product_code.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="product_code"
                  name="product_code"
                  {...register("product_code")}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.product_code
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="item_category" className="font-semibold">
                Item Category
                {errors.category && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.category.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <Controller
                  id="category"
                  name="category"
                  control={control}
                  render={({ field }) => <CategorySelector {...field} />}
                  rules={{ required: "category is required" }}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="item_type" className="font-semibold">
                Item Type
                {errors.item_type && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.item_type.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <Controller
                  id="item_type"
                  name="item_type"
                  control={control}
                  render={({ field }) => <ItemTypeSelector {...field} />}
                  rules={{ required: "Type is required" }}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="item_measure" className="font-semibold">
                Item Measure
                {errors.item_measure && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.item_measure.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <Controller
                  id="item_measure"
                  name="item_measure"
                  control={control}
                  render={({ field }) => <ItemMeasureSelector {...field} />}
                  rules={{ required: "Measure is required" }}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="warranty" className="font-semibold">
                Warranty
                {errors.warranty && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.warranty.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <Controller
                  id="warranty"
                  name="warranty"
                  control={control}
                  render={({ field }) => <WarrantySelector {...field} />}
                  rules={{ required: "Warranty is required" }}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="item_name" className="font-semibold">
                Item Name
                {errors.item_name && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.item_name.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="item_name"
                  name="item_name"
                  placeholder="Item Description - MRP Amount"
                  {...register("item_name", {
                    required: "Item Name is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.item_name
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="reorder_level" className="font-semibold">
                Reorder Level
                {errors.reorder_level && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.reorder_level.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="reorder_level"
                  name="reorder_level"
                  placeholder="0.00"
                  {...register("reorder_level", {
                    required: "Reorder level is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.reorder_level
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="barcode" className="font-semibold">
                Barcode
                {errors.barcode && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.barcode.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  placeholder="Barcode"
                  {...register("barcode", {
                    required: "Barcode is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.barcode
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="labeled_price" className="font-semibold">
                Market Price
                {errors.labeled_price && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.labeled_price.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="labeled_price"
                  name="labeled_price"
                  placeholder="0.00"
                  {...register("labeled_price", {
                    required: "Market price is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.labeled_price
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="buying_price" className="font-semibold">
                Buying Price
                {errors.buying_price && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.buying_price.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="buying_price"
                  name="buying_price"
                  placeholder="0.00"
                  {...register("buying_price", {
                    required: "Buying price is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.buying_price
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="selling_price" className="font-semibold">
                Selling Price
                {errors.selling_price && (
                  <span className="text-red-500 text-xs">
                    {`  ${errors.selling_price.message}`}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="selling_price"
                  name="selling_price"
                  placeholder="0.00"
                  {...register("selling_price", {
                    required: "Selling price is required",
                  })}
                  className={`px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer ${
                    errors.selling_price
                      ? "outline-red-500"
                      : "focus:outline-blue-500"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 mx-1 flex justify-center md:justify-start">
            <button
              type="submit"
              className="flex px-3 py-2 bg-blue-500 text-gray-100 font-bold rounded-md hover:bg-blue-600 cursor-pointer transition-all duration-200 ease-in-out"
            >
              Add Item
            </button>
          </div>
        </form>
        <div className="container flex mt-3 bg-indigo-800 rounded-md">
          <h1 className="text-2xl font-bold mx-auto py-1 text-white">
            Edit Item Form
          </h1>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
          <div className="container">
            <ItemList />
          </div>
          <div className="container">
            <EditItemDetail />
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default AddEditItems;
