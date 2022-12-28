import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import avatar1 from '../../../src/assets/images/user/avatar-1.jpg';
function Profile() {
  const users = useSelector((state) => state.auth.user);

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <div class="col-md-4 col-12 py-3">
              <img
                class="img-fluid rounded-circle "
                style={{ width: '200px', height: '200px' }}

                src={users.image ? `${process.env.REACT_APP_IMAGE_URL}${users.image}` : avatar1}
            
               

                alt=""
              />
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Name:
                <span class="font-weight-bold text-primary ">{users.name}</span>
              </p>
              <p>
                Email:
                <span class="font-weight-bold text-primary ">{users.email} </span>
              </p>

              <p>
                Permanent Address:
                <span class="font-weight-bold text-primary"></span>
              </p>
              <p>
                Residence Address:
                <span class="font-weight-bold text-primary"> </span>
              </p>

              <p>
                Section
                <span class="font-weight-bold text-primary"></span>
              </p>

              <p>
                Class:
                <span class="font-weight-bold text-primary"> </span>
              </p>
              <p>
                Roll:
                <span class="font-weight-bold text-primary"></span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Father Name:
                <span class="font-weight-bold text-primary"></span>
              </p>
              <p>
                Mother Name:
                <span class="font-weight-bold text-primary"> </span>
              </p>

              <p>
                Father Profession:
                <span class="font-weight-bold text-primary"></span>
              </p>
              <p>
                Mother Profession:
                <span class="font-weight-bold text-primary"></span>
              </p>

              <p>
                Father Phone No:
                <span class="font-weight-bold text-primary"></span>
              </p>

              <p>
                Father Phone No:
                <span class="font-weight-bold text-primary"></span>
              </p>
              <p> Emergency No:</p>
              <span class="font-weight-bold text-primary"></span>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Profile;
