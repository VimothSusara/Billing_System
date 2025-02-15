import { forwardRef, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import useItemStore from "@/store/itemStore";

const WarrantySelector = forwardRef(({ value, onChange }, ref) => {
  const { itemWarrantyOptions, setItems } = useItemStore();
  const [selectedOption, setSelectedOption] = useState(null);

  // console.log("Categories: ", itemWarrantyOptions);

  useEffect(() => {
    if (value && itemWarrantyOptions.length > 0) {
      const matchedOption = itemWarrantyOptions.find(
        (warranty) => warranty.warranty_id === value
      );
      setSelectedOption(matchedOption || null);
    }
  }, [value, itemWarrantyOptions, setItems]);

  const loadOptions = () => {
    return itemWarrantyOptions;
  };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Select Warranty"
        cacheOptions
        defaultOptions={itemWarrantyOptions}
        isSearchable={false}
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.warranty_name}
        getOptionValue={(option) => option.warranty_id}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          onChange(selectedOption ? selectedOption.warranty_id : null);
        }}
      />
    </>
  );
});

WarrantySelector.displayName = "WarrantySelector";

export default WarrantySelector;
