import express from "express";
import * as controller from "../Controllers/userControllers.js"

const router = express.Router();


router.route('/auth/:userID').get(controller.getuser);


router.route('/auth/register').post(controller.register);


router.route('/auth/login').post(controller.login);



export { router as userRouter };
