import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PostContext } from '../../contexts/PostContext';

const UpdatePostModal = () => {
  // Context
  const {showUpdatePostModal, setshowUpdatePostModal, postState: {post}, updatePost, setshowToast} = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => 
    setUpdatedPost(post), [post]
  );

  const {title, description, url, status} = updatedPost;
  const OnChangeUpdatedPostForm = event => setUpdatedPost({...updatedPost, [event.target.name]: event.target.value});
  
  const closeDialog = () => {
      setUpdatedPost(post);
      setshowUpdatePostModal(false);
  }
  const onsubmit = async (event) => {
      event.preventDefault();
      const {success, message} = await updatePost(updatedPost);
      setshowUpdatePostModal(false);
      setshowToast({
          show: true,
          message: message,
          type: success ? 'success' : 'danger'
      })
  }
return (
  <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
          <Modal.Title>
              Updating your Progress?
          </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onsubmit}>
          <Modal.Body>
              <Form.Group>
                  <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={OnChangeUpdatedPostForm}/>
                  <Form.Text id='title-help' muted> Required </Form.Text>
              </Form.Group>

              <Form.Group className='my-3'>
                  <Form.Control as='textarea' rows='3' placeholder='Description' name='description' value={description} onChange={OnChangeUpdatedPostForm} />                   
              </Form.Group>

              <Form.Group className='my-3'>
                  <Form.Control type='text' rows='3' placeholder='URL' name='url' value={url} onChange={OnChangeUpdatedPostForm}/>                   
              </Form.Group>

              <Form.Group className='my-3'>
                  <Form.Control 
                  as="select" 
                  value={status}
                  name='status'
                  onChange={OnChangeUpdatedPostForm}> 
                  <option value="TO LEARN"> TO LEARN </option>
                  <option value="LEARNING"> LEARNING </option>
                  <option value="LEARNED"> LEARNED</option>
                </Form.Control>               
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

export default UpdatePostModal