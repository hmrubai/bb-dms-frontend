import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import folder from '../../assets/images/file-folder.png';
function DocumentSubSubCategory({ item }) {
  return (
    <div className="mx-1">
      <Link to={`/documents/document_sub_sub_category_view/${item.id}`} className=" m-2 ">
        <Card style={{ width: '7rem' }}>
          <Card.Img className="m-1 pointer " variant="top" src={folder} alt={item.name} />
          <Card.Body className="p-1 m-0">
            <Card.Title className="h6 text-center font-weight-bold">{item.name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default DocumentSubSubCategory;
