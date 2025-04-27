import React from "react";
import useFetchMeals from "../hooks/useFetchMeals";
import MealItem from "./MealItem";
import styles from "./MealsList.module.css";

const MealsList = () => {
  const { isLoading, fetchError, mealsData } = useFetchMeals();

  if (isLoading) {
    return <p>Loading meals...</p>; // Display a loading state
  }

  if (fetchError) {
    return <p>Error: {fetchError}</p>; // Display the error message
  }

  if (mealsData.length === 0) {
    return <p>No meals available right now!</p>; // Handle an empty state
  }

  return (
    <section className={styles.section}>
      <ul className={styles.mealsList}>
        {mealsData.map((meal) => (
          <MealItem meal={meal} key={meal.idMeal} />
        ))}
      </ul>
    </section>
  );
};

export default MealsList;
