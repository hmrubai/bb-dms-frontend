import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from './../../store/index';

function DocumentView() {
  const { id } = useParams();

  const doc = useSelector((state) => state.document.documentView);

  return (
    <>
      <Card>
        <Card.Header>
          <div>
            <Card.Title as="h5">Documnet </Card.Title>
            <span className="me-auto">
              <Link to={`documents/document`}>
                <BsArrowLeftCircleFill color="black" size={'20px'} />
              </Link>
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Row>
                <Col md={3}>
                  <Card>
                    <div>
                      <a download href={`${process.env.REACT_APP_IMAGE_URL}${doc.file}`}>
                        <Button>
                          {' '}
                          <BsFillArrowDownCircleFill color="black" size={18} className="m-1" />
                          Download
                        </Button>
                      </a>
                    </div>
                    <div className=" mx-1 ">
                      <div>
                        <hr />
                        <h5>
                          {' '}
                          <BsFillInfoCircleFill /> DOCUMENT INFORMATION
                        </h5>
                        <hr />
                      </div>
                      <div className=" py-2">
                        <b>Document Name:</b> {doc.name}
                      </div>
                      <div className=" py-2">
                        <b>Category Name:</b> <br /> {doc.catagory?.name}
                      </div>
                      <div className=" py-2">
                        <b>Description:</b> <br /> {doc.description}
                      </div>
                      <div className=" py-2">
                        <b>Status:</b> <br /> {doc.status}
                      </div>
                      <div className=" py-2">
                        <b>Created By:</b> <br /> {doc.user?.name}
                      </div>
                      <div className=" py-2">
                        <b>Created at :</b> <br /> {doc.created_at}
                        
                      
                      </div>
                      <div className=" py-2">
                        <b>Last Updated :</b> <br /> {doc.updated_at}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={9}>
                  <Card width="1000px" height="600px">
                    <div>
                      <embed width="100%" height="600px" alt={doc.name} src={`${process.env.REACT_APP_IMAGE_URL}${doc?.file}`} />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default DocumentView;
