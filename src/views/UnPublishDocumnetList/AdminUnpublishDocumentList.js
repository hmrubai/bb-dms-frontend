import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { useAdminUnpublishDocumentListQuery } from '../../services/publishApi';
import { useSelector } from '../../store';
import AdminUnpublishDocumentTable from './AdminUnpublishDocumentTable';

function AdminUnpublishDocumentList() {
  const { data, isFetching, isLoading }=useAdminUnpublishDocumentListQuery();
  const authPermission = useSelector((state) => state.auth.permissions);


  if (authPermission.includes('unpublish_doc_list')){
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
            <Card.Title as="h5">Unpublish Document List</Card.Title>
          </Card.Header>
          <Card.Body className="table-responsive table-scroll table-earnings ">
            <Table responsive striped >
              <thead style={{ background: 'grey'}}  >
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Document Name</th>
                  <th>Username</th>
                  <th>Admin Status</th>
                  <th>Created Date</th>
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
  } else {
    return <div class="alert alert-danger" role="alert">
    You are not authorized to access this page!
  </div>
  }

  

}

export default AdminUnpublishDocumentList;


