import { debounce } from "lodash";
import { forwardRef, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { searchSuppliers } from "@/services/supplierService";
import useItemStore from "@/store/itemStore";

const fetchSuppliers = async (value) => {
  try {
    const response = await searchSuppliers(value);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return [];
  }
};

const debouncedFetchSuppliers = debounce((value, callback) => {
  fetchSuppliers(value).then(callback);
}, 500);

const SupplierSelector = forwardRef(({ value, onChange }, ref) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (value) {
      // Fetch the supplier by ID and set it as the selected option
      fetchSuppliers(value).then((suppliers) => {
        const matchedSupplier = suppliers.find(
          (supplier) => supplier.supplier_id === value
        );
        setSelectedOption(matchedSupplier || null);
      });
    }
  }, [value]);

  const loadOptions = (inputValue, callback) => {
    debouncedFetchSuppliers(inputValue, callback);
  };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Search Suppliers"
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.supplier_name}
        getOptionValue={(option) => option.supplier_id}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          onChange(selectedOption ? selectedOption.supplier_id : null);
        }}
      />
    </>
  );
});

SupplierSelector.displayName = "SupplierSelector";

export default SupplierSelector;
