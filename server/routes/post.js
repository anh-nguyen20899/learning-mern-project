const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Post = require("../models/Post");


// GET Get Posts
router.get("/", verifyToken, async (req, res) => {
    try {
        // Find through the user 
        /*
        {
            "success": true,
            "message": "Happy Learning!!!",
            "post": {
              "title": "Learn Acting",
              "description": "Learn Acting with 2 hours tutorial on Youtube",
              "url": "https://youtube.com",
              "status": "LEARNING",
              "user": "63abb8ae3303265952ab1430",
              "_id": "63abba9946b234ad7c2457e1",
              "createdAt": "2022-12-28T03:40:09.955Z",
              "__v": 0
            }
        }

        */
        const posts = await Post.find({user: req.userId}).populate('user',['username']);
        if(posts) {
            return res.json({
                success: true,
                posts
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
})

// POST Create Post
router.post("/" , verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body;

    // Simple validation 
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Empty title"
        });
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith("https://") ? url : `https://${url}`),
            status: (status) ? status : 'TO LEARN',
            user: req.userId
        });

        await newPost.save();
        return res.json({
            success: true,
            message: "Happy Learning!!!",
            post: newPost
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
})

// PUT update Post
router.put("/:id", verifyToken, async (req, res) => {
    const {title, description, url, status} = req.body;

    // Simple validation 
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Empty title"
        });
    }
    try {
        let updatedPost = {
            title,
            description: description || ' ',
            url: (url.startsWith("https://") ? url : `https://${url}`) || ' ',
            status: status ? status : 'TO LEARN'
        };
        // Lay id cua post, userId
        const postUpdatedCondition = {_id: req.params.id, user: req.userId};
        updatedPost = await Post.findOneAndUpdate(postUpdatedCondition, updatedPost, {new: true});

        // User not authorize to update post
        if(!updatedPost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorize"
            });
        }
        return res.json({
            success: true,
            message: "Excellent. Updated successfully",
            post: updatedPost
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
    
})

router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const postDeletedCondition = {_id:req.params.id, user: req.userId};
        const deletedPost = await Post.findOneAndDelete(postDeletedCondition);
        if(!deletedPost) {
           return res.status(401).json({
               success: false,
               message: "Post not found or user not authorize"
           })
        }
        return res.json({
           success: true,
           message: "Deleted successfully",
           post: deletedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
      
})
module.exports = router