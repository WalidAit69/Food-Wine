import React from "react";
import "./recipe.css";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import Image from "./Image";

const Recipes = ({ recipes, saveRecipe, isRecipeSaved ,screenHeight}) => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  return (
    <div className="recipe__grid">
      <div className="grid">
        {screenHeight < 750 ? recipes.slice(0,4)
          .map((recipe, index) => {
            if (index < 8) {
              return (
                <div key={recipe._id}>
                  <div className="img">
                    <Image
                      onClick={() => navigate(`/${recipe?._id}`)}
                      className="recipe__img"
                      src={recipe.imageurl}
                      alt="recipeimg"
                      key={recipe._id}
                    />
                    {!isRecipeSaved(recipe._id) ? (
                      <CiBookmarkPlus
                        onClick={() => {
                          saveRecipe(recipe._id);
                          alert(!userID && "Login to save recipes");
                        }}
                        className="recipe_icon"
                      ></CiBookmarkPlus>
                    ) : (
                      <CiBookmarkCheck className="recipe_icon"></CiBookmarkCheck>
                    )}{" "}
                  </div>
                  <h4>{recipe.name}</h4>
                </div>
              );
            }

            return null;
          })
          .filter((recipe) => recipe !== null) : recipes.slice(0,8)
          .map((recipe, index) => {
            if (index < 8) {
              return (
                <div>
                  <div className="img">
                    <Image
                      onClick={() => navigate(`/${recipe?._id}`)}
                      className="recipe__img"
                      src={recipe.imageurl}
                      alt="recipeimg"
                      key={recipe._id}
                    />
                    {!isRecipeSaved(recipe._id) ? (
                      <CiBookmarkPlus
                        onClick={() => {
                          saveRecipe(recipe._id);
                          alert(!userID && "Login to save recipes");
                        }}
                        className="recipe_icon"
                      ></CiBookmarkPlus>
                    ) : (
                      <CiBookmarkCheck className="recipe_icon"></CiBookmarkCheck>
                    )}{" "}
                  </div>
                  <h4>{recipe.name}</h4>
                </div>
              );
            }

            return null;
          })
          .filter((recipe) => recipe !== null)}
      </div>
    </div>
  );
};

export default Recipes;
