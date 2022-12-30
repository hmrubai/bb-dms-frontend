import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { useAdminUnpublishDocumentListQuery } from '../../services/publishApi';


import AdminUnpublishDocumentTable from './AdminUnpublishDocumentTable';

function AdminUnpublishDocumentList() {
  // const [page, setPage] = useState(1);
  // const { data, isFetching, isLoading } = useGetAllUserQuery(page);
  const { data, isFetching, isLoading }=useAdminUnpublishDocumentListQuery();
  
  console.log(data)

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (!data) {
    return <div>No Unpublish List :(</div>;
  } else {
    return (
      <>
        <ToastContainer />
        <div className="mb-2"></div>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Users</Card.Title>
          </Card.Header>
          <Card.Body className="table-responsive">
            <Table responsive striped className="table-scroll table-earnings">
              <thead style={{ background: 'grey'}} >
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Doc Name</th>
                  <th>Username</th>
                  <th>Admin Status</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data?.map((list,index) => (
                <AdminUnpublishDocumentTable key={ index } list={list} index={index} />
              ))}
            </Table>

            {/* <Pagination className=" justify-content-end   mr-5">
              <Pagination.Prev onClick={() => setPage(page - 1)} isLoading={isFetching} />
              <Pagination.Next onClick={() => setPage(page + 1)} isLoading={isFetching} />
            </Pagination> */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default AdminUnpublishDocumentList;


