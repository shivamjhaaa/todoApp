import { users } from "../models/user.js";
import bcrypt from 'bcrypt';
import { setcookie } from "../utils/features.js";



export const getalluser = async (req, res) => {

    try {
        const usersdata = await users.find({})

        res.json({
            success: true,
            usersdata,
        })
    } catch (error) {
        next(error)
    }
}

export const finduser = async (req, res) => {
    try {
        const { id } = req.params; // can acces using params
        const user = await users.findById(id);

        console.log(req.params);

        res.json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        let user = await users.findOne({ email });

        if (user) return next(new ErrorHandler('User Already Exists', 400));

        const hashedpassword = await bcrypt.hash(password, 10);

        user = await users.create({
            name,
            email,
            password: hashedpassword,
        });

        setcookie(user, res, 201, 'Registered Succesfully')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        let user = await users.findOne({ email }).select('+password');

        if (!user) return next(new ErrorHandler('Invalid Email or Password', 400));

        const isMatch = bcrypt.compare(password, user.password);

        if (isMatch) setcookie(user, res, 201, 'Logged In Succesfully')
        else return next(new ErrorHandler('Invalid Email or Password', 400));
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    try {
        res.status(200)
            .cookie('token', '', {
                expires: new Date(Date.now()),
                samesite: process.env.node_env === 'DEV' ? 'lax' : 'none', //while deploying necessary
                secure: process.env.node_env === 'DEV' ? false : true // while deploying necessary
            })
            .json({
                success: true,
                message: 'User Logged Out Successfully',
            });
    } catch (error) {
        next(error);
    }
}