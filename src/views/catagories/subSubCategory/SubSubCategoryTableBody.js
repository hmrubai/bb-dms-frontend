import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteSubSubCategoryMutation } from '../../../services/subSubCategoryApi';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

function CategoryTableBody({ subSubCatagory ,index }) {
  const [deleteSubSubCategory, ] = useDeleteSubSubCategoryMutation();
  const authPermission = useSelector((state) => state.auth.permissions);
  const deleteHandel = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 400
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubSubCategory(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };


  return (
    <tbody>
      <tr>
        <th scope="row">{index+1}</th>
        <td>{subSubCatagory?.name}</td>
        <td>{subSubCatagory?.user?.name}</td>
        <td>{subSubCatagory?.catagory?.name}</td>
        <td>{subSubCatagory?.sub_catagory?.name}</td>
        <td>{subSubCatagory.status}</td>

        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${subSubCatagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/sub_sub_category_view/${subSubCatagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          {/* {authPermission.includes('category_edit') && ( */}
               <Link to={`/catagories/sub_sub_category_edit/${subSubCatagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          {/* )} */}

          {/* {authPermission.includes('category_delete') && ( */}
              <button style={{ 'border-style': 'none' }} onClick={() => deleteHandel(subSubCatagory.id)}>
            <BsFillTrashFill color="red" size={17} />
          </button>
          {/* )} */}
        
        </td>
      </tr>
    </tbody>
  );
}

export default CategoryTableBody;
