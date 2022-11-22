import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

import SubSubCategoryTable from './SubSubCategoryTable';

function SubSubCategory() {
  return (
    <>
     
      <div className="mb-2">
        <Link to={`/catagories/sub_sub_category_add`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add Sub Sub Category
          </Button>
        </Link>
      </div>
      <SubSubCategoryTable />
    </>
  );
}

export default SubSubCategory;