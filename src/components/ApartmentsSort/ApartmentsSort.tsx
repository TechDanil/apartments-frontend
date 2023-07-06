import { FC } from "react";
import useActions from "hooks/useActions/useActions.hook";
import Options from "enums/Options.enum";
import OptionType from "types/OptionType";

interface ISortAttributes {
  value: Options;
  sorts: OptionType[];
  onSortChangeHandler: (selectedSort: Options) => void;
}

const ApartmentsSort: FC<ISortAttributes> = ({ sorts, value, onSortChangeHandler }) => {
  const { changeActiveSort } = useActions();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as Options;
    onSortChangeHandler(selectedValue);
    changeActiveSort(selectedValue);
  };

  return (
    <select value={value} onChange={handleSortChange}>
      {sorts.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default ApartmentsSort;
