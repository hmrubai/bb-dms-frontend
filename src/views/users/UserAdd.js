import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAllPermissionQuery } from '../../services/permissionApi';
import { useAddUserMutation } from '../../services/userApi';
import { useSelector } from 'react-redux';
import avatar from '../../assets/images/user/avatar-1.jpg'

function UserAdd() {
  const authPermission = useSelector((state) => state.auth.permissions);
  const history = useHistory();
  const [addUser, res] = useAddUserMutation();
  const response = useGetAllPermissionQuery();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [number, setNumber] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState('Pending');
  const [password, setPassword] = useState();
  const [image, setImage] = useState();
  const [previewImage, setImagePreview] = useState();
  const [permission, setPermission] = useState([]);
  const permissionArr = JSON.stringify(permission);

  const submitHandel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('number', number);
    formData.append('gender', gender);
    if (status !== undefined) {
      formData.append('status', status);
    }
    formData.append('password', password);



    if (image !== undefined) {

       formData.append('image', image);
    }

    if (permission.length > 0) {
      formData.append('permission', permissionArr);
    }

    try {
      await addUser(formData).unwrap();
    } catch (error) {
      toast.error(res.error?.data.message);
    }
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.push('/users/user');
  }

  const handleChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setPermission([...permission, value]);
    } else {
      setPermission(permission.filter((item) => item !== value));
    }
  };

  function handelImage(e) {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }


  if (authPermission.includes('user_create')) {
    return (
      <>
        <Form onSubmit={submitHandel} encType="multipart/form-data">
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add User</Card.Title>
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
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number"
                          name="number"
                          onChange={(e) => setNumber(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        className="mb-3"
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        placeholder="Status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                      </Form.Control>
                    </Col>
                  </Row>

                  <Form.Label>Gender</Form.Label>

                  <div className="d-flex pb-3 pl-2">
                    <div>
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
                    <div className=" px-2">
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
                    <div>
                      <Form.Check
                        custom
                        type="radio"
                        label="Other"
                        name="gender"
                        id="supportedRadio4"
                        value="Other"
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <img src={previewImage} className="py-2" width="90px"  alt="" />
                    </div>


                  <Form.Group controlId="exampleForm.ControlInput1">
                    <input
                      type="file"
                      name="image"
                      accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf "
                      onChange={(e) => { setImage(e.target.files[0]); handelImage(e);}}
                    />
                  </Form.Group>
                  {/* <Button variant="primary" type="submit">
                Submit
              </Button> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Assign Role To Permission</Card.Title>
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
                  <Form.Group>
                    <div className="d-flex flex-wrap">
                      {response.isSuccess &&
                        response.data.map((item) => (
                          <div key={item.id} className="p-2 col-6">
                            <Form.Check
                              className="mr-2"
                              custom
                              type="checkbox"
                              label={item.name}
                              name="permission_id"
                              id={item.id}
                              value={item.id}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        ))}
                    </div>
                  </Form.Group>
                  <div className="pt-2">
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
  } else {
    return (
      <div class="alert alert-danger" role="alert">
        Sorry You are not authorized to access this page
      </div>
    );
  }
}

export default UserAdd;
