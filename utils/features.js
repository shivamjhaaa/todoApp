
import jwt from 'jsonwebtoken';

export const setcookie = (user,res,statuscode, message) =>{
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);

    res.status(statuscode).cookie('token',token,{
        httpOnly: true,
        maxAge: 30*60*1000,
        samesite: process.env.node_env === 'DEV' ? 'lax' : 'none' , //while deploying necessary
        secure: process.env.node_env === 'DEV' ? false : true // while deploying necessary
    }).json({ 
        success: true,
        message
    })
}
