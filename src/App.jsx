import React, { useState } from "react";
import MealsList from "./features/meals/components/MealsList";
import Header from "./ui/Header";
import { CartContextProvider } from "./features/cart/CartContext";
import Modal from "./ui/Modal";
import Cart from "./features/cart/components/Cart";
import Checkout from "./features/checkout/components/Checkout";
import { useModal } from "./ModalContext";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { isCheckout, setIsCheckout, setIsOpen } = useModal();
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };
  return (
    <CartContextProvider>
      <Modal>
        <AnimatePresence mode="wait">
          {isCheckout ? (
            <motion.div
              key="checkout"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <Checkout />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <Cart />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          style={{
            backgroundColor: "black",
            padding: "6px",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
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
