import React from 'react';
import { Card } from 'react-bootstrap';
import group from './../../assets/images/File/group.png';
import { Link, useHistory } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill, BsFillEyeFill, BsArrowLeftCircleFill } from 'react-icons/bs';

import { useDeleteGroupMutation, useUserWiseGroupViewQuery } from '../../services/groupApi';
import Loading from './../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useSelector } from './../../store/index';
import avator from './../../assets/images/user/avatar-1.jpg';

export const GroupTable = () => {
  const { data, isFetching, isSuccess } = useUserWiseGroupViewQuery();
  // const { data, isFetching, isSuccess, isLoading } = useSingalGroupQuery(id)
  const [deleteGroup] = useDeleteGroupMutation();
  const auth = useSelector((state) => state.auth.user);
const history = useHistory();


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
          <div className=' d-flex justify-content-between'>
            <div>
              <Card.Title as="h5">Groups </Card.Title>
            </div>
            <div>
                <span className="me-auto pointer">
                <div onClick={()=>history.goBack()}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>


          

        {isFetching && <Loading />}

        <div className="d-flex flex-wrap " >
          {isSuccess &&
            data.data?.map((item, i) => (
              <Card key={i} className=" mx-2 shadow "  style={{borderRadius:"50%"}}>
                <Link className="text-center" to={`/groups/group_document/${item.group.id}`}>
                  <Card.Img
                    className="m-1 pointer rounded-circle "
                    variant="top"
                    src={item?.group?.image ? `${process.env.REACT_APP_IMAGE_URL}${item?.group?.image}` : group}
                    style={{ width: '100px', height: '100px' }}
                  />
                </Link>

                <Card.Body className="py-0 my-0 pt-2 ">
                  <Card.Title style={{ fontSize: '100%' }} className="text-center font-weight-bold">
                    {item?.group?.name.slice(0, 15)}
                  </Card.Title>
                  <Card.Text className="">
                    {' '}
                    
                    <img className=' rounded-circle mb-1 mr-1' width={15} src={item?.group?.group_creator?.image ?
                      `${process.env.REACT_APP_IMAGE_URL}${item?.group?.group_creator?.image}` : `${avator}`} alt="" />
                    {item?.group?.group_creator?.name}
                  </Card.Text>

                  <div className=" text-center p-2 shadow my-3  px-4" style={{borderRadius:"50% 50%", width:"150px  "}}>
                    <div>
                      <Link to={`/groups/group_document/${item.group.id}`}>
                        <BsFillEyeFill color="blue" size={22} />
                      </Link>
                      {auth.id === item?.group?.group_creator?.id && (
                        <Link to={`/groups/group_update/${item.group.id}`} className="px-3">
                          <BsPencilSquare size={18} />
                        </Link>
                      )} 
                      {auth.id === item?.group?.group_creator?.id && (
                        <Link to="#" style={{ 'border-style': 'none' }} onClick={() => deleteHandel(item.group.id)}>
                          <BsFillTrashFill color="red" size={17} />
                        </Link>
                  )} 
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
