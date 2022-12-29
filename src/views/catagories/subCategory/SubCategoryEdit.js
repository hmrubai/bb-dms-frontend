import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useGetSubCategoryByIdQuery, useUpdateSubCatagoryMutation } from '../../../services/subCategoryApi';

function CatagoryEdit() {
    const {  id } = useParams();
  const history = useHistory();

  const [updateCatagory] = useUpdateSubCatagoryMutation() || {};
  const { data, isSuccess } = useGetSubCategoryByIdQuery(id);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [image, setImage] = useState();



  useEffect(() => {
    if (isSuccess) {
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
      setImage(data.image);
    }
  }, [id, isSuccess, data]);


  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('status', status)
    formData.append('image', image)
    updateCatagory({ id: id, data: formData });

    // if (cataResSucess) {
    //   toast.success(cataResData.message);
    // }
    history.push('/catagories/sub_category');
  };
  console.log(status)
 
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Edit Sub Category</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={submitHandel} encType="multipart/form-data">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Catagory Name" name="name" onChange={(e) => setName(e.target.value)} value={name} />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Catagory Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
            
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </Form.Control>

              <img className="img-circle mb-1" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} width="90px" alt="" />

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

export default CatagoryEdit;