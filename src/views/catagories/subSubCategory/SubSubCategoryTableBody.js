import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDeleteSubSubCategoryMutation } from '../../../services/subSubCategoryApi';
import Swal from 'sweetalert2';

function CategoryTableBody({ subSubCatagory }) {
  const [deleteSubSubCategory, { data, isSuccess }] = useDeleteSubSubCategoryMutation();

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

  // if (isSuccess) {
  //   toast.success(data.message)
  // }

  return (
    <tbody>
      <tr>
        <th scope="row">{subSubCatagory.id}</th>
        <td>{subSubCatagory?.name}</td>
        <td>{subSubCatagory?.user?.name}</td>
        <td>{subSubCatagory?.catagory?.name}</td>
        <td>{subSubCatagory?.sub_catagory?.name}</td>

        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${subSubCatagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/sub_sub_category_view/${subSubCatagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/sub_sub_category_edit/${subSubCatagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <button style={{ 'border-style': 'none' }} onClick={() => deleteHandel(subSubCatagory.id)}>
            <BsFillTrashFill color="red" size={17} />
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default CategoryTableBody;
