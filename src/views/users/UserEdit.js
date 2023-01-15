import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { checkObjectInArray } from '../../utils/Helper';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useUpdateUserMutation } from '../../services/userApi';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const UserEdit = (props) => {
  const authPermission = useSelector((state) => state.auth.permissions);
  const history = useHistory();
  const { id } = useParams();

  const [updateUser, res] = useUpdateUserMutation() || {};
  const [mainPermissions, setMainPermissions] = useState([]);
  const [userDefaultPermissions, setUserDefaultPermissions] = useState([]);
  const [permissions, setPermissions] = useState({ allPermissions: [] });
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [number, setNumber] = useState();
  const [gender, setGender] = useState();
  const [status, setStatus] = useState();
  const [image, setImage] = useState();

  //permission list api request
  const permission = (e) => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}permission`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_token')}`
      }
    })
      .then((res) => {
        setMainPermissions(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  //user permission list api request
  const userPermission = (e) => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}users/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_token')}`
      }
    })
      .then((res) => {
        setUserDefaultPermissions(res.data.user_has_permission);
        setName(res.data.name);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setNumber(res.data.number);
        setGender(res.data.gender);
        setStatus(res.data.status);
        setImage(res.data.image);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  // axios api request
  useEffect(() => {
    permission();
    userPermission();
  }, []);

  // data submit
  const submitRole = async (e) => {
    e.preventDefault();
    let selectedPermissions = [];
    permissions.allPermissions.forEach((item, index) => {
      if (item.isChecked) {
        selectedPermissions.push(item.id);
      }
    });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('number', number);
    formData.append('gender', gender);
    formData.append('status', status);
    formData.append('image', image);
    if (selectedPermissions.length > 0) {
      formData.append('permission', JSON.stringify(selectedPermissions));
    }
    try {
      await updateUser({ id: id, data: formData }).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    let permissionsData = { ...permissions };
    mainPermissions.forEach((item, index) => {
      item.isChecked = checkObjectInArray(item, userDefaultPermissions, 'id', 'permission_id');
      permissionsData.allPermissions.push(item);
    });
    setPermissions(permissionsData);
  }, [userDefaultPermissions]);

  const checkPermission = (e, index) => {
    let permissionsData = { ...permissions };
    const checkedStatus = e.target.checked;
    permissionsData.allPermissions[index].isChecked = checkedStatus;
    setPermissions(permissionsData);
  };

  if (res.isSuccess) {
    toast.success(res.data.message);
    history.push('/users/user');
  }

  // {authPermission.includes('user_create') && ()}
  if (authPermission.includes('user_edit')) {
    return (
      <>
        <div>
          <Form onSubmit={submitRole} encType="multipart/form-data">
            <Card>
              <ToastContainer />
              <Card.Header>
                <Card.Title as="h5">Edit User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col md={4}>
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
                      <Col md={4}>
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
                      <Col md={4}>
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
                            value={number}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" className="mb-3" name="status" onChange={(e) => setStatus(e.target.value)}>
                          <option value={status}>{status}</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                        </Form.Control>
                      </Col>

                      <Col md={6}>
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
                      </Col>
                      <Col md={12}>
                         <img className="img-circle mb-1" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} width="90px" alt="" />
                        </Col>
                     
                      <Col md={6}>
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
                    <hr />

                    <h6>Assign Permission</h6>

                    <hr />
                    <Form.Group className="d-flex wrap 2">
                      {loading ? (
                        <Loading />
                      ) : (
                        <div className="d-flex flex-wrap">
                          {permissions?.allPermissions?.map((item, index) => (
                            <div className="p-2 col-6" key={index}>
                              <label>
                                <input
                                  type="checkbox"
                                  value={JSON.stringify(item)}
                                  checked={item.isChecked ? true : false}
                                  onChange={(e) => checkPermission(e, index)}
                                />{' '}
                                {item.name}
                              </label>{' '}
                              <br />
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Group>
                    <div className="pt-2">
                      <button className=" btn btn-primary" type="submit" variant="primary">
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </div>
      </>
    );
  } else {
    return (
      <div class="alert alert-danger" role="alert">
        Sorry You are not authorized to access this page
      </div>
    );
  }
};

export default UserEdit;
