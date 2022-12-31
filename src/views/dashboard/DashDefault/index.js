import React, { useState } from 'react';
import { Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAllCategoryQuery } from '../../../services/catagoryApi';
import { useGetAllDocumentQuery } from '../../../services/documentApi';
import { useGetAllUserQuery, useTotalUserQuery } from '../../../services/userApi';
import {
  BsFillArrowUpCircleFill,
  BsFillFileEarmarkMedicalFill,
  BsXCircleFill,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsFillArrowDownCircleFill,
  BsPencilSquare,
  BsFillTrashFill
} from 'react-icons/bs';
import DayJS from 'react-dayjs';
import { useSelector } from './../../../store/index';
import axios from 'axios';
import Cookies from 'js-cookie';
import fileDownload from 'js-file-download';
import { useAllPublishDocumentQuery } from '../../../services/publishApi';
import file from './../../../assets/images/File/word.png';
import Loading from '../../../components/Loading/Loading';
import Spinner from '../../../components/Loader/Spinner';
const DashDefault = () => {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useAllCategoryQuery();
  const { data: doc, isSuccess: docIsSuccess } = useGetAllDocumentQuery();
  const { data: user, isSuccess: userSucess } = useTotalUserQuery();
  const { data: allDoc, isSuccess: docSuccess, isLoading } = useAllPublishDocumentQuery();
  const { data: recentUser } = useGetAllUserQuery(page);
  const authPermission = useSelector((state) => state.auth.permissions);

  // download file

  const download = (e, item) => {
    console.log(item);
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
              <h6 className="mb-4">Total Documnets</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-layout text-c-green f-30 m-r-5" /> {docSuccess && allDoc.length}
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
              <h6 className="mb-4">Total Category</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-align-justify text-c-green f-30 m-r-5" />
                    {/* {isSuccess ? data.length : 0} */}0
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

        {/* <Col md={6} xl={8}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Document Approval list</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  {recentUser &&
                    recentUser?.data.map((item ,i) => (
                      <tr className="unread" key={i}>
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: '40px' }}
                            src={`${process.env.REACT_APP_IMAGE_URL}${item.image}`}
                            alt="activity-user"
                          />
                        </td>
                        <td>
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="m-0">{item.email}</p>
                        </td>
                        <td>
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            Time: <DayJS format="h:mm A">{item?.created_at}</DayJS> || Date:{' '}
                            <DayJS format="YYYY-MM-DD">{item?.created_at}</DayJS>
                          </h6>
                        </td>
                        <td>
                       
                          <Link to={`/users/user_view/${item.id}`} className="label theme-bg2 text-white f-12">
                            View
                          </Link>
                          {authPermission.includes('user_edit') && (
                            <Link to={`/users/user_edit/${item.id}`} className="label theme-bg text-white f-12">
                              Edit
                            </Link>
                          )}
                        </td>
           
                      </tr>
                    ))}

                  <Pagination className=" justify-content-end mt-4  mr-5">
                    <Pagination.Prev onClick={() => setPage(page - 1)} />
                    <Pagination.Next onClick={() => setPage(page + 1)} />
                  </Pagination>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}
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
              <h6 classNameName="text-muted mt-3 mb-0 ">You can Uploade Your Document </h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* document */}
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Published Document</Card.Title>
            </Card.Header>
            {isLoading && (
              <div className="text-center">
                <Loading animation="border" variant="primary" />
              </div>
            )}
            {docSuccess && (
              <div className="d-flex flex-wrap ">
                {allDoc?.map((item) => (
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
                        {item.file.split('.').pop().includes('pdf') ||
                        item.file.split('.').pop().includes('png') ||
                        item.file.split('.').pop().includes('jpg') ||
                        item.file.split('.').pop().includes('jpeg') ||
                        item.file.split('.').pop().includes('txt') ? (
                          <Link to={`/documents/unpublish_document_view/${item.id}`}>
                            <BsFillEyeFill color="black" size={20} />
                          </Link>
                        ) : (
                          <span className="pointer">
                            <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                          </span>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
