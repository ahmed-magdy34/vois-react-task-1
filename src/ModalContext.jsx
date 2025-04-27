import { createContext, useState, useContext } from "react";

// Create ModalContext
const ModalContext = createContext();

// ModalContextProvider
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isCheckout,
        setIsCheckout,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for easier consumption of ModalContext
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
