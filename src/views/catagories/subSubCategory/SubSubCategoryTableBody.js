import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDeleteSubSubCategoryMutation } from '../../../services/subSubCategoryApi';

function CategoryTableBody({ subSubCatagory }) {

  const [deleteSubSubCategory,{data,isSuccess}] = useDeleteSubSubCategoryMutation()

  const deleteHandel = async(id) => {
    await deleteSubSubCategory(id)
  }
  
  if (isSuccess) {
    toast.success(data.message)
  }

  return (
    <tbody>
      <tr>
        <th scope="row">{subSubCatagory.id}</th>
        <td>{subSubCatagory.name}</td>
        <td >{subSubCatagory.user.name}</td>
        <td >{subSubCatagory.catagory.name}</td>
        <td >{subSubCatagory.sub_catagory.name}</td>
      
        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${subSubCatagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/sub_sub_category_view/${subSubCatagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/sub_sub_category_edit/${subSubCatagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <button style={{ "border-style": "none"}} onClick={() => deleteHandel(subSubCatagory.id)} >
            <BsFillTrashFill color="red" size={17} />
          </button>
        
        </td>
      </tr>
    </tbody>
  );
}

export default CategoryTableBody;
