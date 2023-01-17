import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillClockFill, BsFillEyeFill, BsFillTrashFill, BsXCircleFill } from 'react-icons/bs';
import { RiUploadCloud2Fill } from 'react-icons/ri';
// import { useSelector } from './../../store/index';
import DayJS from 'react-dayjs';
import Swal from 'sweetalert2';
import { useAdminDocumentPublishMutation, useDeleteUnpublishDocumentMutation } from '../../services/publishApi';

function AdminUnpublishDocumentTable({ list, index }) {
  const [deleteUnpublishDocument] = useDeleteUnpublishDocumentMutation();
  const [adminDocumentPublish] = useAdminDocumentPublishMutation();
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
      cancelButtonColor: '#4e4e4e',
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
        Date: <DayJS format="YYYY-MM-DD">{list.created_at}</DayJS> |<BsFillClockFill color="black" />| Time:{' '}
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
          <RiUploadCloud2Fill className="pointer mx-1  " color="Teal" size={20} onClick={() => DocumentPublish(list.id)} />
        )}
      </td>
    </tr>
  );
}

export default AdminUnpublishDocumentTable;
