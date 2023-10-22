import React, { useState } from "react";
import "./CreateRecipe.css";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "react-quill/dist/quill.snow.css";
import ReactQuillInput from "../components/ReactQuill";

function CreateRecipe() {
  const [name, setname] = useState("");
  const [ingredients, setingredients] = useState("");
  const [instructions, setinstructions] = useState("");
  const [file, setfile] = useState("");
  const [cookingtime, setcookingtime] = useState("");

  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  const data = new FormData();
  data.set("name", name);
  data.set("ingredients", ingredients);
  data.set("instructions", instructions);
  data.set("file", file[0]);
  data.set("cookingtime", cookingtime);

  const config = {
    method: "POST",
    url: `/api/recipes/create/${userID}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
    withCredentials: true,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!cookies.access_token) {
      alert("please login first");
    }
    try {
      await axios(config).then((res) => {
        console.log(res);
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="CreateRecipe__main">
      <div className="walu"></div>
      <h2>Create a Recipe</h2>
      <form className="CreateRecipe__form">
        <input
          className="CreateRecipe_input"
          type="text"
          id="name"
          name="name"
          placeholder="Recipe Name"
          required={true}
          onChange={(e) => setname(e.target.value)}
        />

        <ReactQuillInput
          content={ingredients}
          setcontent={setingredients}
          placeholder={"ingredients"}
        ></ReactQuillInput>

        <ReactQuillInput
          content={instructions}
          setcontent={setinstructions}
          placeholder={"instructions"}
        ></ReactQuillInput>

        <input
          className="CreateRecipe_input"
          id="imageurl"
          name="file"
          placeholder="imageurl"
          type="file"
          accept="image/*"
          required={true}
          onChange={({ target: { files } }) => {
            if (files) {
              setfile(files);
            }
          }}
        />
        <input
          className="CreateRecipe_input"
          type="Number"
          id="cookingtime"
          name="cookingtime"
          placeholder="Cooking time"
          required={true}
          onChange={(e) => setcookingtime(e.target.value)}
        />
        <button type="submit" className="btn" onClick={onSubmit}>
          Create Recipe
        </button>
      </form>
    </main>
  );
}

export default CreateRecipe;
