import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useCreateGroupMutation, useSingalGroupQuery, useUpdateGroupMutation } from '../../services/groupApi';

function GroupUpdate() {
  const {id}=useParams()
  const history = useHistory();
  const { data, isFetching, isSuccess, isLoading } = useSingalGroupQuery(id)
  const [updateGroup,resp]=useUpdateGroupMutation()
 

  // console.log(data);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [user, setUser] = useState([]);
  const [member, setMember] = useState([]);
  const [defaultSelectMember, setDefaultSelectMember] = useState([]);


  // console.log(res);





  const submitHandel = async (e) => {
 
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image !== undefined) {
      formData.append('image', image);
    }



   const arr = [];
    if (member.length > 0) {
      member.map((item) => {
        arr.push(item.id);
      });
      
      const memberArr = JSON.stringify(arr);
      formData.append('member', memberArr);
    } else {
      defaultSelectMember.map((item) => {
        arr.push(item.id);
      })
      const memberArr = JSON.stringify(arr);
      formData.append('member', memberArr);
    }

    try {
      await updateGroup({ id: id, data: formData }).unwrap();
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  if (resp.isSuccess) {
    toast.success(resp.data.message);
    history.push('/groups/group');
  }

  useEffect(() => {
    addUserMember();
    if (isSuccess) {
      setName(data?.data?.name)
      setDescription(data?.data?.description)
      setDefaultSelectMember(data?.data?.user)
      setImage(data?.data?.image)

    }
  }, [isSuccess]);

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
            <Card.Title as="h5">Create Group</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Select Group Member</Form.Label>
                      <Multiselect
                        options={user}
                        placeholder="Select Member"
                        onSelect={(e) => setMember(e)}
                        displayValue="username"
                        showArrow={true}
                        selectedValues={defaultSelectMember}
                        disablePreSelectedValues={true}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    
                    <img className="img-circle mb-1" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} width="90px" alt="" />
                    <br/>
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

export default GroupUpdate;
