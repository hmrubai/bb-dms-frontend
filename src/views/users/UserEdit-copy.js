import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../services/userApi';
import { useGetAllPermissionQuery } from '../../services/permissionApi';
import { authApiContext } from '../../contexts/Api/AuthApi';

function UserEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [updateUser, res] = useUpdateUserMutation() || {};
  const response = useGetAllPermissionQuery();
  const { data, isSuccess, isFetching } = useGetUserByIdQuery(id);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [number, setNumber] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  // const [password, setPassword] = useState();
  const [image, setImage] = useState();
  const [permission, setPermission] = useState([]);
  const permissionArr = JSON.stringify(permission);
  const [permissionId, setPermissionId] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setName(data.name);
      setEmail(data.email);
      setUsername(data.username);
      setNumber(data.number);
      setGender(data.gender);
      setStatus(data.status);
      setImage(data.image);

      data.user_has_permission.map((item) => {
        permissionId.push(item.permission.id);
        //permission.push(item.permission.id);
        //console.log(permissionId)
      });
    }
  }, [id, isSuccess, data, permissionId]);

  

  // if (data?.user_has_permission) {
  //   console.log(data?.user_has_permission)
  //   let existing_permission = data?.user_has_permission;
  //   existing_permission.forEach(element => {
      
  //   });
    
  // }

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('number', number);
    formData.append('gender', gender);
    formData.append('status', status);
    formData.append('image', image);
    if (permission.length > 0) {
      formData.append('permission', permissionArr);
    }

    try {
      await updateUser({ id: id, data: formData }).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.push('/users/user');
  }

  function checkData() {
    //console.log(permissionId)
    console.log(permission)
    //console.log(permissionArr);
  }


  const handleChange = (event) => {
    //console.log(event)
    console.log(permissionId)
    const { checked, value } = event.target;
    //console.log(value)
    if (checked) {
      setPermission([...permission, value]);
    } else {
      setPermission(permission.filter((item) => item !== value));
    }
    console.log(permission)
  };



  return (
    <div>
      <Form onSubmit={submitHandel} encType="multipart/form-data">
        <Card>
          <ToastContainer />
          <Card.Header>
            <Card.Title as="h5">Edit User</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col>
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
                  <Col>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        value={username}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Number"
                    name="number"
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    value={number}
                  />
                </Form.Group>

                <Row>
                  {/* <Col>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                  </Col> */}
                  <Col>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                      <option value={status}>{status}</option>
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
                <img className="img-circle mb-1" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} width="90px" alt="" />
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
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Edit Role To Permission</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {/* <Form.Group > */}
                {/* <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" name="role_id"
                  value={allData.role_id}
                  onChange={handelRoleId}
                > */}
                {/* <option>Default select</option> */}
                {/* {roleListAllData.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.role_name}
                    </option>
                  ))} */}
                {/* </Form.Control>
              </Form.Group> */}
                <hr />
                <h6>Assign Permission</h6>
                <hr />
                <Form.Group className="d-flex wrap">
                  {permissionId.length > 0
                    ? response?.data?.map((item) => {
                        return (
                          <div key={item.id}>
                            <Form.Check
                              className="mr-2"
                              type="checkbox"
                              label={item.name}
                              name="permission_id"
                              id={item.id}
                              defaultChecked={permissionId.includes(item.id) == true ? true : false}
                              // value={item.id}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        );
                      })
                    : response?.data?.map((item) => {
                        return (
                          <div key={item.id}>
                            <Form.Check
                              className="mr-2"
                              type="checkbox"
                              label={item.name}
                              name="permission_id"
                              id={item.id}
                              value={item.id}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        );
                      })}
                </Form.Group>
                <div className="pt-2">
                  <Button onClick={checkData} >Check</Button>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
}

export default UserEdit;
