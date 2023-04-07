import express from "express";
import { deletetask, mytask, newtask, updatetask } from "../controller/taskfunctions.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new' , isAuthenticated , newtask);
router.get('/mytasks' , isAuthenticated , mytask);

router.route('/:id',isAuthenticated).put(updatetask).delete(deletetask);


export default router;