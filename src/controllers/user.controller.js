// Take User model
const User = require('../models/user.model');

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
    }
}