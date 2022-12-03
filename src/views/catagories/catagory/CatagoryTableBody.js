import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteCatagoryMutation } from '../../../services/catagoryApi';
import Swal from 'sweetalert2';
function CatagoryTableBody({ catagory }) {
  const [deleteCatagory] = useDeleteCatagoryMutation();

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
        deleteCatagory(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <tbody>
      <tr>
        <th scope="row">{catagory.id}</th>
        <td>{catagory.name}</td>
        <td>{catagory.user.name}</td>
        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${catagory.image}`} width="60px" alt="" />
        <td>
          <Link to={`/catagories/catagory_view/${catagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/catagory_edit/${catagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <button style={{ 'border-style': 'none' }} onClick={() => deleteHandel(catagory.id)}>
            <BsFillTrashFill color="red" size={17} />
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default CatagoryTableBody;
