import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import DocumentTable from './DocumentTable';

const Document = () => {
  return (
    <>
     
    <div className="mb-2">
      <Link to={`/documents/document_add`}>
        <Button>
          <BsFillPlusCircleFill color="white" className="mr-2 " />
          Add Document
        </Button>
      </Link>
    </div>
   <DocumentTable/>
  </>
  )
}

export default Document