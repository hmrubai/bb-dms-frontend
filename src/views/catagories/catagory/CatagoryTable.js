import React from 'react';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import { useGetAllCatagoryQuery } from '../../../services/catagoryApi';
import CatagoryTableBody from './CatagoryTableBody';
import Pagination from 'react-bootstrap/Pagination';
function CatagoryTable() {
  const [page, setPage] = useState(1);
  // const [show, setShow] = useState(false);

  const { data, isFetching, isLoading, isError, isSuccess } = useGetAllCatagoryQuery(page);

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
        <div className="mb-2">
          
        <Card>
          <Card.Header>
            <Card.Title as="h5">Catagory</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead style={{ background: 'grey' }}>
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created By</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.data.map((catagory ,index) => (
                <CatagoryTableBody key={index} catagory={catagory} index={index} />
              ))}
            </Table>

            <Pagination className=" justify-content-end   mr-5">
              <Pagination.Prev onClick={() => setPage(page - 1)} isLoading={isFetching} />
              <Pagination.Next onClick={() => setPage(page + 1)} isLoading={isFetching} />
            </Pagination>
          </Card.Body>
        </Card></div>
      </>
    );
  }
}

export default CatagoryTable;
