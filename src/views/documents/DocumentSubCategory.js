import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DocumentSubCategory({ item }) {
  return (
    <div className="mx-1">
      <Link to={`/documents/document_sub_category_view/${item.id}`} className=" m-2 ">
        <Card style={{ width: '7rem' }}>
          <Card.Img
            className="m-1 pointer "
            variant="top"
            src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png"
            alt={item.name}
          />
          <Card.Body className="p-1 m-0">
            <Card.Title style={{ fontSize: '100%' }} className="h6 text-center font-weight-bold">
              {item.name}
            </Card.Title>
            <Card.Text> </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default DocumentSubCategory;
