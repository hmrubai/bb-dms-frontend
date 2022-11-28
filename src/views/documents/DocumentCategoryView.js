import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useShowCategoryDocumentQuery } from '../../services/documentApi';
import { useDispatch } from 'react-redux';
import { documentView } from '../../features/documentSlice';

function DocumentCategoryView() {
  const { id } = useParams();
  const dispatch=useDispatch();
  const { data, isFetching, isLoading, isError, isSuccess } = useShowCategoryDocumentQuery(id);

  return (
    <>
      <Card>
        <Card.Header>
          <div>
            <Card.Title as="h5">Document</Card.Title>
            <span className="me-auto">
              <Link to={`/documents/document`}>
                <BsArrowLeftCircleFill color="black" size={'20px'} />
              </Link>
            </span>
          </div>
        </Card.Header>
        <div>{isLoading && <Loading />}</div>
        <div>{isError && <div>No Document:</div>}</div>
        <Card.Body>
          <Row>
            {data?.map((item) => (
              <Col key={item.id} className="d-flex align-items-center justify content center">
                <Link to={`/documents/document_view/${item.id}`} >
                <Card className="pointer" style={{ width: '12rem' }} onClick={()=>dispatch(documentView(item))}>
                  {item.file.split('.').pop() !== 'jpg' ? (
                    <div className="box">{item.file.split('.').pop()}</div>
                  ) : (
                    <Card.Img variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${item.file}`} />
                  )}

                  <Card.Body className="py-2 px-2">
                    <Card.Title>{item.name}</Card.Title>

                    <Card.Text>Author by: {item.user.name}</Card.Text>
                  </Card.Body>
                  </Card>
                  
                  </Link>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default DocumentCategoryView;
