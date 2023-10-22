import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  savedrecipes: [{type:mongoose.Schema.Types.ObjectId,ref:"recipes"}]
});

export const UserModel = mongoose.model("users" , UserSchema);