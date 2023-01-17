import React from 'react';

import { Card, Button } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  BsFillPlusCircleFill,
  BsFillEyeFill,
  BsFillArrowDownCircleFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsArrowLeftCircleFill
} from 'react-icons/bs';
import { useGroupDeleteDocumentMutation, useGroupDocumentQuery, useSingalGroupQuery } from '../../services/groupApi';
import Loading from './../../components/Loading/Loading';
import file from './../../assets/images/File/word.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';
import { useSelector } from './../../store/index';
import { HiUserGroup } from 'react-icons/hi';
import avatar from '../../assets/images/user/avatar-1.jpg';
function GroupDocument() {
  const { id } = useParams();
  let history = useHistory();

  const { data, isFetching, isSuccess } = useGroupDocumentQuery(id);
  const [groupDeleteDocument] = useGroupDeleteDocumentMutation();
  const { data: singalData, isSuccess: singalDataSuccess } = useSingalGroupQuery(id);

  const auth = useSelector((state) => state.auth.user);

  const deleteHandel = async (Did) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'error',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#4e4e4e',
      confirmButtonText: 'Yes, delete it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        groupDeleteDocument(Did);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const download = (e, item) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download_file/${item.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_token')}`
      },
      responseType: 'blob'
    })
      .then((response) => {
        fileDownload(response.data, `${item.name}.${response.data.type.split('/').pop()}`);
      })
      .catch((error) => {
        console.log('sumthing went wrong');
      });
  };

  return (
    <>
      <div className="mb-2">
        <Link to={`/groups/group_add_document/${id}`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add Document
          </Button>
        </Link>
      </div>
      <Card>
        <Card.Header>
          <div className=" d-flex justify-content-between">
            <div>
              {singalDataSuccess && <Card.Title as="h5">{singalData.data.name}</Card.Title>}
              {singalDataSuccess &&
                singalData.data.user.map((item) => (
                  <span>
                    <img
                      width={20}
                      alt={item.name}
                      className="rounded-circle pb-1 "
                      variant="top"
                      src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : { avatar }}
                    />
                  </span>
                ))}
            </div>
            <div>
              <span className="me-auto pointer">
                <div onClick={() => history.goBack()}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </div>
              </span>
            </div>
          </div>
        </Card.Header>

        {isFetching && <Loading />}

        {data?.length === 0 && (
          <div className="d-flex justify-content-center">
            <p className="text-center">No Document Found :)</p>
          </div>
            )}

  
        {isSuccess && (
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
            {data?.map((item) => (
              <div className="mx-1 sm-col-12" key={item.id}>
                <Card style={{ width: '15rem', height: '15rem' }}>
                  {item.file.split('.').pop().includes('png') ||
                  item.file.split('.').pop().includes('jpg') ||
                  item.file.split('.').pop().includes('jpeg') ||
                  item.file.split('.').pop().includes('gif') ? (
                    <Card.Img className="h-50" variant="top" src={`${process.env.REACT_APP_File_URL}${item.file}`} />
                  ) : (
                    <div className="box border border-bottom-0 pb-4 bg-info">
                      <img className="" width="100px" src={file} alt={file} />
                      <h3 className="bg-light file-sty  text-center rounded text-uppercase">{item.file.split('.').pop()}</h3>
                    </div>
                  )}

                  <Card.Body className="py-2 px-2 py-3 mb-4">
                    <div className=" d-flex justify-content-evenly">
                      <div className="mb-1 ">
                        <span>
                          <HiUserGroup className=" mx-1 mb-1" color="green" />
                          {item.group.name.slice(0, 15)}
                        </span>
                      </div>
                      <div></div>
                    </div>

                    <Card.Title className="m-0 p-0 h6">
                      <b>{item.name.slice(0, 15)}</b>
                    </Card.Title>
                    <Card.Text className="m-0 p-0" style={{ fontSize: '11px' }}>
                      Created by: {item.user.name}
                    </Card.Text>
                  </Card.Body>

                  <div className=" text-center p-2 shadow my-3 mt-4">
                    <div>
                      <Link className="px-1" to={`/groups/group_document_view/${item.id}`}>
                        <BsFillEyeFill color="blue" size={22} />
                      </Link>
                      {auth.id === item?.user.id && (
                        <Link to={`/groups/group_document_update/${item.id}`} className="px-2">
                          <BsPencilSquare size={18} />
                        </Link>
                      )}
                      <span className="pointer m-2">
                        <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                      </span>
                      {auth.id === item?.user.id && (
                        <BsFillTrashFill className="pointer mx-1" color="red" size={17} onClick={() => deleteHandel(item.id)} />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

export default GroupDocument;
