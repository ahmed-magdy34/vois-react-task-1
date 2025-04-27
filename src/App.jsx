import React, { useState } from "react";
import MealsList from "./features/meals/components/MealsList";
import Header from "./ui/Header";
import { CartContextProvider } from "./features/cart/CartContext";
import Modal from "./ui/Modal";
import Cart from "./features/cart/components/Cart";
import Checkout from "./features/checkout/components/Checkout";
import { useModal } from "./ModalContext";

const App = () => {
  const { isCheckout, setIsCheckout, setIsOpen } = useModal();
  return (
    <CartContextProvider>
      <Modal>
        {isCheckout ? <Checkout /> : <Cart />}
        <button
          onClick={() => {
            if (isCheckout) {
              setIsCheckout(false);
            }
            setIsOpen(false);
          }}
        >
          Close
        </button>
      </Modal>
      <Header />
      <MealsList />
    </CartContextProvider>
  );
};

export default App;
