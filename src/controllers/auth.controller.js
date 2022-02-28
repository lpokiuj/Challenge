// Take User model
const User = require('../models/user.model');

// Validation
const { registerValidation, loginValidation } = require('../utils/validation');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    register: async (req, res) => {

        // Validate
        const { error } = registerValidation(req.body);
        if(error){
            return res.status(400).json({
                err: error.details[0].message
            });
        }

        // Check if email already registered
        const emailExist = await User.findOne({ email: req.body.email });
        if(emailExist){
            return res.status(400).json({
                err: 'Email already exist'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        try{
            const savedUser = await user.save();
            res.status(201).json({
                user: user._id
            });
        }   
        catch(err){
            res.status(400).json({
                err: err
            });
        }

    },
    login: async (req, res) => {
        
        // Validate
        const { error } = loginValidation(req.body);
        if(error){
            return res.status(400).json({
                err: error.details[0].message
            });
        }

        // Check if email registered
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({
                err: 'Email doesn\'t exist'
            });
        }

        // Check if password correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){
            return res.status(400).json({
                err: 'Password incorrect'
            });
        }

        // Create and assign token
        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({
            token: token
        }); 

    }

}