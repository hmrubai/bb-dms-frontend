import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteCatagoryMutation } from '../../../services/catagoryApi';
import Swal from 'sweetalert2';
// import { useSelector } from './../../../store/index';
function CatagoryTableBody({ catagory ,index}) {
  const [deleteCatagory] = useDeleteCatagoryMutation();
  // const authPermission = useSelector((state) => state.auth.permissions);


  const deleteHandel = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33 ',
      cancelButtonColor: ' #4e4e4e',
      confirmButtonText: 'Yes, delete it!',
      width: 400
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCatagory(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
   
      <tr>
        <th scope="row">{index+1}</th>
        <td>{catagory.name}</td>
        <td>{catagory.user.name}</td>
        <td>{catagory.status}</td>

        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${catagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/catagory_view/${catagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          {/* {authPermission.includes('category_edit') && ( */}
                <Link to={`/catagories/catagory_edit/${catagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          {/* )} */}
      
{/*           
          {authPermission.includes('category_delete') && ( */}
            <Link to="#" style={{ 'border-style': 'none' }} onClick={() => deleteHandel(catagory.id)}>
            <BsFillTrashFill color="red" size={17} />
          </Link>
          {/* )} */}
          
        </td>
      </tr>

  );
}

export default CatagoryTableBody;
