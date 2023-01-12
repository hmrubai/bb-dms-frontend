import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useAddCatagoryMutation } from '../../../services/catagoryApi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from './../../../store/index';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
function CatagoryAdd() {
  // const authPermission = useSelector((state) => state.auth.permissions);
  const auth = useSelector((state) => state.auth.user);
  const history = useHistory();
  const [addCatagory, { data, isSuccess }] = useAddCatagoryMutation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('user_id', auth.id);
    if (image !== undefined) {
      formData.append('image', image);
    }

    try {
      await addCatagory(formData).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (isSuccess) {
    toast.success(data.message);
    history.goBack();
  }
  // if (authPermission.includes('category_create')) {
    return (
      <Card>
        <Card.Header>
      
          <div className='d-flex justify-content-between'>
            <div>
            <Card.Title as="h5">Add Catagory</Card.Title>
            </div>
            <div>
            <span className="me-auto pointer">
                <div onClick={() => history.goBack()}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form onSubmit={submitHandel} encType="multipart/form-data">
                <Row>
                      <Col md={6}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Catagory Name" name="name" onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="1"
                    placeholder="Catagory Description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                </Col> 
                </Row>
           
               
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
  // } else {
  //   return (
  //     <div class="alert alert-danger" role="alert">
  //     Sorry You are not authorized to access this page
  //     </div>
  //   );
  // }
}

export default CatagoryAdd;
