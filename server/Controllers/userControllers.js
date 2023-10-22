import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.model.js";
import ENV from "../config.js";
import mongoose from "mongoose";

export async function register(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  )
  const { username, email, password } = req.body;
  try {
    // check if the user exist
    const usernameExist = new Promise((resolve, reject) => {
      UserModel.findOne({ username }).then((user) => {
        if (user) reject({ msg: "Please use unique username" });

        resolve();
      });
    });

    // check if the email exist
    const emailExist = new Promise((resolve, reject) => {
      UserModel.findOne({ email }).then((email) => {
        if (email) reject({ msg: "Email already in use" });

        resolve();
      });
    });

    // encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    Promise.all([usernameExist, emailExist])
      .then(() => {
        const user = new UserModel({
          username,
          email,
          password: hashedPassword,
        });

        // return save result as a response
        user
          .save()
          .then((result) => {
            const token = jwt.sign(
              {
                userID: user._id,
                email: user.email,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );
            res
              .status(201)
              .send({
                msg: "User Register Successfully",
                userID: user._id,
                token,
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function login(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  )
  const { email, password } = req.body;
  try {
    UserModel.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(404).send({ msg: "Password Incorrect" });

            // create jwt token
            const token = jwt.sign(
              {
                userID: user._id,
                email: user.email,
              },
              ENV.JWT_SECRET
            );

            return res.status(200).cookie("token", token).send({
              msg: "Login successful",
              email: user.email,
              token,
              userID: user._id,
            });
          })
          .catch((error) => {
            return res.status(400).send({ msg: "enter password" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ msg: "Email not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getuser(req, res) {
  mongoose.connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  )
  try {
    const { userID } = req.params;
    const user = await UserModel.findById(userID);
    res.json(user);
  } catch (error) {
    return res.status(500).send({ error });
  }
}


