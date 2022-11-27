import React from 'react';
import { useState } from 'react';
import { Card, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useGetCategoryAllShowQuery } from '../../services/catagoryApi';


function DocumentTable() {
  const { data, isLoading, isSuccess, isError } = useGetCategoryAllShowQuery();


  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Documents</Card.Title>
        </Card.Header>
        <Card.Body>{isLoading && <Loading />}</Card.Body>
        <Card.Body className="my-0 py-0">{isError && <div>No catagory :</div>}</Card.Body>
        {isSuccess && (
          <Row>
            {data.map((category) => (
              <Col className="d-flex align-items-center">
                <Link to={`/documents/document_category_view/${category.id}`} className=" m-2 ">
                  <Card style={{ width: '10rem' }}>
                    <Card.Img
                      className="m-1 pointer "
                      variant="top"
                      src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png"
                      alt={category.name}
                    />
                    <Card.Body className="p-1 m-0">
                      <Card.Title className="h6 text-center">{category.name}</Card.Title>
                      <Card.Text> </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </>
  );
}

export default DocumentTable;
