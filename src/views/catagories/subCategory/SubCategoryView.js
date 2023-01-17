import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import {  useParams, useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

import { useGetSubCategoryByIdQuery } from '../../../services/subCategoryApi';
import DayJS from 'react-dayjs';
function CategoryView() {
  const { id } = useParams();
  const history = useHistory();
  // const  response  = useGetCatagoryByIdQuery(id);
  const { data, isLoading } = useGetSubCategoryByIdQuery(id);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!data) {
    return <div>No Sub Category :(</div>;
  }

  return (
    <>
      <Card>
        <Card.Header>
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title as="h5">Sub Catagory</Card.Title>
              </div>
              <div>
                <span className="me-auto pointer">
                  <div onClick={() => history.goBack()}>
                    <BsArrowLeftCircleFill color="black" size={'20px'} />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Header>
          <div className="text-center">
            <Card.Title as="h5">Sub Category Information</Card.Title>
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
                Sub Category Name:
                <span class="font-weight-bold text-primary ">{data.name}</span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
              <p>
                Category Name:
                <span class="font-weight-bold text-primary ">{data.catagory.name}</span>
              </p>
              <p>
                Created By:
                <span class="font-weight-bold text-primary ">{data.user.name} </span>
              </p>

              <p>
                Status:
                <span class="font-weight-bold text-primary">{data.status}</span>
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
              <p>
                Description:
                <span class="font-weight-bold text-primary">{data.description}</span>
              </p>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CategoryView;
