import { FC, useEffect, useState, useRef, useCallback, ReactNode } from "react";
import type { MouseEventHandler } from "react";
import { MODAL_CONTAINER_ID } from "constants/constants";

import Portal, { createContainer } from "components/Portal/Portal";
import KeyboardKeys from "enums/keyboardKeys/KeyboardKeys.enum";

import styles from './modal.module.css';

interface IModal {
  children: ReactNode;
  onCloseModalHandler?: () => void;
}

const Modal: FC<IModal> = ({ children, onCloseModalHandler }) => {
  const [isMounted,  setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const onWrapperClickHandler = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onCloseModalHandler?.();
      }
    }

    const onEscapePressHandler = (event: KeyboardEvent) => {
      if (event.key === KeyboardKeys.Escape) {
        onCloseModalHandler?.();
      }
    }

    window.addEventListener('click', onWrapperClickHandler);
    window.addEventListener('keydown', onEscapePressHandler);

    return () => {
      window.removeEventListener('click', onWrapperClickHandler);
      window.removeEventListener('keydown', onEscapePressHandler);
    }
  }, [onCloseModalHandler])

  const onCloseHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onCloseModalHandler?.();
  }, [onCloseModalHandler])

  return isMounted ? (
      <Portal id={MODAL_CONTAINER_ID}>
        <div className={styles.wrapper} ref={rootRef}>
          <div className={styles.content}>
            <button
            type="button"
            className={styles.close}
            onClick={onCloseHandler}
            >
              x
            </button>
            {children}
          </div>
        </div>
      </Portal>
  ): null;
};

export default Modal;
