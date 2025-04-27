import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../ModalContext";

const Modal = ({ children }) => {
  const { isOpen } = useModal();
  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);
  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
