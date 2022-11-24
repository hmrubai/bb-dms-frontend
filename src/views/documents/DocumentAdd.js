import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCategoryAllShowQuery, useGetSubCatagoryShowQuery } from '../../services/catagoryApi';
import { useAddDocumentMutation } from '../../services/documentApi';
import { useGetSubSubCatagoryShowQuery } from '../../services/subCategoryApi';

function DocumentAdd() {

  const history = useHistory();

  const [addUser, res] = useAddDocumentMutation();
  const { data, isLoading, isError, isSuccess } = useGetCategoryAllShowQuery();

  console.log(res);

  const [name, setName] = useState();
  const [user_id, setUser_id] = useState(1);
  const [catagory_id, setCatagry_id] = useState();
  const [sub_catagory_id, setsub_catagory_id] = useState();
  const [sub_sub_catagory_id, setSub_sub_catagory_id] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [admin_status, setAdmin_status] = useState();

  const [file, setFile] = useState();
  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('user_id', user_id);
    formData.append('catagory_id', catagory_id);
    formData.append('sub_catagory_id', sub_catagory_id);
    formData.append('sub_sub_catagory_id', sub_sub_catagory_id);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('admin_status', admin_status);
    formData.append('file', file);
    await addUser(formData);
  };

  const { data: subCategoryShow } = useGetSubCatagoryShowQuery(catagory_id);
  const { data: subSubCategoryShow } = useGetSubSubCatagoryShowQuery(sub_catagory_id);

  // if (res.isSuccess) {
  //   toast.success(res.data.message);
  //   history.push('/users/user');
  // }

  // if (res.isError) {
  //   toast.error(res.error?.data.message);
  // }

  // if (isSuccess) {
  //   toast.success(data.message);
  //   history.push('/users/user');
  // }



  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Add Document</Card.Title>
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

              <Row>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                    <option>Selact Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </Form.Control>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" className="mb-3" name="catagory_id" onChange={(e) => setCatagry_id(e.target.value)}>
                    <option>Selact Catagory</option>
                    {data?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control as="select" className="mb-3" name="sub_catagory_id" onChange={(e) => setsub_catagory_id(e.target.value)}>
                    <option>Selact Sub Category</option>

                    {subCategoryShow?.sub_catagory?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Sub Sub Category</Form.Label>
                  <Form.Control
                    as="select"
                    className="mb-3"
                    name="sub_sub_catagory_id"
                    onChange={(e) => setSub_sub_catagory_id(e.target.value)}
                  >
                    <option>Selact Sub Sub Category</option>

                    {subSubCategoryShow?.sub_sub_catagory?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>

              <Form.Group controlId="exampleForm.ControlInput1">
                <input
                  type="file"
                  name="file"
                  accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={(e) => setFile(e.target.files[0])}
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

export default DocumentAdd;