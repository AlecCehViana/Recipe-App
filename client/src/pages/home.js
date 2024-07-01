import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies,] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-app-3jaa.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipe-app-3jaa.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipe-app-3jaa.onrender.com/recipes", {
        recipeID,
        userID,
      }, {
        headers: { authorization: cookies.access_token },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
              className="button type1"
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
               <span> {isRecipeSaved(recipe._id) ? "Saved" : "Save"} </span> 
              
              </button>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="instructions">
            
            </div>
            <h4><b>Ingredients</b></h4>
            {recipe.ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
            <h4><b>Instructions</b></h4>
              <p>{recipe.instructions}</p>
          
            <p>Cooking Time: {recipe.cookingTime} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
};