import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/User.route.js";
import { RecipesRouter } from "./routes/Recipe.route.js";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import staticMiddelware from "./staticMiddelware.cjs";



const app = express();


app.use("/uploads" , staticMiddelware)
app.use(express.json());
app.use(cors({credentials:true,origin:'https://foodwine-v1.vercel.app'}));
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cookieParser());



// http get request
app.get("/", (req, res) => {
  res.status(201).json("home get request");
});


// api routes
app.use("/api", userRouter);
app.use("/api", RecipesRouter);



// Start Server only whe we have valid connection
mongoose
  .connect(
    "mongodb+srv://walid:samyboy2001..@recipes.osvtmmg.mongodb.net/RecipesApp?retryWrites=true&w=majority"
  )
  .then(() => {
    try {
      app.listen(3001, () => console.log("server started"));
    } catch (error) {
        console.log("cannot connect to the server");
    }
  }).catch(error =>{
    console.log("invalid database")
  });


