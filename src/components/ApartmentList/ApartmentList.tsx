import { FC, useMemo } from "react";

import setContent from '../../utils/setContent/setContent';
import renderItems from "utils/renderItems/renderItems";
import IApartment from "interfaces/apartments/IApartment.interface";
import ProcessStatus from "enums/processStatus/ProcessStatus.enum";

import styles from './apartmentList.module.css';


interface IApartmentsList {
    apartments: IApartment[];
    process: ProcessStatus;
    onLoadMoreHanlder: () => void;
    isLoadMoreItems: boolean;
}

const ApartmentList:FC<IApartmentsList> = ({ 
    apartments, 
    process, 
    onLoadMoreHanlder, 
    isLoadMoreItems,
}) => {
    const items = useMemo(() => {
        return setContent({
            process: process,
            Component: () => renderItems(apartments),
            isNewItemLoading: false,
        });
    }, [process]);

    if (!apartments.length) {
        return <h3 className={styles.title}>Таких квартир нет!</h3>
    }

    return (
      <div className={styles.wrapper}>
        <ul className={styles.list}>{items}</ul>

        <button 
        className={styles.button} 
        onClick={onLoadMoreHanlder}
        disabled={isLoadMoreItems}
        style={{visibility: isLoadMoreItems ? 'hidden' : 'visible'}}
        >
          <div >Загрузить еще</div>
        </button>
      </div>
    );
}

export default ApartmentList;