import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { BsXCircleFill, BsFillCheckCircleFill, BsFillEyeFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

// import { useSelector } from './../../../store/index';
import axios from 'axios';
import Cookies from 'js-cookie';
import fileDownload from 'js-file-download';

import file from './../../assets/images/File/word.png';

import { useState } from 'react';
import Loading from './../../components/Loading/Loading';
import { useAllPublishDocumentQuery } from '../../services/publishApi';
function AllPublishDocumentList() {
  const [search, setSearch] = useState('');
  const { data: allDoc, isSuccess: docSuccess, isLoading } = useAllPublishDocumentQuery({ search: search });

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
      <div>
        <Row>
          <Col>
            <Card>
              <Card.Header className="">
                <div className=" d-flex justify-content-between ">
                  <div>
                    <Card.Title as="h5">Published Document</Card.Title>
                  </div>
                  <div>
                    <input
                      type="search"
                      className="form-control "
                      name="search"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                      id=""
                    />
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
                  {allDoc?.map((item) => (
                    <div className="mx-1 sm-col-12" key={item.id}>
                      <Card style={{ width: '15rem', height: '15rem' }}>
                        {item.file.split('.').pop().includes('png') ||
                        item.file.split('.').pop().includes('jpg') ||
                        item.file.split('.').pop().includes('jpeg') ||
                        item.file.split('.').pop().includes('gif') ? (
                          <Card.Img className="h-50" variant="top" src={`${process.env.REACT_APP_File_URL}${item.file}`} />
                        ) : (
                          <div className="box border border-bottom-0 pb-4 bg-info">
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
                            <b>{item.name.slice(0, 15)}</b>
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
                            <div>
                              <Link to={`/documents/unpublish_document_view/${item.id}`}>
                                <BsFillEyeFill color="blue" size={22} />
                              </Link>
                              <span className="pointer m-2">
                                <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="pointer m-2">
                                <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                              </span>
                              <span>
                                <Link to={`/documents/unpublish_document_view/${item.id}`}>
                                  <BsFillEyeFill color="blue" size={22} />
                                </Link>
                              </span>
                            </div>
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
      </div>
    </React.Fragment>
  );
}

export default AllPublishDocumentList;
