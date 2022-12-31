import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetDocumentByIdQuery, useUpdateDocumentMutation } from '../../services/documentApi';

function DocumentEdit() {
  const history = useHistory();
  const { id } = useParams();
  const { data: singleDoc, isSuccess } = useGetDocumentByIdQuery(id);
  const [updateDocument, { data, isSuccess: isSuccessUp }] = useUpdateDocumentMutation();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (isSuccess) {
      setName(singleDoc.name);
      setStatus(singleDoc.status);
      setDescription(singleDoc.description);
      setFile(singleDoc.file);
    }
  }, [id, isSuccess, singleDoc]);

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (status !== undefined) {
      formData.append('status', status);
    }

    if (file !== undefined) {
      formData.append('file', file);
    }

    try {
      await updateDocument({ id: id, data: formData }).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (isSuccessUp) {
    toast.success(data.message);
    history.push('/documents/document');
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Edit Document</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Form onSubmit={submitHandel} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      value={name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                    {/* <option>{status}</option> */}
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </Form.Control>
                  </Col>
                </Col>

              </Row>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Group>


              <Form.Group controlId="exampleForm.ControlInput1">
                <input
                  type="file"
                  name="file"
                  accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation/application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document/application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/application/vnd.oasis.opendocument.text/application/vnd.oasis.opendocument.spreadsheet/application/vnd.oasis.opendocument.presentation"
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

export default DocumentEdit;
