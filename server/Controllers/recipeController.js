import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.model.js";
import { UserModel } from "../models/User.model.js";


export async function getrecipes(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getrecipe(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  try {
    const { id } = req.params;
    const response = await RecipesModel.findById(id).populate("recipeOwner", [
      "username",
    ]);
    if (!response) return res.json("walu");
    res.json(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function createrecipes(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  const recipe = new RecipesModel(req.body);
  try {
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function saverecipe(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedrecipes.push(recipe);

    await user.save();
    res.json({ savedrecipes: user.savedrecipes });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function savedrecipesid(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedrecipes: user?.savedrecipes });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function savedrecipes(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedrecipes = await RecipesModel.find({
      _id: { $in: user.savedrecipes },
    });
    res.json({ savedrecipes });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
