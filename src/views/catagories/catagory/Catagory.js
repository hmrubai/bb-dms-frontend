import React from 'react';
import { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import Loading from '../../../components/Loading/Loading';
import { useGetAllCatagoryQuery } from '../../../services/catagoryApi';
import CatagoryTableBody from './CatagoryTableBody';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import CatagoryAdd from './CatagoryAdd';
function Catagory() {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);

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
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
        </Modal.Header>
        <CatagoryAdd />
      </Modal>
      <ToastContainer />
      <div className="mb-2">
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          <BsFillPlusCircleFill color="white" className="mr-2 " />
          Add Catagory
        </Button>
      </div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Catagory</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive striped >
            <thead style={{ background:"grey"}}>
              <tr className=' text-white'>
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
