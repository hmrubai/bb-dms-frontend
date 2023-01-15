import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { useAdminUnpublishDocumentListQuery } from '../../services/publishApi';
import { useSelector } from '../../store';
import AdminUnpublishDocumentTable from './AdminUnpublishDocumentTable';

function AdminUnpublishDocumentList() {
  const history = useHistory();
  const { data, isSuccess,isFetching } = useAdminUnpublishDocumentListQuery();
  const authPermission = useSelector((state) => state.auth.permissions);

  if (authPermission.includes('superadmin_view')) {
    return (
      <>
        <ToastContainer />
        <div className="mb-2"></div>
        <Card>
          <Card.Header>
          
            <div className='d-flex justify-content-between'>
            <div>
              <Card.Title as="h5">Unpublish Document List</Card.Title>
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
          <Card.Body className="table-responsive table-scroll table-earnings ">
            <Table responsive striped>
              <thead style={{ background: 'grey' }}>
                <tr className=" text-white">
                  <th>ID</th>
                  <th>Document Name</th>
                  <th>Created By</th>
                  <th>Admin Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {isFetching && (
                <div className="text-center">
                  <Loading />
                </div>
              )}

                {isSuccess && data.map((list, index) => <AdminUnpublishDocumentTable key={index} list={list} index={index} />)}
                </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <div class="alert alert-danger" role="alert">
        You are not authorized to access this page! Only Admin can access this page.
      </div>
    );
  }
}

export default AdminUnpublishDocumentList;
