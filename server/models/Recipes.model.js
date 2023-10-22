import mongoose from "mongoose";


export const RecipeSchema = new mongoose.Schema({
    name:{type:String , required:true},
    ingredients:{type:String , required:true},
    instructions:{type:String , required:true},
    imageurl:{type:String , required:true},
    cookingtime:{type:String , required:false},
    recipeOwner:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true}
})


export const RecipesModel = mongoose.model("recipes" , RecipeSchema);