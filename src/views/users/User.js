import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import UserTable from './UserTable';
import { useSelector } from './../../store/index';

function User() {
  const authPermission = useSelector((state) => state.auth.permissions);
 
  return (
    <>
      <div className="mb-2">
        {authPermission.includes('user_create') && (
             <Link to={`/users/user_add`}>
             <Button>
               <BsFillPlusCircleFill color="white" className="mr-2 " />
               Add User
             </Button>
           </Link>
     )}
        <UserTable />
      </div>
    </>
  );
}

export default User;
