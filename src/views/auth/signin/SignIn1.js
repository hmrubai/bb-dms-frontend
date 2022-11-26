import React from 'react';
import { useState, useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { authApiContext } from '../../../contexts/Api/AuthApi';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import logo from '../../../../src/assets/images/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import { useLoginMutation } from '../../../services/authApi';
import Loading from './../../../components/Loading/Loading';
import { useDispatch } from '../../../store';
import { loginUser, selectUser } from '../../../features/authSlice';
import { useSelector } from './../../../store/index';

const SignUp1 = () => {
  const [login, res] = useLoginMutation();
  const dispatch = useDispatch();
  // const { login } = useContext(authApiContext);
  const [allData, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => setData({ ...allData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(allData);
    setData({
      email: '',
      password: ''
    });
  };
  if (res.isSuccess) {
    toast.success(res.data[0].message);
    dispatch(loginUser(res.data[0]));
    window.location.replace('http://localhost:3000/dashboard');
  }
  if (res.isError) {
   toast.error(res.error.data.message);
  }

  return (
    <React.Fragment>
      <Breadcrumb />
      {res.isLoading && (
        <div>
          <Loading />
        </div>
      )}
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
                  {/* <h3 className="mb-4">Login</h3> */}
                  <form onSubmit={handleSubmit}>
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

                    <div className="input-group mb-4">
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
                  <p className="mb-2 text-muted">
                    Forgot password?{' '}
                    <NavLink to="/auth/reset-password-1" className="f-w-400">
                      Reset
                    </NavLink>
                  </p>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/signup" className="f-w-400">
                      Signup
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

export default SignUp1;
