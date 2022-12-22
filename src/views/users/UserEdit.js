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

const UserEdit = (props) => {
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}permission`)
      .then((res) => {
        setMainPermissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Permission Null');
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}users/${id}`)
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
      .catch((err) => {
        console.log('User Permission Null');
      });
  }, []);

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
                  <hr />
                  <h6>Assign Permission</h6>
                  <hr />
                  <Form.Group className="d-flex wrap 2">
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="d-flex flex-wrap">
                        {permissions?.allPermissions?.map((item, index) => (
                          <div className="p-2 col-6">
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
};

export default UserEdit;
