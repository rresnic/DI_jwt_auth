const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

module.exports = {
    registerUser: async (req, res) => {
        const {password, email} =  req.body;
        try {
            const user = await userModel.createUser(password, email);
            res.status(201).json({
                message: "User registered successfully",
                user,
            })
        } catch (error) {
            console.log(error);
            if(error.code === "23505") {
                res.status(500).json({
                    message: "Email already exists"
                })
            }
            else {
                res.status(500).json({
                    message: "Internal Server Error"
                })
            }
            
            
        }
    },
    loginUser: async (req, res) => {
        const {password, email} = req.body;

        try {
            const user = await userModel.getUserByEmail(email)
            if(!user) {
                res.status(404).json({message: "User not found"})
                return;
            }

            const passwordMatch = await bcrypt.compare(password+"", user.password);
            if(!passwordMatch) {
                res.status(404).json({message:"Wrong password"
                })
                return;
            }
            const {ACCESS_TOKEN_SECRET} = process.env;

            /** generate token */
            const accessToken = jwt.sign(
                {userid: user.id, email: user.email},
                ACCESS_TOKEN_SECRET,
                {expiresIn: "60s"}
            );

            res.cookie("token", accessToken, {
                httpOnly: true,
                maxAge:60 * 1000, 
            });
            res.status(200).json({
                message:"Login successful",
                user: {userid: user.id, email:user.email},
                token: accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    },
    getAllUsers: async (req, res) => {
        const {password, email} =  req.body;
        try {
            const users = await userModel.getUsers();
            res.status(200).json(
                users,
            )
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
            return;
            
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie("token");
        req.cookies['token'] = null;
        delete req.cookies['token']
        // if using db authentication, set it to null
        res.sendStatus(200);
    },
    verifyAuth: (req, res) => {
        const {userid, email} = req.user;
        const {ACCESS_TOKEN_SECRET} = process.env;
        const newAccessToken = jwt.sign(
            {userid, email},
            ACCESS_TOKEN_SECRET,
            {expiresIn: "60s"}
        );
        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60*1000,
        });
        res.json({
            message: "refreshed token",
            user: {userid, email},
            token: newAccessToken,
        })
    },
}