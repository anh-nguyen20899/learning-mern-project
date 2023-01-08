const express = require('express');
const verifyToken = require('../middleware/auth');
const router = express.Router();
const Comment = require("../models/Comment");

// Get Comments of an user
router.get("/", verifyToken, async (req, res) => {
    
    try {
        const comments = await Comment.find({user: req.userId}).populate('user',['username']);
        if(!comments) {
            return res.status(400).json({
                success: false,
                message: "User not exists or Comments not found for this User"
            })
        }
        return res.json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
    
})

// Get Comments of a post
router.get("/:id", verifyToken, async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.find({post: postId}).populate('post',['title']);
        if(!comments) {
            return res.status(400).json({
                success: false,
                message: "User not exists or Comments not found for this Post"
            })
        }
        return res.json({
            success: true,
            comments: comments
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
    
})

// POST create comment
router.post("/", verifyToken, async(req, res) => {
    const {description, post} = req.body;
    // Simple validation
    if(!description || !post) {
        return res.status(401).json({
            success: false,
            message: "Empty description or empty post"
        })
    }
    const newComment = new Comment({
        description,
        post,
        user: req.userId,
    })
    await newComment.save();
    return res.json({
        success: true,
        message: "Created comment successfully",
        newComment
    });
})

// Update a Comment
router.put("/:id", verifyToken, async(req, res) => {
    const {description, post} = req.body;
    // Simple validation
    if (!description || !post) {
        res.status(401).json({
            success: false,
            message: "Empty description or empty post"
        });
    }
    try {
        let updatedComment = {
            description: description || ' ',
            post,
        }
        const updateCommentCondition = {_id:req.params.id, user: req.userId};
        updatedComment = await Comment.findOneAndUpdate(updateCommentCondition, updatedComment, {new: true});
    
        // User not authorize to update comment
        if(!updatedComment) {
            return res.status(401).json({
                success: false,
                message: "Comment not found or user not authorize to update comment"
            });
        }
        return res.json({
            success: true,
            message: "Excellent. Updated successfully",
            comment: updatedComment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
    
})

// Delete a Comment
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const deletedCommentCondition = {_id:req.params.id, user: req.userId};
        const deletedComment = await Comment.findOneAndDelete(deletedCommentCondition);
    
        // User not authorize to update comment
        if(!deletedComment) {
            return res.status(401).json({
                success: false,
                message: "Comment not found or user not authorize to update comment"
            });
        }
        return res.json({
            success: true,
            message: "Deleted successfully",
            comment: deletedComment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
    
})
module.exports = router;