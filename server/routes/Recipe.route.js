import express from "express";
import * as controller from "../Controllers/recipeController.js";
import { verifyToken } from "../middleware/middleware.js";
import multer from "multer";
import fs from "fs";
import { RecipesModel } from "../models/Recipes.model.js";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import { UserModel } from "../models/User.model.js";

const router = express.Router();
const uploadMiddelware = multer({ dest: "/tmp" });

async function uploadToS3(newpath, originalFilename, mimetype) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  );

  const client = new S3Client({
    region: "eu-west-3",
    credentials: {
      accessKeyId: ENV.S3_ACCESS_KEY,
      secretAccessKey: ENV.S3_SECRET_ACCESS_KEY,
    },
  });

  const ext = originalFilename.split(".")[1];
  const newFilename = Date.now() + "." + ext;

  try {
    const data = await client.send(
      new PutObjectCommand({
        Bucket: ENV.BUCKETNAME,
        Body: fs.readFileSync(newpath),
        Key: newFilename,
        ContentType: mimetype,
        ACL: "public-read",
      })
    );

    return `https://${ENV.BUCKETNAME}.s3.amazonaws.com/${newFilename}`;
  } catch (error) {
    console.error("Error adding photo");
  }
}

// CREATE RECIPES
router.post(
  "/recipes/create/:id",
  uploadMiddelware.single("file"),
  async (req, res) => {
    mongoose.connect(
      "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
    );

    const { originalname, mimetype, path } = req.file;
    const newPath = path.replace(/\\/g, "/");
    const url = await uploadToS3(newPath, originalname, mimetype);

    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      res.status(401).json("autorization failed");
    } else {
      const { name, ingredients, instructions, cookingtime } =
        req.body;

      const recipe = await RecipesModel.create({
        name,
        ingredients,
        instructions,
        imageurl: url,
        cookingtime,
        recipeOwner: user._id,
      });
      res.json(recipe);
    }
  }
);

// GET RECIPES
router.route("/recipes").get(controller.getrecipes);

// GET RECIPE
router.route("/recipes/:id").get(controller.getrecipe);

// SAVE RECIPES
router.route("/recipes/save").put(controller.saverecipe);

// get saved RECIPES ids
router
  .route("/recipes/savedrecipes/ids/:userID")
  .get(controller.savedrecipesid);

// get saved RECIPES
router.route("/recipes/savedrecipes/:userID").get(controller.savedrecipes);

export { router as RecipesRouter };
