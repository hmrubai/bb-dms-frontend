import React from 'react'
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DocumentSubSubCategory({ item }) {
    // console.log(item);
  return (
    <Col className="d-flex align-items-center">
    <Link to={`/documents/document_sub_sub_category_view/${item.id}`} className=" m-2 ">
      <Card style={{ width: '10rem' }}>
        <Card.Img
          className="m-1 pointer "
          variant="top"
          src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png"
          alt={item.name}
        />
        <Card.Body className="p-1 m-0">
          <Card.Title className="h6 text-center">{item.name}</Card.Title>
          <Card.Text> </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
  )
}

export default DocumentSubSubCategory