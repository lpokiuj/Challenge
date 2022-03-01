// Take Post model
const Post = require('../models/post.model');

// Validation
const { postValidation, postUpdateValidation } = require('../utils/validation');

module.exports = {
    
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
    },
    updatePostbyId: async (req, res) => {

        // Validate
        const { error } = postUpdateValidation(req.body);
        if(error){
            return res.status(400).json({
                err: error.details[0].message
            });
        } 

        let post = await Post.findById(req.params.id).exec();
        if(!post){
            return res.status(404).json({
                msg: 'post not found'
            });
        }
        if(req.user._id != post.authorId){
            return res.status(401).json({
                msg: 'You are not authorized'
            });
        }

        post.description = req.body.description;

        try{
            const savedPost = await post.save()
            res.status(200).json({
                post: post
            });
        }
        catch(err){
            res.status(400).json({
                err: err
            });
        }

    },
    deletePostbyId: async (req, res) => {

        let post = await Post.findById(req.params.id).exec();
        if(!post){
            return res.status(404).json({
                msg: 'post not found'
            });
        }
        if(req.user._id != post.authorId){
            return res.status(401).json({
                msg: 'You are not authorized'
            });
        }

        try{
            const deletedPost = await Post.deleteOne({ _id: req.params.id });
            res.status(200).json({
                msg: 'Post deleted'
            });
        }
        catch(err){
            res.status(400).json({
                err: err
            });
        }
    }

}