import React, { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartContext from "../features/cart/CartContext";
import { useModal } from "../ModalContext";
import styles from "./Header.module.css";

const Header = () => {
  const { setIsOpen } = useModal();
  const { items } = useContext(CartContext);
  const totalItemsInCart = items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);
  return (
    <nav className={styles.nav}>
      <p className={styles.logo}>Foodie</p>
      <div className={styles.cartNumContainer}>
        <IoCartOutline
          onClick={() => setIsOpen(true)}
          className={styles.cartIcon}
        />
        <p className={styles.cartNum}>({totalItemsInCart})</p>
      </div>
    </nav>
  );
};

export default Header;
