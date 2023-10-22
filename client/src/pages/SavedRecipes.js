import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { CiBookmarkRemove } from "react-icons/ci";
import "./savedrecipes.css";
import { Link } from "react-router-dom";
import Image from "../components/Image";

function SavedRecipes() {
  const [savedrecipes, setsavedrecipes] = useState([]);
  const [user, setuser] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchsavedRecipe = async () => {
      try {
        const res = await axios.get(
          `api/recipes/savedrecipes/${userID}`
        );
        setsavedrecipes(res.data.savedrecipes);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchuser = async () => {
      try {
        const res = await axios.get(`api/auth/${userID}`);
        setuser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchuser();
    fetchsavedRecipe();
  }, [userID]);

  return (
    <>
    <h1 className="title">Saved Recipes</h1>
      <div className="App">
        {savedrecipes.map((recipe) => {
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
    </>
  );
}

export default SavedRecipes;
