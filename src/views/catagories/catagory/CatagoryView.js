import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { useGetCatagoryByIdQuery } from '../../../services/catagoryApi';
import DayJS from 'react-dayjs';

function CatagoryView() {
  const { id } = useParams();

  const { data,isLoading } = useGetCatagoryByIdQuery(id);



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
    <>
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
      <Card.Header>
        <div className='text-center'>
          <Card.Title as="h5">Category Information</Card.Title>
       
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
                 <p className='pt-3'>
                Category Name:
                <span class="font-weight-bold text-primary ">{data.name}</span>
              </p>
            </div>
            <div class="col-md-4 col-12 py-3">
           
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
                <span class="font-weight-bold text-primary">    Time: <DayJS format="h:mm A">{data.created_at}</DayJS> ||
              
              Date: <DayJS format="YYYY-MM-DD">{data.created_at}</DayJS></span>
              </p>

              <p>
              updated At:
                <span class="font-weight-bold text-primary">   Time: <DayJS format="h:mm A">{data.updated_at}</DayJS> ||
              
              Date: <DayJS format="YYYY-MM-DD">{data.updated_at}</DayJS> </span>
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

export default CatagoryView;
