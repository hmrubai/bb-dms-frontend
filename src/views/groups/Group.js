import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GroupTable } from './GroupTable';

function group() {
  return (
    <>
    <div className="mb-2">
    <ToastContainer/>
           <Link to={`/groups/group_create`}>
           <Button>
             <BsFillPlusCircleFill color="white" className="mr-2 " />
             Create Group
           </Button>
         </Link>

       <GroupTable/>
    </div>
  </>
  )
}

export default group