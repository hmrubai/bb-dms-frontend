import React from 'react';
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';

import Pagination from 'react-bootstrap/Pagination';

import { ToastContainer } from 'react-toastify';
import UserTableBody from './UserTableBody';
import Loading from '../../components/Loading/Loading';
import { useGetAllUserQuery } from '../../services/userApi';

function UserTable() {
  const [page, setPage] = useState(1);

  const  { data, isFetching, isLoading, isError, isSuccess } = useGetAllUserQuery(page)
  
  console.log(data)
  

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
            <Card.Title as="h5">Users</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead style={{ background: 'grey' }}>
                <tr className=" text-white">
   
                  <th>ID</th>
                  <th>Name</th>
                  <th>username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Gender</th>
                  <th>Number</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.data.map((user) => (
                <UserTableBody user={user} />
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

export default UserTable;
