// Take Post model
const Post = require('../models/post.model');

// Validation
const { postValidation } = require('../utils/validation');

module.exports = {
    
    // Create post
    createPost: async (req, res) => {

        // Validate
        const { error } = postValidation(req.body);
        if(error){
            return res.status(400).json({
                err: error.details[0].message
            });
        }

        let post = new Post({
            title: req.body.title,
            description: req.body.description,
            authorId: req.user._id,
            authorName: req.user.name
        });

        try{
            const savedPost = await post.save();
            res.status(201).json({
                post: post
            });
        }   
        catch(err){
            res.status(400).json({
                err: err
            });
        }

    },
    getPost: async (req, res) => {
        let postList = await Post.find({});
        if(!postList){
            return res.status(404).json({
                msg: 'Post list not found'
            });
        }
        res.status(200).json({
            post: postList
        });
    },
    getPostbyId: async (req, res) => {
        let post = await Post.findById(req.params.id).exec();
        if(!post){
            return res.status(404).json({
                msg: 'post not found'
            });
        }
        res.status(200).json({
            post: post
        });
    }

}