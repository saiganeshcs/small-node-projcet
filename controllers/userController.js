const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @decs register a user
// @decs post /api/users/register
// @access public

const registerUser = asyncHandler(async (req,res)=>{
    const { userName, email, password } = req.body
    if(!userName || !email || !password){
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error('User already registered')
    }

// hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })
    user ? res.status(201).json({_id: user._id, email: user.email}) : res.status(400).json({message: 'Invalid user data'})
})

// @decs login a user
// @decs post /api/users/login
// @access public

const loginUser = asyncHandler(async (req,res)=>{
const {email,password}=req.body
if(!email || !password){
    res.status(400)
    throw new Error('Please fill all the fields')
}
const userDetails = await User.findOne({email})
// compare password with hashed password
const passwordMatch = userDetails ? await bcrypt.compare(password, userDetails.password) : false
if(userDetails && passwordMatch){
    const accessToken = jwt.sign({
        user:{
            userName: userDetails.userName,
            email: userDetails.email,
            id: userDetails._id 
        }
    }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.TOKEN_EXPIRES_IN })
    res.status(200).json({accessToken})
}else{
    res.status(401)
    throw new Error('Invalid email or password')
}
})

// @decs get current user info
// @decs get /api/users/current
// @access private

const getCurrentUser = asyncHandler(async (req,res)=>{
    
    res.status(200).json(req.user)
})  

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}