// Take User model
const User = require('../models/user.model');

// Validation
const { userUpdateValidation } = require('../utils/validation');

module.exports = {
    getAllUser: async (req, res) => {
        let userList = await User.find({});
        if(!userList){
            return res.status(404).json({
                msg: 'User list not found'
            });
        }
        res.status(200).json({
            user: userList.map((el) => {
                return el.name
            })
        });
    },
    getUserbyId: async (req, res) => {
        let user = await User.findById(req.params.id).exec();
        if(!user){
            return res.status(404).json({
                msg: 'User not found'
            });
        }
        res.status(200).json({
            user: user.name
        });
    },
    updateUserbyId: async (req, res) => {

        // Validate
        const { error } = userUpdateValidation(req.body);
        if(error){
            return res.status(400).json({
                err: error.details[0].message
            });
        }

        let user = await User.findById(req.params.id).exec();
        if(!user){
            return res.status(404).json({
                msg: 'User not found'
            });
        }
        if(req.user._id != user._id){
            return res.status(401).json({
                msg: 'You are not authorized'
            });
        }

        const emailExist = await User.findOne({ email: req.body.email });
        if(emailExist){
            return res.status(400).json({
                err: 'Email already exist'
            });
        }

        user.email = req.body.email;

        try{
            const savedUser = await user.save();
            res.status(201).json({
                id: user._id
            });
        }
        catch(err){
            res.status(400).json({
                err: err
            });
        }
    },
    deleteUserbyId: async (req, res) => {
        let user = await User.findById(req.params.id).exec();
        if(!user){
            return res.status(404).json({
                msg: 'User not found'
            });
        }
        if(req.user._id != user._id){
            return res.status(401).json({
                msg: 'You are not authorized'
            });
        }
        try{
            const deletedUser = await User.deleteOne({ _id: req.params.id });
            res.status(200).json({
                msg: 'User deleted'
            });
        }
        catch(err){
            res.status(400).json({
                err: err
            });
        }
    }
}