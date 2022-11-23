import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddUserMutation } from '../../services/userApi';

function UserAdd() {
  const history = useHistory();
  const [addUser, res] = useAddUserMutation();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [number, setNumber] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState();

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('number', number);
    formData.append('gender', gender);
    formData.append('status', status);
    formData.append('password', password);
    formData.append('image', image);
    await addUser(formData);
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.push('/users/user');
  }

  if (res.isError) {
    toast.error(res.error?.data.message);
  }

  // if (isSuccess) {
  //   toast.success(data.message);
  //   history.push('/users/user');
  // }

  console.log(res);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add User</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={submitHandel} encType="multipart/form-data">
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Number</Form.Label>
                <Form.Control type="number" placeholder="Number" name="number" onChange={(e) => setNumber(e.target.value)} required />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                    <option>Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </Form.Control>
                </Col>
              </Row>

              <Form.Label>Gender</Form.Label>

              <div className="d-flex pb-3 pl-2">
                <div className=" pr-5">
                  <Form.Check
                    custom
                    type="radio"
                    label="Male"
                    name="gender"
                    id="supportedRadio3"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div>
                  <Form.Check
                    custom
                    type="radio"
                    label="Female"
                    name="gender"
                    id="supportedRadio4"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>

              <Form.Group controlId="exampleForm.ControlInput1">
                <input
                  type="file"
                  name="image"
                  accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf "
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default UserAdd;
