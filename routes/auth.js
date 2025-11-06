const { signUpValidation}= require('../middleware/authValidation');
const { signInValidation}= require('../middleware/authValidation');
const UserModel = require('../Schemas/user');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', signUpValidation, async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            return res.status(409).json({message: "user already exists, please login", success: false});
        }
        const newUser = new UserModel({ email, username, password });
        newUser.password =  await bcrypt.hash(password,10);
        await newUser.save().then( () =>res.status(201).json({message: "User created successfully", success: true}));
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

router.post('/signin',signInValidation, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "user not found, please signup", success: false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "incorrect password", success: false});
        }
        const { password:pwd  , ...others } = user._doc;
        res.status(200).json({others, message: "login successful", success: true});
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }  
});


module.exports = router;