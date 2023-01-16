import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

import { useGetUserByIdQuery } from '../../services/userApi';
import DayJS from 'react-dayjs';
function CategoryView() {
  const { id } = useParams();
  const history = useHistory();
  const { data, isLoading } = useGetUserByIdQuery(id);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!data) {
    return <div>No User List:( </div>;
  }

  return (
    <>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title as="h5">User</Card.Title>
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
        <Card.Header>
          <div className="text-center">
            <Card.Title as="h5">User Information</Card.Title>
          </div>
        </Card.Header>

        <Card.Body>
          <Row>
            <div class="col-md-4 col-12 py-3 text-center">
              <img
                class="img-fluid rounded-circle "
                style={{ width: '200px', height: '200px' }}
                src={`${process.env.REACT_APP_IMAGE_URL}${data.image}`}
                alt=""
              />
              <p className="pt-3">
                Name:
                <span class="font-weight-bold text-primary ">{data.name}</span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Username:
                <span class="font-weight-bold text-primary ">{data.username}</span>
              </p>

              <p>
                Email:
                <span class="font-weight-bold text-primary ">{data.email} </span>
              </p>

              <p>
                Number:
                <span class="font-weight-bold text-primary ">{data.number} </span>
              </p>

              <p>
                Status:
                <span class="font-weight-bold text-primary">{data.status}</span>
              </p>
              <p>
                Status:
                <span class="font-weight-bold text-primary">{data.gender}</span>
              </p>
              <p>
                Created At:
                <span class="font-weight-bold text-primary">
                  {' '}
                  Time: <DayJS format="h:mm A">{data.created_at}</DayJS> || Date: <DayJS format="YYYY-MM-DD">{data.created_at}</DayJS>
                </span>
              </p>

              <p>
                updated At:
                <span class="font-weight-bold text-primary">
                  {' '}
                  Time: <DayJS format="h:mm A">{data.updated_at}</DayJS> || Date: <DayJS format="YYYY-MM-DD">{data.updated_at}</DayJS>{' '}
                </span>
              </p>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CategoryView;
