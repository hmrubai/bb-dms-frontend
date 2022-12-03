import { Dayjs } from 'dayjs';
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { useGetCatagoryByIdQuery } from '../../../services/catagoryApi';
import DayJS from 'react-dayjs';

function CatagoryView() {
  const { id } = useParams();

  // const  response  = useGetCatagoryByIdQuery(id);
  const { data, isFetching, isLoading, isError, isSuccess } = useGetCatagoryByIdQuery(id);

  console.log(data);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!data) {
    return <div>No catagory :(</div>;
  }

  return (
    <Card>
      <Card.Header>
        <div>
          <Card.Title as="h5">Catagory</Card.Title>
          <span className="me-auto">
            <Link to={`/catagories/catagory`}>
              <BsArrowLeftCircleFill color="black" size={'20px'} />
            </Link>
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <div><h4>CATEGORY INFORMATION</h4>
              <hr />
            </div>
            <div className=" pb-2">
              <img className="img-circle border" src={`${process.env.REACT_APP_IMAGE_URL}${data.image}`} width="200px" alt="" />
            </div>
            <div>
              <div>
                <h5>
                  <span>Catagory Name :</span> <span>{data.name}</span>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>Created By:</span> <span>{data.user.name}</span>
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
                  
           
                  <span>Created At:</span> 
                  Time: <DayJS format="h:mm A">{data.created_at}</DayJS> ||
              
                  Date: <DayJS format="YYYY-MM-DD">{data.created_at}</DayJS>
                </h5>
              </div>
            </div>
            <div>
              <div>
                <h5>
                  <span>updated At:</span> 
                  Time: <DayJS format="h:mm A">{data.updated_at}</DayJS> ||
              
                  Date: <DayJS format="YYYY-MM-DD">{data.updated_at}</DayJS>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CatagoryView;
