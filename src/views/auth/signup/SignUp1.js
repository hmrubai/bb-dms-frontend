import React from 'react';
import { useState, useContext } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { authApiContext } from '../../../contexts/Api/AuthApi';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import logo from '../../../../src/assets/images/logo.png';
import { toast, ToastContainer } from 'react-toastify';
const SignIn1 = () => {
  const { registration } = useContext(authApiContext);
  const [allData, setData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirm_password: '',
    gender: ''
  });

  const handleChange = (e) => setData({ ...allData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (allData.password !== allData.confirm_password) {
      toast.warning('Password and confirm password does not match');
    } else {
     await registration(allData);
    }

    // after submit allData
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <img src={logo} alt="" />
                  </div>
                  {/* <h3 className="mb-4">Sign up</h3> */}
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        name="name"
                        value={allData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={allData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                        name="number"
                        value={allData.number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={allData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={allData.confirm_password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex pb-3 pl-2">
                      <div className=" pr-5">
                        <Form.Check
                          custom
                          type="radio"
                          label="Male"
                          name="gender"
                          id="supportedRadio3"
                          value="Male"
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                      <label className="custom-control-label" htmlFor="customCheck1">
                        Send me the <Link to="#"> Newsletter</Link> weekly.
                      </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary mb-4">
                      Sign In
                    </button>
                  </form>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/auth/signin" className="f-w-400">
                      Sign Up
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn1;
