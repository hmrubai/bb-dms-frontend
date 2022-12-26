import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsFillPlusCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import DocumentTable from './DocumentTable';
import { useSelector } from './../../store/index';

const Document = () => {
  const authPermission = useSelector((state) => state.auth.permissions);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="mb-2">
          <Link to={`/documents/document_add`}>
            <Button>
              <BsFillArrowUpCircleFill color="white" className="mr-2 " />
              Uploade Document
            </Button>
          </Link>
        </div>

        <div>
          {authPermission.includes('user_create') && (
            <Link to={`/catagories/catagory_add`}>
              <Button>
                <BsFillPlusCircleFill color="white" className="mr-2 " />
                Add Catagory
              </Button>
            </Link>
          )}
        </div>
      </div>
      <DocumentTable />
    </>
  );
};

export default Document;
