import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteSubCategoryMutation } from '../../../services/subCategoryApi';
import { toast } from 'react-toastify';
import  Swal  from 'sweetalert2';

function CategoryTableBody({ subCatagory ,index}) {

  const [deleteSubCategory,{data,isSuccess}] = useDeleteSubCategoryMutation()

  const deleteHandel = async(id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 400,
    }).then((result) => {
      
      if (result.isConfirmed) {
          deleteSubCategory(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    }) 
  }
  
  // if (isSuccess) {
  //   toast.success(data.message)
  // }

  return (
    <tbody>
      <tr>
        <th scope="row">{index+1}</th>
        <td>{subCatagory.name}</td>
        <td >{subCatagory.user.name}</td>
        <td >{subCatagory.catagory.name}</td>
      
        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${subCatagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/sub_category_view/${subCatagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/sub_category_edit/${subCatagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <button style={{ "border-style": "none"}} onClick={() => deleteHandel(subCatagory.id)} >
            <BsFillTrashFill color="red" size={17} />
          </button>
        
        </td>
      </tr>
    </tbody>
  );
}

export default CategoryTableBody;
