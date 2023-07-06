import { FC, useState } from "react";
import styles from "./apartmentsAdditionalFilters.module.css";

interface IFilterAttributes {
  onFilterParamChangeHandler: (param: string) => void;
  areaLiveStartName: string;
  areaLiveEndName: string;
  areaKitchenStartName: string;
  areaKitchenEndName: string;
  posOnFloorName: string,
  FloorName: string
}

const ApartmentsAdditionalFilters: FC<IFilterAttributes> = ({
    onFilterParamChangeHandler,
    areaLiveStartName,
    areaLiveEndName,
    areaKitchenStartName,
    areaKitchenEndName,
    posOnFloorName,
    FloorName,
}) => {
  const [areaLiveStart, setAreaLiveStart] = useState("");
  const [areaLiveEnd, setAreaLiveEnd] = useState("");
  const [areaKitchenStart, setAreaKitchenStart] = useState("");
  const [areaKitchenEnd, setAreaKitchenEnd] = useState("");
  const [posOnFloor, setPosOnFloor] = useState("");
  const [floor, setFloor] = useState("");

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (Number(value) >= 0) {
      if (name === areaLiveStartName) {
        setAreaLiveStart(value);
      } else if (name === areaLiveEndName) {
        setAreaLiveEnd(value);
      } else if (name === areaKitchenStartName) {
        setAreaKitchenStart(value);
      } else if (name === areaKitchenEndName) {
        setAreaKitchenEnd(value);
      } else if (name === posOnFloorName) {
        setPosOnFloor(value);
      } else if (name === FloorName) {
        setFloor(value);
      } 
    }
  };

  const generateFilterParam = () => {
    const filterParams: string[] = [];

    if (areaLiveStart && areaLiveEnd) {
      filterParams.push(`area_live:${areaLiveStart}-${areaLiveEnd}`);
    }

    if (areaKitchenStart && areaKitchenEnd) {
      filterParams.push(`area_kitchen:${areaKitchenStart}-${areaKitchenEnd}`);
    }

    if (posOnFloor) {
      filterParams.push(`pos_on_floor:${posOnFloor}`);
    }

    if (floor) {
        filterParams.push(`floor:${floor}`);
    }

    return filterParams.join("|");
  };

  const onFilterChangeHandler = () => {
    const filterParam = generateFilterParam();
    onFilterParamChangeHandler(filterParam);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaLiveStartName}>
          Жилая площадь (от):
        </label>
        <input
          type="number"
          id={areaLiveStartName}
          name={areaLiveStartName}
          value={areaLiveStart}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>
      
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaLiveEndName}>
        Жилая площадь (до):
        </label>

        <input
          type="number"
          id={areaLiveEndName}
          name={areaLiveEndName}
          value={areaLiveEnd}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaKitchenStartName}>
        Площадь кухни (от):
        </label>
        <input
          type="number"
          id={areaKitchenStartName}
          name={areaKitchenStartName}
          value={areaKitchenStart}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaKitchenEndName}>
        Площадь кухни (до):
        </label>
        <input
          type="number"
          id={areaKitchenEndName}
          name={areaKitchenEndName}
          value={areaKitchenEnd}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={posOnFloorName}>
          Позиция на этаже:
        </label>
        <input
          type="number"
          id={posOnFloorName}
          name={posOnFloorName}
          value={posOnFloor}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={FloorName}>
          Этаж:
        </label>
        <input
          type="number"
          id={FloorName}
          name={FloorName}
          value={floor}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>
    </div>
  );
}

export default ApartmentsAdditionalFilters

