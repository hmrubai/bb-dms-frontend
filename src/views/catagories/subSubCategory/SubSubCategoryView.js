import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';


import { useGetSubSubCategoryByIdQuery } from '../../../services/subSubCategoryApi';
function SubSubCategoryView() {
  const { id } = useParams();

  // const  response  = useGetCatagoryByIdQuery(id);
  const { data, isFetching, isLoading, isError, isSuccess } = useGetSubSubCategoryByIdQuery(id);

  

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
          <Card.Title as="h5">Sub Category</Card.Title>
          <span className="me-auto">
            <Link to={`/catagories/sub_category`}>
              <BsArrowLeftCircleFill color="black" size={'20px'} />
            </Link>
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <div className=" pb-2">
              <img className="img-circle border" src={`${process.env.REACT_APP_IMAGE_URL}${data.image}`} width="200px" alt="" />
            </div>
            <div>
              <div>
                <h5>
                  <span>Sub Category Name :</span> <span>{data.name}</span>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>User Name:</span> <span>{data.user.name}</span>
                </h5>
              </div>
              <div>
                <h5>
                  <span>Category Name:</span> <span>{data.catagory.name}</span>
                </h5>
              </div>
              <div>
                <h5>
                  <span>Sub Category Name:</span> <span>{data.sub_catagory.name}</span>
                </h5>
              </div>
              <div>
                <h5>
                  <span>Description:</span> <span>{data.description}</span>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>Status:</span> <span>{data.status}</span>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>Created At:</span> <span>{data.created_at}</span>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>updated At:</span> <span>{data.updated_at}</span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </>
  );
}

export default SubSubCategoryView;
