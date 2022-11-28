import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useAddCatagoryMutation } from '../../../services/catagoryApi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from './../../../store/index';
function CatagoryAdd() {
  const auth = useSelector((state) => state.auth.user);
  const history = useHistory();
  const [addCatagory, { data, isSuccess }] = useAddCatagoryMutation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  // const [user_id, setUserId] = useState();
  const [image, setImage] = useState();

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('user_id', auth.id);
    formData.append('image', image);
    await addCatagory(formData);
  };

  if (isSuccess) {
    toast.success(data.message);
    history.push('/catagories/catagory');
   
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add Catagory</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={submitHandel} encType="multipart/form-data">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Catagory Name" name="name" onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Catagory Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
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

export default CatagoryAdd;
