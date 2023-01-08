import React, { useContext, useEffect } from 'react';
import NavBarMenu from '../components/layout/NavBarMenu';
import { PostContext } from '../contexts/PostContext';
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from '../contexts/AuthContext';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SinglePost from '../components/posts/SinglePost';
import AddPostModal from '../components/posts/AddPostModal';
import addIcon from '../assets/plus-circle-fill.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import UpdatePostModal from '../components/posts/UpdatePostModal';
const Dashboard = () => {
  // useContext user
  const {authState: {user: {username}}} = useContext(AuthContext);

  // useContext post
  const {
   postState: {post, posts, postLoading},
   getPosts, 
   setShowAddPostModal,
   showToast: {show, message, type},
   setshowToast
  } = useContext(PostContext);
  
  let body = null;
  // Start Get all posts
  useEffect(()  => {getPosts()}, []);
  if(postLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation="border" variant='info'/>
      </div>
    )
  } else if(posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'> 
            Hi {username}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Welcome to Learn Today!
            </Card.Title>
            <Card.Text> Click the button below to add new Skills today </Card.Text>
            <Button variant='primary' onClick={setShowAddPostModal.bind(this,true)}>Learn Today</Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    // When posts.length > 0
    body = 
    <>
    <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
      {posts.map(post => (
        <Col key={post._id} className="my-2">
          <SinglePost post={post}></SinglePost>
        </Col>
      )    
      )}
    </Row>
    {/* show AddPost Modal */}
    <OverlayTrigger placement='top' overlay={<Tooltip>Add new Skills Today</Tooltip>}>
      <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
        <img src={addIcon} alt='add-post' width='60' height='60'></img>
      </Button>
    </OverlayTrigger>
    </>
  }
  return (
    <div>
      <NavBarMenu>   
      </NavBarMenu>
      {body}
      <AddPostModal>  
      </AddPostModal>
      {post !== null && <UpdatePostModal></UpdatePostModal>}
      {/* After add Post success show Toast */}
      <Toast show={show} style={{position: 'fixed', top: '20%', right: '10px'}
      } className={`bg-${type} text-white`} 
        onClose={setshowToast.bind(this, {
        show: false,
        message: '',
        type: null
      })} delay={3000} autohide>
        <Toast.Body>
          <strong>
            {message}
          </strong>
        </Toast.Body>
      </Toast>
    </div>
    
  )
}

export default Dashboard