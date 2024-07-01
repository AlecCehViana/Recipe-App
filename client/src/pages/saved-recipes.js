import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-3jaa.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p><b>Ingredients</b></p>
            {recipe.ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
            <p><b>Instructions</b></p>
            <p>{recipe.instructions}</p>
            
            <p>Cooking Time: {recipe.cookingTime} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
};