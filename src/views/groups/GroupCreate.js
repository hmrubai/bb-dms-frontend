import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useCreateGroupMutation } from '../../services/groupApi';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

function GroupCreate() {
  const history = useHistory();

  const [createGroup, res] = useCreateGroupMutation();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [user, setUser] = useState([]);
  const [member, setMember] = useState([]);

  // console.log(res);

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image !== undefined) {
      formData.append('image', image);
    }

    if (member.length <= 0) {
      toast.error('Please select member');
    }

  

    if (member.length > 0) {
      const arr = [];
      member.map((item) => {
        arr.push(item.id);
      });
      const memberArr = JSON.stringify(arr);
      
      formData.append('member', memberArr);
    }

    try {
      await createGroup(formData).unwrap();
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.goBack();
  }

  useEffect(() => {
    addUserMember();
  }, []);

  const addUserMember = (e) => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}all_user_for_group`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    }).then((res) => {
      setUser(res.data);
    });
  };

  return (
    <>
      <Form onSubmit={submitHandel} encType="multipart/form-data">
        <Card>
          <Card.Header>
           
            <div className='d-flex justify-content-between'>
            <div>
           <Card.Title as="h5">Create Group</Card.Title>
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
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Select Group Member</Form.Label>
                      <Multiselect options={user} placeholder="Select Member" onSelect={(e) => setMember(e)} displayValue="username" 
                        showArrow={true}
                      />
                    </Form.Group>

                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="1"
                        placeholder="Group Description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Label>Feature image</Form.Label>
                    <br />
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <input
                        type="file"
                        name="image"
                        accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf "
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="pt-3">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default GroupCreate;
