import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useGetCategoryAllShowQuery } from '../../services/catagoryApi';
import docFolder from '../../assets/images/File/docfolder.png'

function DocumentTable() {
  const { data, isLoading, isSuccess, isError } = useGetCategoryAllShowQuery();

  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Documents</Card.Title>
        </Card.Header>
        <Card.Body className="m-0 p-0">{isLoading && <Loading />}</Card.Body>
        <Card.Body className="m-0 p-0">{isError && <div>No catagory :</div>}</Card.Body>
        {isSuccess && (
          <div className="d-flex flex-wrap ">
            {data.map((category, i) => (
              <div className="mx-1" key={i}>
                <Link to={`/documents/document_category_view/${category.id}`} className=" m-2 ">
                  <Card style={{ width: '7rem' }}>
                    <Card.Img
                      className="m-1 pointer "
                      variant="top"
                      src="https://img.icons8.com/emoji/500/null/open-file-folder-emoji.png"
                      alt={category.name}
                    />
                    <Card.Body className="p-0 m-0">
                      <Card.Title style={{ fontSize: '100%' }} className="text-center font-weight-bold">
                        {category.name}
                      </Card.Title>
                      <Card.Text> </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

export default DocumentTable;
