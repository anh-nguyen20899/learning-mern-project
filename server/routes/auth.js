const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// Get api/auth Check if user is logged in (Public)
router.get("/", verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) return res.status(400).json({success: false, message: 'User not found'});
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server"
            })
    }
})

// Post /api/auth/register
// Async
router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    // Simple validation
    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password"
        })
    }

    try {
        // Check for existing user
        const user = await User.findOne({username});
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please choose another name."
            })
        }       
        // All good
        const hasedPassword = await argon2.hash(password);
        const newUser = new User({username, password: hasedPassword});
        await newUser.save();

        // return access token
        // user attach token in the header
        const accessToken = jwt.sign(
            {userId: newUser._id},
            process.env.ACCESS_TOKEN_SECRET
            );
        res.json({
                success: true, 
                message: "User created successfully",
                accessToken
        });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server"
            })
    }
});

// POST login user
router.post("/login", async (req,res) => {
    const {username, password} = req.body;

    // Simple validation
    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password"
        })
    }
    try {
        // Check for existing User
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username"
            })
        }

        // Username found and then verify password
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        // return access token
        // user attach token in the header
        const accessToken = jwt.sign({userId: user._id},
            process.env.ACCESS_TOKEN_SECRET);
        res.json({
            success: true, 
            message: "Login successfully",
            accessToken});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        })
    }
    

})
module.exports = router