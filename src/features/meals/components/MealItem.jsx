import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import CartContext from "../../cart/CartContext";

const MealItem = ({ meal }) => {
  const newMealData = {
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    price: 34,
    id: meal.idMeal,
  };
  const { addItem } = useContext(CartContext);
  const handleAddItem = () => {
    addItem(newMealData);
  };
  return (
    <li className={styles.mealContainer}>
      <img
        className={styles.mealImg}
        src={newMealData.strMealThumb}
        alt="meal-img"
      />
      <h3>{newMealData.strMeal}</h3>
      <p>{newMealData.price}$</p>
      <button className={styles.button} onClick={handleAddItem}>
        Add to Cart
      </button>
    </li>
  );
};

export default MealItem;
