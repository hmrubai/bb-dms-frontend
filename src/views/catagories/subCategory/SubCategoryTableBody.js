import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteSubCategoryMutation } from '../../../services/subCategoryApi';
import  Swal  from 'sweetalert2';
// import { useSelector } from 'react-redux';

function CategoryTableBody({ subCatagory ,index}) {

  const [deleteSubCategory] = useDeleteSubCategoryMutation()
  // const authPermission = useSelector((state) => state.auth.permissions);
  const deleteHandel = async(id) => {

    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33 ',
      cancelButtonColor: ' #4e4e4e',
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

      <tr>
        <th scope="row">{index+1}</th>
        <td>{subCatagory.name}</td>
        <td >{subCatagory.user.name}</td>
        <td >{subCatagory.catagory.name}</td>
        <td >{subCatagory.status}</td>
      
        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${subCatagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/sub_category_view/${subCatagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          {/* {authPermission.includes('category_edit') && ( */}
            <Link to={`/catagories/sub_category_edit/${subCatagory.id}`} className="px-2">
              <BsPencilSquare size={18} />
            </Link>
          {/* )} */}
            {/* {authPermission.includes('category_delete') && ( */}
         <Link to="#" style={{ "border-style": "none"}} onClick={() => deleteHandel(subCatagory.id)} >
         <BsFillTrashFill color="red" size={17} />
       </Link>
          {/* )} */}
          
        
        </td>
      </tr>

  );
}

export default CategoryTableBody;
