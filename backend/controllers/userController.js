const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword, 'hashPassword ');

    const user = await User.create({ username, email, password: hashPassword });
    console.log('user created ', user);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("User data wasn't valid");
    }
    res.json({
        message: 'Welcome, Register the user'
    })
})

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler( async (req, res) => {
    res.json({
        message: 'Welcome, Login user'
    })
})

// @desc Current user info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler( async (req, res) => {
    res.json({
        message: 'Welcome, Current user information'
    })
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}