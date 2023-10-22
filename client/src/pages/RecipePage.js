import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recipePage.css";
import Image from "../components/Image";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setrecipe] = useState("");

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      setrecipe(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <section className="recipe_page">
      <div className="recipe_page_top">

      <div className="recipe_page_left">
        <div>
          <h1>{recipe.name}</h1>
          <p>by @{recipe?.recipeOwner?.username}</p>
        </div>

        <div className="recipe_page_ingredients">
          <h1>Ingredients:</h1>
          <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }}></div>
        </div>
      </div>

      <div className="recipe_page_right">
        <Image src={recipe.imageurl} alt="" />
      </div>

      </div>

      <div className="recipe_page_bottom">
        <h1>Method</h1>
        <div dangerouslySetInnerHTML={{__html:recipe.instructions}}></div>
      </div>
    </section>
  );
}

export default RecipePage;
