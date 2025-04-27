import React, { useContext } from "react";
import CartContext from "../CartContext";
import styles from "./Cart.module.css"; // Import the module styles
import { useModal } from "../../../ModalContext";

const Cart = ({ checkout }) => {
  const { setIsCheckout } = useModal();
  const { items, removeItem } = useContext(CartContext);

  const handleDeleteItem = (id) => {
    removeItem(id);
  };

  return (
    <div className={styles.cartContainer}>
      <h2>
        Your Cart :
        {items.reduce((totalItems, item) => {
          return totalItems + item.quantity;
        }, 0)}
        items
      </h2>
      <ul className={styles.cartItems}>
        {items.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          items.map((item) => (
            <li className={styles.cartItem} key={item.id}>
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h4>{item.strMeal}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                className={styles.btnDelete}
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      {items.length > 0 && (
        <button className={styles.button} onClick={() => setIsCheckout(true)}>
          checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
