import express from "express"
import { register, login, finduser, getalluser, getMyProfile, logout } from "../controller/userfunctions.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/all' , getalluser);

router.get('/userid/:id',finduser);

router.get('/profile' , isAuthenticated, getMyProfile);



//Post

router.post('/register' , register);

router.post('/login' , login);

router.get('/logout' , isAuthenticated , logout);



export default router;