import { FC, useEffect, useCallback } from "react";
import Options from "enums/Options.enum";
import ApartmentsSort from "components/ApartmentsSort/ApartmentsSort";
import ApartmentsAdditionalFilters from "components/ApartmentsAdditionalFilters/ApartmentsAdditionalFilters";

import useTypedSelector from "hooks/useTypedSelector/useTypedSelector.hook";
import useActions from "hooks/useActions/useActions.hook";

import ApartmentsMainFilters from "components/ApartmentsMainFilters/ApartmentsMainFilters";

import optionsSelectData from '.././ApartmentsSort/attributeSort.data'
import styles from "./selectWrapper.module.css";

interface ISelectWrapperAttributes {
  updateUrlParams: (params: { filter?: string; sort?: string }) => void;
  onButtonSaveHandler: () => void;
}

const SelectWrapper: FC<ISelectWrapperAttributes> = ({
  updateUrlParams,
  onButtonSaveHandler,
}) => {
  const { sorts, activeSort } = useTypedSelector(
    (state) => state.apartmentSorts
  );
  const { filterParam } = useTypedSelector((state) => state.apartmentFilters);

  const { fetchedSorts, changeActiveSort, setFilterParam } = useActions();

  useEffect(() => {
    fetchedSorts(optionsSelectData);
  }, []);

  const onSaveButtonHandler = () => {
    updateUrlParams({ filter: filterParam, sort: activeSort });
    onButtonSaveHandler();
  };

  const onFilterParamChangeHandler = useCallback(
    (param: string) => {
      setFilterParam(param);
      updateUrlParams({ filter: param, sort: activeSort });
    },
    [setFilterParam]
  );

  const onSortChangeHandler = useCallback(
    (selectedSort: Options) => {
      changeActiveSort(selectedSort);
      updateUrlParams({ filter: "", sort: selectedSort });
    },
    [changeActiveSort]
  );

  return (
    <div className={styles.wrapper}>
      <p>Основные Фильтры: </p>
      <ApartmentsMainFilters
        priceStartName="priceStart"
        priceEndName="priceEnd"
        areaTotalStartName="areaTotalStart"
        areaTotalEndName="areaTotalEnd"
        roomsName="rooms"
        onFilterParamChangeHandler={onFilterParamChangeHandler}
      />

      <p>Дополнительные фильтры: </p>
      <ApartmentsAdditionalFilters 
        areaLiveStartName="areaLiveStart"
        areaLiveEndName="areaLiveEnd"
        areaKitchenStartName="areaKitchenStartName"
        areaKitchenEndName="areaKitchenEndName"
        posOnFloorName="posOnFloorName"      
        FloorName="FloorName"
        onFilterParamChangeHandler={onFilterParamChangeHandler}
        />

      <p>Отсортировать: </p>
      <ApartmentsSort
        onSortChangeHandler={onSortChangeHandler}
        value={activeSort}
        sorts={sorts}
      />

      <button className={styles.button} onClick={onSaveButtonHandler}>
        Сохранить
      </button>
    </div>
  );
};

export default SelectWrapper;
