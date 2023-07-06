import { FC, useState } from "react";
import styles from "./apartmentsMainFilters.module.css";

interface IFilterAttributes {
  onFilterParamChangeHandler: (param: string) => void;
  priceStartName: string;
  priceEndName: string;
  areaTotalStartName: string;
  areaTotalEndName: string;
  roomsName: string;
}

const ApartmentsMainFilters: FC<IFilterAttributes> = ({
  onFilterParamChangeHandler,
  priceStartName,
  priceEndName,
  areaTotalStartName,
  areaTotalEndName,
  roomsName,
}) => {
  const [priceStart, setPriceStart] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [areaTotalStart, setAreaTotalStart] = useState("");
  const [areaTotalEnd, setAreaTotalEnd] = useState("");
  const [rooms, setRooms] = useState("");

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (Number(value) >= 0) {
      if (name === priceStartName) {
        setPriceStart(value);
      } else if (name === priceEndName) {
        setPriceEnd(value);
      } else if (name === areaTotalStartName) {
        setAreaTotalStart(value);
      } else if (name === areaTotalEndName) {
        setAreaTotalEnd(value);
      } else if (name === roomsName) {
        setRooms(value);
      }
    }
  };

  const generateFilterParam = () => {
    const filterParams: string[] = [];

    if (priceStart && priceEnd) {
      filterParams.push(`price:${priceStart}-${priceEnd}`);
    }

    if (areaTotalStart && areaTotalEnd) {
      filterParams.push(`area_total:${areaTotalStart}-${areaTotalEnd}`);
    }

    if (rooms) {
      filterParams.push(`rooms:${rooms}`);
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
        <label className={styles.label} htmlFor={priceStartName}>
          Цена (от):
        </label>
        <input
          type="number"
          id={priceStartName}
          name={priceStartName}
          value={priceStart}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>
      
      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={priceEndName}>
          Цена (до):
        </label>

        <input
          type="number"
          id={priceEndName}
          name={priceEndName}
          value={priceEnd}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaTotalStartName}>
          Общая площадь (от):
        </label>
        <input
          type="number"
          id={areaTotalStartName}
          name={areaTotalStartName}
          value={areaTotalStart}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={areaTotalEndName}>
          Общая площадь (до):
        </label>
        <input
          type="number"
          id={areaTotalEndName}
          name={areaTotalEndName}
          value={areaTotalEnd}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label} htmlFor={roomsName}>
          кол-во комнат:
        </label>
        <input
          type="number"
          id={roomsName}
          name={roomsName}
          value={rooms}
          onChange={onInputChangeHandler}
          onBlur={onFilterChangeHandler}
        />
      </div>
    </div>
  );
}

export default ApartmentsMainFilters

