import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

function AllRecipes() {
  const [recipes, setrecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get("/api/recipes");
        setrecipes(res.data);
      } catch (error) {
        console.log(error);
      }
    };


    fetchRecipe();
  }, []);

  return (
    
    <div className="App">
      {recipes.map((recipe) => {
        return (
          <div className="saved_recipes_grid" key={recipe._id}>
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div>
                <p>{recipe.name}</p>
              </div>
              <Link to={`/${recipe._id}`}><Image src={recipe.imageurl} alt={recipe.name} /></Link>
              <p>Cooking Time : {recipe.cookingtime} (minutes)</p>
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default AllRecipes;
