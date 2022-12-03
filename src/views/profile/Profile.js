import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import avatar1 from '../../../src/assets/images/user/avatar-1.jpg';
function Profile() {
    const users = useSelector((state) => state.auth.user);
    console.log(users)
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className=" d-flex justify-content-center">
              <Card>
                              <Card.Img className='rounded-circle ' width="50%" height="150" src={users.image !== null ? `${process.env.REACT_APP_IMAGE_URL}${users.image}` : avatar1} />
                              <Card.Body>
                                  <h5>Name:{users.name }</h5>
                              </Card.Body>
                              
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Profile;
