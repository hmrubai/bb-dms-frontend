import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  BsFillArrowUpCircleFill,
  BsFillFileEarmarkMedicalFill,
  BsXCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs';

// import { useSelector } from './../../../store/index';
import axios from 'axios';
import Cookies from 'js-cookie';
import fileDownload from 'js-file-download';
import { useAllPublishDocumentQuery, useDashboardPublishDocumentQuery, useYourDocumentQuery } from '../../../services/publishApi';
import file from './../../../assets/images/File/word.png';
import Loading from '../../../components/Loading/Loading';
import { useState } from 'react';

const DashDefault = () => {
  // const [page, setPage] = useState(1);

  // const { data: doc,   } = useGetAllDocumentQuery();
  // const { data: user, } = useTotalUserQuery();
  const [search, setSearch] = useState('');

  const { data: allDoc, isSuccess: docSuccess, isLoading } = useDashboardPublishDocumentQuery();
  const { data: puballDoc } = useAllPublishDocumentQuery({ search: search });
  const { data: yourDoc } = useYourDocumentQuery();

  // const { data: recentUser } = useGetAllUserQuery(page);
  // const authPermission = useSelector((state) => state.auth.permissions);

  // download file

  const download = (e, item) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download/${item.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${item.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
        console.log('sumthing went wrong');
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12} xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Total Published Documnets</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-share-2 text-c-green f-30 m-r-5" /> {puballDoc && puballDoc.length}
                  </h3>
                </div>

                <div className="col-3 text-right">{/* <p className="m-b-0">50%</p> */}</div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Your Documents</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-layout  text-c-green f-30 m-r-5" />
                    {yourDoc && yourDoc.length}
                  </h3>
                </div>

                <div className="col-3 text-right">{/* <p className="m-b-0">100%</p> */}</div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">UPLOADE DOCUMENT</h5>
                </div>

                <div className="col-auto"></div>
              </div>
              <h2 className=" f-w-300">
                <div className="d-flex  justify-content-between">
                  <div>
                    <Link to={`/documents/document_add`} className="btn btn-primary btn-sm btn-round has-ripple">
                      <span>UPLOADE</span>
                      <BsFillArrowUpCircleFill className="mx-2 mb-1" size={15} />
                    </Link>
                  </div>
                  <div className="text-right">
                    {' '}
                    <BsFillFileEarmarkMedicalFill size={25} className="" />
                  </div>
                </div>
              </h2>
              <h6 className="text-muted mt-3 mb-0 ">You can Uploade Your Document </h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* document */}
        <Col>
          <Card>
            <Card.Header className="">
              <div className=" d-flex justify-content-between ">
                <div>
                  <Card.Title as="h5">Published Document</Card.Title>
                </div>
              </div>
            </Card.Header>

            {isLoading && (
              <div className="text-center">
                <Loading animation="border" variant="primary" />
              </div>
            )}
            {docSuccess && (
              <div className="d-flex flex-wrap ">
                {allDoc?.data.map((item) => (
                  <div className="mx-1 " key={item.id}>
                    <Card style={{ width: '15rem', height: '15rem' }}>
                      {item.file.split('.').pop().includes('png') ||
                      item.file.split('.').pop().includes('jpg') ||
                      item.file.split('.').pop().includes('jpeg') ||
                      item.file.split('.').pop().includes('gif') ? (
                        <Card.Img className="h-50" variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${item.file}`} />
                      ) : (
                        <div className="box border border-bottom-0 pb-4">
                          <img className="" width="100px" src={file} alt={file} />
                          <h3 className="bg-light file-sty  text-center rounded text-uppercase">{item.file.split('.').pop()}</h3>
                        </div>
                      )}

                      <Card.Body className="py-2 px-2 py-3 mb-4">
                        <div className=" d-flex justify-content-evenly">
                          <div className="mb-1 ">
                            {item.status === 'Pending' ? (
                              <span>
                                <BsXCircleFill className="mx-1" color="red" />
                                {item.status}
                              </span>
                            ) : (
                              <span>
                                <BsFillCheckCircleFill className=" mx-1" color="green" />
                                by Super Admin
                              </span>
                            )}
                          </div>
                          <div></div>
                        </div>

                        <Card.Title className="m-0 p-0 h6">
                          <b>{item.name.split(' ')[0]}</b>
                        </Card.Title>
                        <Card.Text className="m-0 p-0" style={{ fontSize: '11px' }}>
                          Created by: {item.user.name}
                        </Card.Text>
                      </Card.Body>

                      <div className=" text-center p-2 shadow my-3 mt-4">
                        <div>
                          <Link to={`/documents/unpublish_document_view/${item.id}`}>
                            <BsFillEyeFill color="blue" size={22} />
                          </Link>
                          <span className="pointer m-2">
                            <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            <div className="text-right">
              <Link to={`documents/All_document_list`}>
                <Button>
                  {' '}
                  See More <BsFillArrowRightCircleFill color="black" />
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
