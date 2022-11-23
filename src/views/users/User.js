import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import UserTable from './UserTable';


function User() {
  return (
    <>
     
      <div className="mb-2">
        <Link to={`/users/user_add`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add User
          </Button>
        </Link>
      </div>
      <UserTable/>
    </>
  );
}

export default User;