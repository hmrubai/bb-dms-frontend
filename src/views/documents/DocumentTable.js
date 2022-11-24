import React from 'react';
import { useState } from 'react';
import { Card, Table, Row, Col } from 'react-bootstrap';

import Pagination from 'react-bootstrap/Pagination';

import { ToastContainer } from 'react-toastify';
import { useGetAllUserQuery } from '../../services/userApi';
import Loading from './../../components/Loading/Loading';
import UserTableBody from './../users/UserTableBody';

function DocumentTable() {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Documents</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className=" d-flex">
              <div className=' m-2 '>
                <Card style={{ width: '10rem' }}>
                  <Card.Img className="m-1 pointer" variant="top" src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png" />
                  <Card.Body className="p-1 m-0">
                    <Card.Title className="h6">Accounts</Card.Title>
                    <Card.Text>Some quick example </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className=' m-2'>
                <Card style={{ width: '10rem' }}>
                  <Card.Img className="m-1 pointer " variant="top" src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png" />
                  <Card.Body className="p-1 m-0">
                    <Card.Title className="h6">Accounts</Card.Title>
                    <Card.Text>Some quick example </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className=' m-2'>
                <Card style={{ width: '10rem' }}>
                  <Card.Img className="m-1 pointer" variant="top" src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png" />
                  <Card.Body className="p-1 m-0">
                    <Card.Title className="h6">Accounts</Card.Title>
                    <Card.Text>Some quick example </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default DocumentTable;
