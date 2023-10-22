import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import "./Home.css";
import { RiArrowRightUpLine } from "react-icons/ri";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
import Recipes from "../components/Recipes";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image";

function Home() {
  const [recipes, setrecipes] = useState([]);
  const [savedrecipes, setsavedrecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  const fetchRecipe = async () => {
    try {
      const res = await axios.get("/api/recipes");
      setrecipes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchsavedRecipe = async () => {
    try {
      const res = await axios.get(`/api/recipes/savedrecipes/ids/${userID}`);
      setsavedrecipes(res.data.savedrecipes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchsavedRecipe();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const saveRecipe = async (recipeID) => {
    if (userID) {
      try {
        const res = await axios.put("/api/recipes/save", {
          recipeID,
          userID,
        });
        setsavedrecipes(res.data.savedrecipes);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Login to save recipes")
    }
  };

  const isRecipeSaved = (id) => savedrecipes.includes(id);

  const randomindex = Math.floor(Math.random() * recipes.length);

  return (
    <main>
      <div className="Recipegrid">
        <div className="left__Recipegrid">
          <Image
            src={recipes[randomindex]?.imageurl}
            key={recipes[randomindex]?._id}
            alt="test"
          />
          <div className="info">
            <h1>{recipes[randomindex]?.name}</h1>
            <p>{recipes[randomindex]?.name}</p>

            <div className="icons">
              <RiArrowRightUpLine
                onClick={() => navigate(`/${recipes[randomindex]?._id}`)}
                className="icon"
              ></RiArrowRightUpLine>
              {!isRecipeSaved(recipes[randomindex]?._id) ? (
                <CiBookmarkPlus
                  onClick={() => {
                    saveRecipe(recipes[randomindex]?._id);
                  }}
                  className="icon"
                ></CiBookmarkPlus>
              ) : (
                <CiBookmarkCheck className="icon"></CiBookmarkCheck>
              )}
            </div>
          </div>
        </div>

        <div className="right__Recipegrid">
          <div className="title">
            <h1>Recipes</h1>
            <h3>
              See{" "}
              <Link to={"/recipes"} style={{ color: "black" }}>
                all
              </Link>
            </h3>
          </div>
          <Recipes
            recipes={recipes}
            saveRecipe={saveRecipe}
            isRecipeSaved={isRecipeSaved}
            screenHeight={screenHeight}
            screenWidth={screenWidth}
          ></Recipes>
        </div>
      </div>
    </main>
  );
}

export default Home;
