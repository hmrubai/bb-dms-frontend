import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Card, Row, Col, } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillInfoCircleFill } from 'react-icons/bs';
import {  useHistory, useParams } from 'react-router-dom';
import DayJS from 'react-dayjs';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Loading from './../../components/Loading/Loading';
import { useGroupSingalDocumnetQuery } from '../../services/groupApi';
import downloade from '../../assets/images/File/download.png';
function GroupDocumentView() {
  let history = useHistory();
  const { id } = useParams();
  

  const { data, isLoading, isSuccess } = useGroupSingalDocumnetQuery(id);

  const download = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download_file/${data.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_token')}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${data.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  return (
    <>
      <Card>
        <ToastContainer />
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title as="h5">Documnet </Card.Title>
            </div>
            <div>
              <span className="me-auto pointer">
                <div onClick={()=>history.goBack()}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>
        {isLoading && <Loading />}

        {isSuccess && (
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col md={3}>
                    <Card>
                      <div className="d-flex">
                        <div>
                          <img onClick={(e) => download(e)} className="btn" width={85} src={downloade} alt="" />
                        </div>
                      </div>
                      <div className=" mx-1 ">
                        <div>
                          <hr />
                          <h5>
                            {' '}
                            <BsFillInfoCircleFill />
                            INFORMATION
                          </h5>
                          <hr />
                        </div>
                        <div className=" py-2">
                          <b>Document Name:</b> <br />
                          <p className="text-primary ">
                            <b>{data.name}</b>{' '}
                          </p>
                        </div>
                        <div className=" py-2">
                          <b>Group Name:</b> <br />{' '}
                          <p className="text-primary ">
                            <b> {data.group?.name}</b>{' '}
                          </p>
                        </div>

                        <div className=" py-2">
                          <b>Created By:</b> <br />
                          <p className="text-primary ">
                            <b> {data.user?.name} </b>{' '}
                          </p>
                        </div>
                        <div className=" py-2">
                          <b>Created at :</b> <br />
                          Time: <DayJS format="h:mm A">{data.created_at}</DayJS>
                          <br />
                          Date: <DayJS format="YYYY-MM-DD">{data.created_at}</DayJS>
                        </div>
                        <div className=" py-2">
                          <b>Last Updated :</b> <br />
                          Time: <DayJS format="h:mm A ">{data.updated_at}</DayJS>
                          <br />
                          Date: <DayJS format="YYYY-MM-DD">{data.updated_at}</DayJS>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md={9}>
                    <Card width="1000px" height="600px">
                      <div>
                        {data.file.split('.').pop().includes('docx') ||
                        data.file.split('.').pop().includes('xls') ||
                        data.file.split('.').pop().includes('xlsx') ||
                        data.file.split('.').pop().includes('csv') ? (
                          <div class="alert alert-warning" role="alert">
                            Pleass Download this Document !!
                          </div>
                        ) : (
                          <embed width="100%" height="600px" alt={data.name} src={`${process.env.REACT_APP_File_URL}${data?.file}`} />
                        )}
                      </div>
                      <Card.Header>
                        <Card.Title as="h5">Description</Card.Title>
                      </Card.Header>
                      <Card.Body className="p-0">
                      <p className="  ">
                        {data.description === 'undefined' ? 'No Description' : <div dangerouslySetInnerHTML={{ __html: data.description }} />}
                      </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default GroupDocumentView;
