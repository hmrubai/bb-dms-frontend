import React from 'react';
import { Card } from 'react-bootstrap';
import group from './../../assets/images/File/group.png';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill, BsFillEyeFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { useDeleteGroupMutation, useUserWiseGroupViewQuery } from '../../services/groupApi';
import Loading from './../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useSelector } from './../../store/index';

export const GroupTable = () => {
  const { data, isFetching, isLoading, isSuccess } = useUserWiseGroupViewQuery();
  const [deleteGroup] = useDeleteGroupMutation();
  const auth = useSelector((state) => state.auth.user);


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
        deleteGroup(id);
        Swal.fire('Deleted!', 'Your Group has been deleted.', 'success');
      }
    });
  };

  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Groups</Card.Title>
        </Card.Header>

        {isFetching && <Loading />}

        <div className="d-flex flex-wrap ">
          {isSuccess &&
            data.data?.map((item, i) => (
              <Card key={i} className=" mx-2 shadow">
                <div className="text-center">
                  <Card.Img
                    className="m-1 pointer rounded-circle "
                    variant="top"
                    src={item?.group?.image ? `${process.env.REACT_APP_IMAGE_URL}${item?.group?.image}` : group}
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>

                <Card.Body className="py-0 my-0 pt-2 ">
                  <Card.Title style={{ fontSize: '100%' }} className="text-center font-weight-bold">
                    {item?.group?.name}
                  </Card.Title>
                  <Card.Text className="">
                    {' '}
                    <HiUserGroup color="green" /> {item?.group?.user[0].name}
                  </Card.Text>

                  <div className=" text-center p-2 shadow my-3  px-4">
                    <div>
                      <Link to={`/groups/group_document/${item.group.id}`}>
                        <BsFillEyeFill color="blue" size={22} />
                      </Link>

                      <Link to={`/documents/document_edit/`} className="px-3">
                        <BsPencilSquare size={18} />
                      </Link>
                      {auth.id === item?.group?.user[0].id &&
                         <Link to="#" style={{ 'border-style': 'none' }} onClick={() => deleteHandel(item.group.id)}>
                        <BsFillTrashFill color="red" size={17} />
                      </Link>
                      }
                   
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </Card>
    </>
  );
};
