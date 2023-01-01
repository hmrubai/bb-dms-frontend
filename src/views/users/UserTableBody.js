import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
// import { useSelector } from './../../store/index';
import { useDeleteUserMutation } from '../../services/userApi';
import Swal from 'sweetalert2';


function UserTableBody({ user, index }) {
  const [deleteUser] = useDeleteUserMutation();

  // const authPermission = useSelector((state) => state.auth.permissions);

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
        deleteUser(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
        <td>{user.gender}</td>
        <td>{user.number}</td>

        <img className="img-circle mt-3" src={`${process.env.REACT_APP_IMAGE_URL}${user.image}`} width="60px" alt="" />
        <td>
          <Link to={`/users/user_view/${user.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          {/* {authPermission.includes('user_edit') && ( */}
            <Link to={`/users/user_edit/${user.id}`} className="px-2">
              <BsPencilSquare size={18} />
            </Link>
          {/* )} */}

          {/* {authPermission.includes('user_delete') && ( */}
            <button style={{ 'border-style': 'none' }} onClick={() => deleteHandel(user.id)}>
              <BsFillTrashFill color="red" size={17} />
            </button>
          {/* )} */}
        </td>
      </tr>
    </tbody>
  );
}

export default UserTableBody;
