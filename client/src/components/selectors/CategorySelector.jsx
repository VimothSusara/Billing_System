import { forwardRef } from "react";
import AsyncSelect from "react-select/async";
import useItemStore from "@/store/itemStore";
import { useEffect, useState } from "react";

const CategorySelector = forwardRef(({ value, onChange }, ref) => {
  const { itemCategoryOptions, setItems } = useItemStore();
  const [selectedOption, setSelectedOption] = useState(null);

  // console.log("Categories: ", itemCategoryOptions);

  useEffect(() => {
    if (value && itemCategoryOptions.length > 0) {
      const matchedOption = itemCategoryOptions.find(
        (category) => category.category_id === value
      );
      setSelectedOption(matchedOption || null);
    }
  }, [value, itemCategoryOptions, setItems]);

  const loadOptions = () => {
    return itemCategoryOptions;
  };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Select Category"
        cacheOptions
        defaultOptions={itemCategoryOptions}
        isSearchable={false}
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.category_name}
        getOptionValue={(option) => option.category_id}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          onChange(selectedOption ? selectedOption.category_id : null);
        }}
      />
    </>
  );
});

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
