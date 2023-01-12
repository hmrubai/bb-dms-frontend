import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAllCategoryQuery } from '../../../services/catagoryApi';
import { useAddSubCategoryMutation } from '../../../services/subCategoryApi';
import { useSelector } from './../../../store/index';
function SubCategoryAdd() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth.user);

  const [addSubCategory, { data, isSuccess }] = useAddSubCategoryMutation();
  const { data: category, isSuccess:cateSucess } = useAllCategoryQuery()
  
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [catagory_id, setCatagoryId] = useState();
  const [image, setImage] = useState();

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('user_id', auth.id);

    if (catagory_id === undefined) {
      toast.error('Please Select Catagory');
  
    }

    formData.append('catagory_id', catagory_id);
    formData.append('description', description);
    if (image !== undefined) {
      formData.append('image', image);
    }
    await addSubCategory(formData);
  };

  if (isSuccess) {
    toast.success(data.message);
    history.goBack();
  }

  


  return (
    <Card>
      <Card.Header>
     
        <div className='d-flex justify-content-between'>
            <div>
                <Card.Title as="h5">Add Sub Category</Card.Title>   
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
                <Form.Label>Category</Form.Label>
              <Form.Control as="select" className="mb-3" name="catagory_id" onChange={(e) => setCatagoryId(e.target.value)}>
                <option>Selact Category</option>
                {cateSucess && category.map((item,i) => (
                  <option key={i} value={item.id}>{item.name}</option>
                ))}
                  </Form.Control>
                  </Col>
              </Row>


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

export default SubCategoryAdd;
