import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import avatar1 from '../../../src/assets/images/user/avatar-1.jpg';
import DayJS from 'react-dayjs';
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
                Username:
                <span class="font-weight-bold text-primary ">{users.username} </span>
              </p>

              <p>
                Number:
                <span class="font-weight-bold text-primary">{users.number}</span>
              </p>
              <p>
                Gender:
                <span class="font-weight-bold text-primary">{users.gender} </span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Created at :
                <span class="font-weight-bold text-primary">
                  Time: <DayJS format="h:mm A">{users.created_at}</DayJS>
                  || Date: <DayJS format="YYYY-MM-DD">{users.created_at}</DayJS>
                </span>
              </p>
              <p>
                Created at :
                <span class="font-weight-bold text-primary">
                  Time: <DayJS format="h:mm A ">{users.updated_at}</DayJS>
                  || Date: <DayJS format="YYYY-MM-DD">{users.updated_at}</DayJS>
                </span>
              </p>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default Profile;
