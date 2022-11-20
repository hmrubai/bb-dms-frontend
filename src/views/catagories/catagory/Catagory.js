import React from 'react';
import { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import { useGetAllCatagoryQuery } from '../../../services/catagoryApi';
import CatagoryTableBody from './CatagoryTableBody';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
function Catagory() {
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isError, isSuccess } = useGetAllCatagoryQuery(page);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!data?.data) {
    return <div>No catagory :(</div>;
  }
  return (
    <>
      <div className="mb-2">
        <Link to={`/catagories/catagory_add`}>
          <Button>Add Catagory</Button>
        </Link>
      </div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Catagory</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created By</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.data.map((catagory) => (
              <CatagoryTableBody catagory={catagory} />
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

export default Catagory;
