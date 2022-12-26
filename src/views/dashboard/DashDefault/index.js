import React, { useState } from 'react';
import { Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAllCategoryQuery } from '../../../services/catagoryApi';
import { useGetAllDocumentQuery } from '../../../services/documentApi';
import { useGetAllUserQuery, useTotalUserQuery } from '../../../services/userApi';
import { BsFillArrowUpCircleFill, BsFillFileEarmarkMedicalFill } from 'react-icons/bs';
import DayJS from 'react-dayjs';
import { useSelector } from './../../../store/index';

const DashDefault = () => {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useAllCategoryQuery();
  const { data: doc, isSuccess: docIsSuccess } = useGetAllDocumentQuery();
  const { data: user, isSuccess: userSucess } = useTotalUserQuery();
  const { data: recentUser } = useGetAllUserQuery(page);
  const authPermission = useSelector((state) => state.auth.permissions);
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
                    <i className="feather icon-layout text-c-green f-30 m-r-5" /> {docIsSuccess && doc.length}
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
                    <i className="feather icon-align-justify text-c-green f-30 m-r-5" /> {isSuccess ? data.length : 0}
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

        <Col xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Tolat Users</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-user text-c-green f-30 m-r-5" />
                    {userSucess ? user.length : 0}
                  </h3>
                </div>

                <div className="col-3 text-right">{/* <p className="m-b-0">100%</p> */}</div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  {recentUser &&
                    recentUser?.data.map((item) => (
                      <tr className="unread">
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
              <h2 className="mt-2 f-w-300">
                <div>
                  <Link to={`/documents/document_add`} className="btn btn-primary btn-sm btn-round has-ripple">
                    <span>UPLOADE</span>
                    <BsFillArrowUpCircleFill className="mx-2 mb-1" size={15} />
                  </Link>
                </div>
              </h2>
              <h6 className="text-muted mt-3 mb-0 ">You can Uploade Your Document </h6>
              <div className="text-right">
                {' '}
                <BsFillFileEarmarkMedicalFill size={25} className="" />
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">235</h3>
                  <span className="d-block text-uppercase">total ideas</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">26</h3>
                  <span className="d-block text-uppercase">total locations</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
