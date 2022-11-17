import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
function CatagoryTableBody({ catagory }) {
  return (
    <tbody>
      <tr>
        <th scope="row">{catagory.id}</th>
        <td>{catagory.name}</td>
        <td>{catagory.user_id}</td>
        <img className="img-circle" src={`${process.env.REACT_APP_IMAGE_URL}${catagory.image}`} width="50px" alt="" />
        <td>
          <Link to={`/catagories/catagory_view/${catagory.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
          <Link to={`/catagories/catagory_edit/${catagory.id}`} className="px-2">
            <BsPencilSquare size={18} />
          </Link>
          <Link to="#">
            <BsFillTrashFill color="red" size={17} />
          </Link>
        </td>
      </tr>
    </tbody>
  );
}

export default CatagoryTableBody;
