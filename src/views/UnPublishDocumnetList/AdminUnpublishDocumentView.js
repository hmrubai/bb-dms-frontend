import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Card, Row, Col, Button } from 'react-bootstrap';
import {
  BsArrowLeftCircleFill,
  BsFillArrowDownCircleFill,
  BsFillInfoCircleFill,
  BsReplyAllFill,
  BsFillCheckCircleFill,
  BsXCircleFill
} from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDocumentpublishMutation } from '../../services/documentApi';
import { useUnpublishDocumentQuery } from '../../services/publishApi';
import Loading from '../../components/Loading/Loading';

function AdminUnpublishDocumentView() {
  const { id } = useParams();

  const [documentpublish, { data: no }] = useDocumentpublishMutation();
  const { data, isLoading, isSuccess, isError } = useUnpublishDocumentQuery(id);

  const download = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download/${data.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
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
  const DocumentPublish = async (Pid) => {
    Swal.fire({
      title: 'You want to Publish this Document?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Publish it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        documentpublish(Pid);
        Swal.fire('Publish!', 'Your file has been Publish.', 'success');
      }
    });
  };

  return (
    <>
      <Card>
        <ToastContainer />
        <Card.Header>
          <div>
            <Card.Title as="h5">Documnet </Card.Title>
            {/* <span className="me-auto">
              <Link to={`/documents/document`}>
                <BsArrowLeftCircleFill color="black" size={'20px'} />
              </Link>
            </span> */}
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
                          <Button className="label theme-bg text-white f-12" onClick={(e) => download(e)}>
                            <BsFillArrowDownCircleFill color="blue" size={18} className="m-1" />
                            Download
                          </Button>
                        </div>

                        {data.admin === 'Pending' && (
                          // <  className="pointer mx-1 border " color="green" size={22} onClick={() => />
                          <div>
                            <Button className="label theme-bg2 text-white f-12" onClick={(e) => DocumentPublish(data.id)}>
                              <BsReplyAllFill color="blue" size={18} className="m-1" />
                              Publish
                            </Button>
                          </div>
                        )}
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
                            <b>{data.name}</b>{' '}
                          </p>
                        </div>
                        {/* <div className=" py-2">
                          <b>Category Name:</b> <br />  <p className='text-primary '><b> {data.catagory?.name}</b> </p>  
                        </div> */}

                        {data.admin_status === 'Active' && (
                          <div className=" py-2">
                            <b>Publish By:</b> <br />
                            <p className="text-primary ">
                              <b> Super Admin </b>{' '}
                            </p>
                          </div>
                        )}

                        {data.admin_status === 'Pending' && (
                          <div className=" py-2">
                            <b>Admin Status:</b> <br />
                            <p className="text-primary ">
                              <BsXCircleFill color="red" /> <b> {data.admin_status} </b>
                            </p>
                          </div>
                        )}

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
                        <embed width="100%" height="600px" alt={data.name} src={`${process.env.REACT_APP_IMAGE_URL}${data?.file}`} />
                      </div>
                      <Card.Header>
                        <Card.Title as="h5">Description</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <p className=" ">
                        { data.description=== 'undefined' ? "No Description" : <b>{data.description }</b>}
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

export default AdminUnpublishDocumentView;
