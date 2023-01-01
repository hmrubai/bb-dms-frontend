import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillClockFill, BsFillEyeFill, BsFillTrashFill, BsReplyAllFill, BsXCircleFill } from 'react-icons/bs';
// import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
import Swal from 'sweetalert2';
import { useAdminDocumentPublishMutation, useDeleteUnpublishDocumentMutation } from '../../services/publishApi';

function AdminUnpublishDocumentTable({ list, index }) {
  const [deleteUnpublishDocument] = useDeleteUnpublishDocumentMutation();
  const [adminDocumentPublish,] = useAdminDocumentPublishMutation();
  // const authPermission = useSelector((state) => state.auth.permissions);

  const deleteHandel = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 400
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUnpublishDocument(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const DocumentPublish = async (Pid) => {
    Swal.fire({
      title: 'You want to Publish this Document?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Publish it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        adminDocumentPublish(Pid);
        Swal.fire('Publish!', 'Your file has been Publish.', 'success');
      }
    });
  };

  return (
    <tbody>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{list.name}</td>
        <td> {list.user.name}</td>
        <td>
          {' '}
          <span>
            <BsXCircleFill color="red" />
          </span>{' '}
          {list.admin_status}
        </td>
        <td>
          Date: <DayJS format="YYYY-MM-DD">{list.created_at}</DayJS> |<BsFillClockFill color='black'/>| Time:{' '}
          <DayJS format="h:mm A">{list.created_at}</DayJS>
        </td>

        <td>
          <Link to={`/documents/unpublish_document_view/${list.id}`}>
            <BsFillEyeFill color="black" size={20} />
          </Link>
       
          <button style={{ 'border-style': 'none' }} onClick={() => deleteHandel(list.id)}>
            <BsFillTrashFill color="red" size={17} />
          </button>

          {list.admin_status === 'Pending' && (
            <BsReplyAllFill className="pointer mx-1 border " color="green" size={22} onClick={() => DocumentPublish(list.id)} />
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default AdminUnpublishDocumentTable;
