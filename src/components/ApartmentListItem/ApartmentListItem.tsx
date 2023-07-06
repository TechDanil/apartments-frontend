import { FC, useState } from "react";
import IApartment from "interfaces/apartments/IApartment.interface";
import styles from "./apartmentListItem.module.css";

import Modal from "components/Modal/Modal";

interface IApartmentItem {
  apartmentItem: IApartment;
}

const ApartmentListItem: FC<IApartmentItem> = ({ apartmentItem }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  
  const onOpenModalHandler = () => {
    setIsModalActive(true);
  }

  const onCloseModalHandler = () => {
    setIsModalActive(false);
  }

  return (
    <>
     <li className={styles.item} onClick={onOpenModalHandler}>
      <div className={styles.wrapper}>
        <img src={apartmentItem.layout_image} alt="test" className={styles.img} />
        <div>
          <div>
            <p>Тип: {apartmentItem.rooms} комнатная</p>
          </div>

          <div>
            <p>Общая площадь: {apartmentItem.area_total} м<sup>2</sup></p>
          </div>

          <div>
            <p>{apartmentItem.price} млн руб</p>
          </div>
        </div>
      </div>
    </li>

    {isModalActive && (
        <Modal onCloseModalHandler={onCloseModalHandler}>
          <p>{apartmentItem.floor}й этаж</p>
          <p>{apartmentItem.pos_on_floor}я позиция на этаже</p>
          <p>Площадь кухни: {apartmentItem.area_kitchen} м<sup>2</sup> </p>
          <p>Жилая площадь: {apartmentItem.area_live} м<sup>2</sup></p>
        </Modal>
      )}
    </>
  );
};

export default ApartmentListItem;
