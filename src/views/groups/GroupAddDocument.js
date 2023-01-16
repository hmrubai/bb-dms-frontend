import JoditEditor from 'jodit-react';
import React from 'react';
import { useState, useRef } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAddGroupDocumentMutation } from '../../services/groupApi';
// import { useSelector } from './../../store/index';

function GroupAddDocument() {
  const history = useHistory();
  const { id } = useParams();
  const editor = useRef(null);
  // const auth = useSelector((state) => state.auth.user);

  const [addGroupDocument, res] = useAddGroupDocumentMutation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [previewImage, setImagePreview] = useState();

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('group_id', id);
    formData.append('description', description);

    if (file !== undefined) {
      formData.append('file', file);
    }

    try {
      await addGroupDocument(formData).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.goBack();
  }

  function handelImage(e) {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }


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
                <Col md={12}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
                </Col>
                <Col md={12}>
                <Form.Label>Description</Form.Label>
                  <JoditEditor
                    ref={editor}
                    value={description}
                    // config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                    // onChange={(newContent) => {setDescription(newContent.target.value)}}
                  />
                </Col>
              </Row>
              <div>
                    <img src={previewImage} className="py-2" width="90px"  alt="" />
                    </div>
              <Form.Group controlId="exampleForm.ControlInput1">
                <input
                  type="file"
                  name="file"
                  accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation/application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document/application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/application/vnd.oasis.opendocument.text/application/vnd.oasis.opendocument.spreadsheet/application/vnd.oasis.opendocument.presentation"
                  onChange={(e) => { setFile(e.target.files[0]); handelImage(e);}}
                  required
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

export default GroupAddDocument;
