import React from 'react';
import { createContext, useReducer, useState } from "react";
import {postReducer} from '../reducers/postReducer'
import { apiUrl } from "./constants";
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({children}) => {

    // State
    const [postState, dispatch] = useReducer(postReducer,{
        post: null,
        posts: [],
        postLoading: true
    });
    // State addPost Modal
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    // State updatePost Modal
    const [showUpdatePostModal, setshowUpdatePostModal] = useState(false);

    // State show Toast Message for Post
    const [showToast, setshowToast] = useState({
        show: false,
        message: '',
        type: null
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if(response.data.success) {
                dispatch({
                    type: 'POST_LOADED_SUCCESS',
                    payload: response.data.posts
                })
            }
        } catch (error) {
            // return error.response.data ? error.response.data : {success: false, message: 'Server error'};
            dispatch({
                type: 'POST_LOADED_FAILED'
            })
        }
    }
    // addPost
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if(response.data.success) {
            dispatch({
                type: 'ADD_POST',
                payload: response.data.post
            })
            return response.data;
        }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server Error'};
        }
        
    }
    // delete Post
    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`);
            if(response.data.success) {
                dispatch({
                    type: 'DELETE_POST',
                    payload: id
                })
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server Error'};
        }
    }
    // find Post when user is updating Post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId);
        dispatch({
            type: 'FIND_POST',
            payload: post
        })
    }
    // delete Post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if(response.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: response.data.post
                })
            return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server Error'};
        }
    }
    // PostContextData
    const postContextData = {postState,
         getPosts,
         showAddPostModal,
         setShowAddPostModal, 
         addPost, 
         showToast, 
         setshowToast, 
         deletePost,
         updatePost,
         findPost,
         showUpdatePostModal,
         setshowUpdatePostModal}
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider