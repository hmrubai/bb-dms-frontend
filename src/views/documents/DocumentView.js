import React from 'react';

// import {saveAs} from 'file-saver';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
function DocumentView() {
  const doc = useSelector((state) => state.document.documentView);
  // const file = process.env.REACT_APP_IMAGE_URL + doc.file

  


  return (
    <>
      <Card>
        <Card.Header>
          <div>
            <Card.Title as="h5">Documnet </Card.Title>
            <span className="me-auto">
              <Link to={`/documents/document`}>
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
                      {/* <a href={file} download>
                        <Button>
                          <BsFillArrowDownCircleFill color="black" size={18} className="m-1" />
                          Download
                        </Button>
                      </a> */}
                     
                   

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
                        <b>Document Name:</b> <br />
                        <p className="text-primary ">
                          <b>{doc.name}</b>{' '}
                        </p>
                      </div>
                      {/* <div className=" py-2">
                        <b>Category Name:</b> <br />  <p className='text-primary '><b> {doc.catagory?.name}</b> </p>  
                      </div> */}
                      <div className=" py-2">
                        <b>Description:</b> <br />{' '}
                        <p className="text-primary ">
                          <b> {doc.description}</b>{' '}
                        </p>
                      </div>
                      <div className=" py-2">
                        <b>Status:</b> <br />{' '}
                        <b className={doc.status === 'Active' ? 'bg-success text-dark p-1 rounded' : 'bg-danger text-dark p-1 rounded'}>
                          {doc.status}
                        </b>
                      </div>
                      <div className=" py-2">
                        <b>Created By:</b> <br />
                        <p className="text-primary ">
                          <b> {doc.user?.name} </b>{' '}
                        </p>
                      </div>
                      <div className=" py-2">
                        <b>Created at :</b> <br />
                        Time: <DayJS format="h:mm A">{doc.created_at}</DayJS>
                        <br />
                        Date: <DayJS format="YYYY-MM-DD">{doc.created_at}</DayJS>
                      </div>
                      <div className=" py-2">
                        <b>Last Updated :</b> <br />
                        Time: <DayJS format="h:mm A ">{doc.updated_at}</DayJS>
                        <br />
                        Date: <DayJS format="YYYY-MM-DD">{doc.updated_at}</DayJS>
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
