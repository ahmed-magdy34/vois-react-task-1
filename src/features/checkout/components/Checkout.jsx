import React, { useContext } from "react";
import useCheckoutHook from "../hooks/useCheckoutHook";
import styles from "./Checkout.module.css";
import CartContext from "../../cart/CartContext";
import { useModal } from "../../../ModalContext";

const Checkout = () => {
  const initialValues = { name: "", email: "", address: "" };
  const { clearCart } = useContext(CartContext);
  const { setIsOpen, setIsCheckout } = useModal();
  const onSubmit = (values) => {
    console.log(values);
    clearCart();
    setIsOpen(false);
    setIsCheckout(false);
  };
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useCheckoutHook({ initialValues, onSubmit });
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          value={values.name}
          name="name"
          id="name"
          onChange={handleChange}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>
      <div>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          value={values.email}
          name="email"
          id="email"
          onChange={handleChange}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div>
        <label className={styles.label} htmlFor="address">
          Address
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="Address"
          value={values.address}
          name="address"
          id="address"
          onChange={handleChange}
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
      </div>
      <button className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsCheckout(false);
        }}
        className={styles.btnCart}
      >
        {"<= Cart"}
      </button>
    </form>
  );
};

export default Checkout;
