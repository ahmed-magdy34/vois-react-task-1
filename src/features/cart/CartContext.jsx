import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      let updatedItems = [...state.items];
      if (existingItemIndex > -1) {
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingCartItem = state.items[existingItemIndex];
      let updatedItems = [...state.items];

      if (existingCartItem.quantity === 1) {
        updatedItems = updatedItems.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems };
    }
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
