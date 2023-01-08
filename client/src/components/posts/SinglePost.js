import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButtons';
const SinglePost = ({post}) => {

  return (
    <div>
        <Card className='shadow' border={post.status === 'LEARNED' ? 'success': post.status === 'LEARNING' ? 'warning' : 'primary'}> 
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{post.title}</p>
                        <Badge pill bg={post.status === 'LEARNED' ? 'success': post.status === 'LEARNING' ? 'warning' : 'primary'}>
                            {post.status}
                        </Badge>
                    </Col>
                    <Col className='text-right'>
                        <ActionButtons url={post.url} _id={post._id}/>
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>
                {post.description}
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
  )
}

export default SinglePost