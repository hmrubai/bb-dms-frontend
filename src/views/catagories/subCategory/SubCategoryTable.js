import React from 'react';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import SubCategoryTableBody from '../../../views/catagories/subCategory/SubCategoryTableBody'
import Pagination from 'react-bootstrap/Pagination';
import { useGetAllSubCategoryQuery } from '../../../services/subCategoryApi';
import { ToastContainer } from 'react-toastify';
function SubCategoryTable() {
  const [page, setPage] = useState(1);
  // const [show, setShow] = useState(false);

  const { data, isFetching, isLoading } = useGetAllSubCategoryQuery(page);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (!data?.data) {
    return <div>No catagory :(</div>;
  } else {
    return (
      <>
         <ToastContainer />
        <div className="mb-2"></div>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Sub Catagory</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead style={{ background: 'grey' }}>
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.data.map((subCatagory,index) => (
                <SubCategoryTableBody key={index} subCatagory={subCatagory} index={index} />
              ))}
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

export default SubCategoryTable;
