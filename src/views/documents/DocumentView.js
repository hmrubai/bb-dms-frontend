import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

function DocumentView() {
  const doc = useSelector((state) => state.document.documentView);
  const download = (e) => {
    console.log(e);
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download/${doc.id}`,
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${doc.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
       toast.error("Something went wrong");
      });
  };

  return (
    <>
      <Card>
        <ToastContainer />
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
                      <Button  className="label theme-bg2 text-white f-12" onClick={(e) => download(e)}>
                        <BsFillArrowDownCircleFill color="blue" size={18} className="m-1" />
                        Download
                      </Button>
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
