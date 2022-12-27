import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import SubCategoryTable from './SubCategoryTable';

function SubCategory() {
  return (
    <>
     
      <div className="mb-2">
        <Link to={`/catagories/sub_category_add`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add Sub Category
          </Button>
        </Link>
      </div>
      <SubCategoryTable />
    </>
  );
}

export default SubCategory;