import React from 'react';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import SubSubCategoryTableBody from '../../../views/catagories/subSubCategory/SubSubCategoryTableBody';

import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer } from 'react-toastify';
import { useGetAllSubSubCategoryQuery } from '../../../services/subSubCategoryApi';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

function SubSubCategoryTable() {
  const [page, setPage] = useState(1);
  const history = useHistory();
  // const [show, setShow] = useState(false);

  const { data, isFetching, isLoading } = useGetAllSubSubCategoryQuery(page);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (!data?.data) {
    return <div>No Sub Sub Category :(</div>;
  } else {
    return (
      <>
        <ToastContainer />
        <div className="mb-2"></div>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title as="h5">Sub Sub Category</Card.Title>
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
            <Table responsive striped>
              <thead style={{ background: 'grey' }}>
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Category Name</th>
                  <th>Sub Category Name</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((subSubCatagory, index) => (
                  <SubSubCategoryTableBody key={index} subSubCatagory={subSubCatagory} index={index} />
                ))}
              </tbody>
              {data?.data?.length === 0 && (
                <div className="d-flex justify-content-center">
                  <p className="text-center">No Sub Sub Category Found :)</p>
                </div>
              )}
            </Table>

            <Pagination className=" justify-content-end   mr-5">
              <Pagination.Prev onClick={() => setPage(page - 1)} isLoading={isFetching} />
              <Pagination.Next onClick={() => setPage(page + 1)} isLoading={isFetching} />
            </Pagination>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SubSubCategoryTable;
