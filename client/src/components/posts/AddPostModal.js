import React from 'react';
import { useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
    // Context
    const {showAddPostModal, setShowAddPostModal, addPost, setshowToast} = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    });
    const {title, description, url} = newPost;
    const OnChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value});
    const closeDialog = () => {
        resetPostData();
    }
    const onsubmit = async (event) => {
        event.preventDefault();
        const {success, message} = await addPost(newPost);
        resetPostData();
        setshowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        })
    }
    const resetPostData = () => {
        setNewPost({title: '',
        description: '',
        url: '',
        status: 'TO LEARN'});
        setShowAddPostModal(false);
    }
  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
            <Modal.Title>
                What do you like to learn?
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onsubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={OnChangeNewPostForm}/>
                    <Form.Text id='title-help' muted> Required </Form.Text>
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Control as='textarea' rows='3' placeholder='Description' name='description' value={description} onChange={OnChangeNewPostForm} />                   
                </Form.Group>

                <Form.Group className='my-3'>
                    <Form.Control type='text' rows='3' placeholder='URL' name='url' value={url} onChange={OnChangeNewPostForm}/>                   
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeDialog}> Cancel</Button>
                <Button variant='primary' type='submit'> Learn Today</Button>
            </Modal.Footer>
        </Form>
    </Modal>
  )
}

export default AddPostModal