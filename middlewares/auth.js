import { users } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(404).json({
            success: false,
            message: 'Login First',
        });
    }

    const decoded_data = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await users.findById(decoded_data._id);
    next();
}