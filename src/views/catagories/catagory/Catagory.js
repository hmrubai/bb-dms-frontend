import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import { useGetAllCatagoryQuery } from '../../../services/catagoryApi';
import CatagoryTableBody from './CatagoryTableBody';

function Catagory() {
  const { data, isFetching, isLoading, isError, isSuccess } = useGetAllCatagoryQuery();

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isSuccess) {
    console.log(data);
    return (
      <>
        <>
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
                {data.map((catagory) => (
                  <CatagoryTableBody catagory={catagory} />
                ))}
              </Table>
            </Card.Body>
          </Card>
        </>
      </>
    );
  }
}

export default Catagory;
