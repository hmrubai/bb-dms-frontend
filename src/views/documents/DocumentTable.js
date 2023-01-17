import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useGetCategoryAllShowQuery } from '../../services/catagoryApi';
import folder from '../../assets/images/file-folder.png';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
function DocumentTable() {
  let history = useHistory();
  const { data, isLoading, isSuccess, isError } = useGetCategoryAllShowQuery();

  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
       
          <div className='d-flex justify-content-between'>
            <div>
                 <Card.Title as="h5">Documents</Card.Title>
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
        <Card.Body className="m-0 p-0">{isLoading && <Loading />}</Card.Body>
        <Card.Body className="m-0 p-0">{isError && <div className='d-flex justify-content-center'>Something went wrong (:</div>}</Card.Body>
        {data?.length === 0 && (
          <div className="d-flex justify-content-center">
            <p className="text-center">No Document Found :)</p>
          </div>
            )}
        {isSuccess && (
          <div className="d-flex flex-wrap ">
            {data.map((category, i) => (
              <div className="mx-1" key={i}>
                <Link to={`/documents/document_category_view/${category.id}`} className=" m-2 ">
                  <Card style={{ width: '7rem' }}>
                    <Card.Img
                      className="m-1 pointer "
                      variant="top"
                      src={folder}
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
