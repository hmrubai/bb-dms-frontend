import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useDeleteCatagoryMutation } from '../../../services/catagoryApi';
function CatagoryTableBody({ catagory }) {

  const [deleteCatagory] = useDeleteCatagoryMutation()

  const deleteHandel = async(id) => {
    await deleteCatagory(id)
  }
  

  return (
    <tbody>
      <tr>
        <th scope="row">{catagory.id}</th>
        <td>{catagory.name}</td>
        <td>{catagory.user.name}</td>
        <img className="img-circle" src={`${process.env.REACT_APP_IMAGE_URL}${catagory.image}`} width="50px" alt="" />
        <td>
          <Link to={`/catagories/catagory_view/${catagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/catagory_edit/${catagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <button style={{ "border-style": "none"}} onClick={() => deleteHandel(catagory.id)} >
            <BsFillTrashFill color="red" size={17} />
          </button>
        
        </td>
      </tr>
    </tbody>
  );
}

export default CatagoryTableBody;
