import { forwardRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { useEffect } from "react";
import { getItemTypes } from "@/services/itemService";
import useItemStore from "@/store/itemStore";

const ItemTypeSelector = forwardRef(({ value, onChange }, ref) => {
  const { itemTypeOptions, setItems } = useItemStore();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (value && itemTypeOptions.length > 0) {
      const matchedOption = itemTypeOptions.find(
        (type) => type.type_id === value
      );
      setSelectedOption(matchedOption || null);
    }
  }, [value, itemTypeOptions, setItems]);

  const loadOptions = () => {
    return itemTypeOptions;
  };

  // const styles = {
  //   menuList: (base) => ({
  //     ...base,
  //     maxHeight: 200,
  //   }),
  //   control: (provided) => ({
  //     ...provided,
  //     minHeight: "32px", // Reduce the height of the control (input field)
  //     height: "32px", // Explicitly set the height
  //   }),
  //   valueContainer: (provided) => ({
  //     ...provided,
  //     padding: "0 8px", // Adjust padding inside the control
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     marginTop: '0', // Remove extra margin above the dropdown menu
  //   }),
  // };

  return (
    <>
      <AsyncSelect
        ref={ref}
        placeholder="Select Type"
        cacheOptions
        defaultOptions={itemTypeOptions}
        isSearchable={false}
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.type_name}
        getOptionValue={(option) => option.type_id}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
          onChange(selectedOption ? selectedOption.type_id : null);
        }}
        // styles={styles}
      />
    </>
  );
});

ItemTypeSelector.displayName = "ItemTypeSelector";

export default ItemTypeSelector;
