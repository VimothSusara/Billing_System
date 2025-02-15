import { forwardRef } from "react";
import AsyncSelect from "react-select/async";
import { useState, useEffect } from "react";
import useItemStore from "@/store/itemStore";

const ItemMeasureSelector = forwardRef(({ value, onChange }, ref) => {
  const { itemMeasureOptions, setItems } = useItemStore();
  const [selectedOption, setSelectedOption] = useState(null);

  // console.log("Measure options: ", itemMeasureOptions);

  useEffect(() => {
    if (value && itemMeasureOptions.length > 0) {
      const matchedOption = itemMeasureOptions.find(
        (measure) => measure.measure_id === value
      );
      setSelectedOption(matchedOption || null);
    }
  }, [value, itemMeasureOptions, setItems]);

  const loadOptions = () => {
    return itemMeasureOptions;
  };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Select Measure"
        cacheOptions
        defaultOptions={itemMeasureOptions}
        isSearchable={false}
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.measure_name}
        getOptionValue={(option) => option.measure_id}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          onChange(selectedOption ? selectedOption.measure_id : null);
        }}
      />
    </>
  );
});

ItemMeasureSelector.displayName = "ItemMeasureSelector";

export default ItemMeasureSelector;
