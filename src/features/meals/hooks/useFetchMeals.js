import React, { useEffect, useState } from "react";

const useFetchMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const controller = new AbortController(); // Create an AbortController instance
      const signal = controller.signal; // Extract the signal

      try {
        setIsLoading(true);
        setFetchError(""); // Clear previous errors
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
`,
          { signal } // Pass the signal to the fetch options
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setMealsData(data.meals); // Store the list of recipes
      } catch (err) {
        if (err.name !== "AbortError") {
          // Only set errors if the error wasn't caused by an abort
          setFetchError(err.message);
        }
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort(); // Cleanup function aborts the fetch request
    };

    fetchMeals();

    return () => {
      fetchMeals.abort?.(); // Abort fetch if the component unmounts
    };
  }, []);

  return { mealsData, isLoading, fetchError };
};

export default useFetchMeals;
