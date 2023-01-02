import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import CatagoryTable from './CatagoryTable';
// import { useSelector } from './../../../store/index';
function Catagory() {
  // const authPermission = useSelector((state) => state.auth.permissions);

  return (
    <>
      <ToastContainer />
      <div className="mb-2">
        {/* {authPermission.includes('category_create') && ( */}
        <Link to={`/catagories/catagory_add`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add Catagory
          </Button>
        </Link>
        {/* )} */}
      </div>
      <CatagoryTable />
    </>
  );
}
export default Catagory;
