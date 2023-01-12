import React, { useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import {
  BsArrowLeftCircleFill,
  BsFillCheckCircleFill,
  BsFillInfoCircleFill,
  BsXCircleFill
} from 'react-icons/bs';


import {  useHistory } from 'react-router-dom';
import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDocumentpublishMutation } from '../../services/documentApi';
import downloade from '../../assets/images/File/download.png';
import shareDoc from '../../assets/images/File/shire.png';
import cloud from '../../assets/images/File/cloud.png';
import shere_ic from '../../assets/images/File/shere_ic.png';

import Modal from 'react-bootstrap/Modal';
import { useShareDocumentMutation, useUserWiseGroupViewQuery } from '../../services/groupApi';

function DocumentView() {
  const history=useHistory();
  const [shareDocument,] = useShareDocumentMutation();
  const [documentpublish] = useDocumentpublishMutation();
  const { data,  isSuccess } = useUserWiseGroupViewQuery();
  const doc = useSelector((state) => state.document.documentView);

  const [smShow, setSmShow] = useState(false);
  const [group_id, setGroupId] = useState();
  const [share, setShare] = useState({
    name: '',
    description: '',
    file: ''
  });



  const shareDocHandler = (doc) => {
    setShare({
      name: doc.name,
      description: doc.description,
      file: doc.file
    });
  };

  const shareHandler = async () => {
    try {
     await shareDocument({ name: share.name, description: share.description, file: share.file, group_id: group_id }).unwrap();
      setSmShow(false);

    } catch (error) {
      toast.error(error.data.message);
    }
  };




  const download = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download/${doc.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${doc.name}.${response.data.type.split('/').pop()}`);
        
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
      <ToastContainer/>
      <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-xs"><img width={35 } src={shere_ic} alt="" />  Share Documnet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <Form.Control as="select" className="mb-3 " name="group_id" onChange={(e) => setGroupId(e.target.value)}>
              <option>Selact Group</option>
              {isSuccess &&
                data.data?.map((item, i) => (
                  <option key={i} value={item.group.id}>
                    {item.group.name}
                  </option>
                ))}
            </Form.Control>
            <div className="text-right">
              <Button onClick={() => shareHandler()} type="submit" className="btn btn-primary btn-sm">
                Share now
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Card>
        <ToastContainer />
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title as="h5">Documnet </Card.Title>
            </div>

            <div>
              <span className="me-auto pointer">
                <div onClick={() => history.goBack()}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>
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
                      {doc.status === 'Pending' && (
                        <div>
                          <img onClick={(e) => DocumentPublish(doc.id)} className="btn" width={85} src={cloud} alt="" />
                        </div>
                      )}

                      <div>
                        <img
                          onClick={() => {
                            setSmShow(true);
                            shareDocHandler(doc);
                          }}
                          className="btn"
                          width={85}
                          src={shareDoc}
                          alt=""
                        />
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
                          <b>{doc.name}</b>{' '}
                        </p>
                      </div>
                      <div className=" py-2">
                        <b>Category Name:</b> <br />{' '}
                        <p className="text-primary ">
                          <b> {doc.catagory?.name}</b>{' '}
                        </p>
                      </div>

                      <div className=" py-2">
                        <b>Status:</b> <br />
                        {doc.status === 'Active' ? <BsFillCheckCircleFill color="green" /> : <BsXCircleFill color="red" />}
                        {doc.status}
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
                  <Card width="1000px" height="500px">
                    <div>
                      {doc.file?.split('.').pop().includes('docx') ||
                      doc.file?.split('.').pop().includes('xls') ||
                      doc.file?.split('.').pop().includes('xlsx') ||
                      doc.file?.split('.').pop().includes('csv') ? (
                        <div class="alert alert-warning" role="alert">
                          Pleass Download this Document !!
                        </div>
                      ) : (
                        <embed width="100%" height="600px" alt={doc.name} src={`${process.env.REACT_APP_File_URL}${doc?.file}`} />
                      )}
                    </div>

                    <Card.Header>
                      <Card.Title as="h5">Description</Card.Title>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <p className="  ">{doc.description === 'undefined' ? 'No Description' : <b>{doc.description}</b>}</p>
                    </Card.Body>
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
