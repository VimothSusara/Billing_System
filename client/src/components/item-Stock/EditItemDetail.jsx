import useItemStore from "@/store/itemStore";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

import ItemTypeSelector from "../selectors/ItemTypeSelector";
import CategorySelector from "../selectors/CategorySelector";
import ItemMeasureSelector from "../selectors/ItemMeasureSelector";
import WarrantySelector from "../selectors/WarrantySelector";
import SupplierSelector from "../selectors/SupplierSelector";

const EditItemDetail = () => {
  const { selectedItem } = useItemStore();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedItem) {
      setValue("product_code", selectedItem.product_code);
      setValue("item_type", selectedItem.item_type);
      setValue("category", selectedItem.item_category);
      setValue("item_measure", selectedItem.measure_type);
      setValue("warranty", selectedItem.warranty);
      setValue("supplier", selectedItem.supplier_id);
      setValue("item_name", selectedItem.item_name);
      setValue("reorder_level", selectedItem.reorder_level);
      setValue("barcode", selectedItem.barcode);
    }
  }, [selectedItem, setValue]);

  return (
    <>
      <div className="p-3 border-[1px] border-gray-300 shadow-sm">
        <form onSubmit={handleSubmit()} className="space-y-1">
          <div className="m-1 grid grid-cols-2 gap-2">
            <div className="">
              <label htmlFor="product_code" className="font-semibold">Product Code</label>
              <input
                type="text"
                {...register("product_code")}
                className="px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer focus:outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="item_type" className="font-semibold">Item Type</label>
              <Controller
                id="item_type"
                name="item_type"
                control={control}
                render={({ field }) => (
                  <ItemTypeSelector
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "Type is required" }}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="category" className="font-semibold">Item Category</label>
              <Controller
                id="category"
                name="category"
                control={control}
                render={({ field }) => (
                  <CategorySelector
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "category is required" }}
              />
            </div>
            <div className="">
              <label htmlFor="item_measure" className="font-semibold">
                Item Measure
              </label>
              <Controller
                id="item_measure"
                name="item_measure"
                control={control}
                render={({ field }) => (
                  <ItemMeasureSelector
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "Measure is required" }}
              />
            </div>
            <div className="">
              <label htmlFor="warranty" className="font-semibold">
                Warranty
              </label>
              <Controller
                id="warranty"
                name="warranty"
                control={control}
                render={({ field }) => (
                  <WarrantySelector
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "Warranty is required" }}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="supplier" className="font-semibold">
                Supplier
              </label>
              <Controller
                id="supplier"
                name="supplier"
                control={control}
                render={({ field }) => (
                  <SupplierSelector
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "Supplier is required" }}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="item_name" className="font-semibold">
                Item Name
              </label>
              <input
                type="text"
                id="item_name"
                name="item_name"
                placeholder="Item Description - MRP Amount"
                {...register("item_name", {
                  required: "Item Name is required",
                })}
                className="px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer focus:outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="reorder_level" className="font-semibold">
                Reorder Level
              </label>
              <input
                type="text"
                id="reorder_level"
                name="reorder_level"
                {...register("reorder_level", {
                  required: "Reorder level is required",
                })}
                className="px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer focus:outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="barcode" className="font-semibold">
                Barcode
              </label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                placeholder="Barcode"
                {...register("barcode", {
                  required: "Barcode is required",
                })}
                className="px-2 py-[6px] w-full border-[1px] text-gray-500 border-gray-300 bg-white rounded-md cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditItemDetail;
