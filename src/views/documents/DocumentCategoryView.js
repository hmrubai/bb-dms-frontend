import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {
  BsArrowLeftCircleFill,
  BsFillEyeFill,
  BsFillTrashFill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsFillPlusCircleFill,
  BsPencilSquare,
  BsFillCheckCircleFill,
  BsXCircleFill,
  BsCheckCircleFill,
  BsReplyAllFill
} from 'react-icons/bs';
import file from '../../assets/images/File/word.png';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import {
  useDeleteDocumentMutation,
  useDocumentpublishMutation,
  useDocumentPublishQuery,
  useShowCategoryDocumentQuery,
  useShowSubCategoryQuery
} from '../../services/documentApi';
import { useDispatch, useSelector } from 'react-redux';
import { documentView } from '../../features/documentSlice';
import { toast } from 'react-toastify';
import DocumentSubCategory from './DocumentSubCategory';
import Swal from 'sweetalert2';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Cookies from 'js-cookie';

function DocumentCategoryView() {
  const authPermission = useSelector((state) => state.auth.permissions);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = useShowCategoryDocumentQuery(id);
  const { data: subCategory, isSuccess: cateIssucess } = useShowSubCategoryQuery(id);
  const [deleteDocument] = useDeleteDocumentMutation();
  const [documentpublish, { data: no }] = useDocumentpublishMutation();

  const deleteHandel = async (Did) => {
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'error',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 200,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDocument(Did);
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
        documentpublish(Pid);
        Swal.fire('Publish!', 'Your file has been Publish.', 'success');
      }
    });
  };

  if (isSuccess) {
    toast.success(data.message);
  }

  // download file

  const download = (e, item) => {
    console.log(item);
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_BASE_URL}download/${item.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
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
      <div className="d-flex justify-content-between">
        <div className="mb-2">
          <Link to={`/documents/document_add`}>
            <Button>
              <BsFillArrowUpCircleFill color="white" className="mr-2 " />
              Uploade Document
            </Button>
          </Link>
        </div>

        <Link to={`/catagories/sub_category_add`}>
          <Button>
            <BsFillPlusCircleFill color="white" className="mr-2 " />
            Add Sub Category
          </Button>
        </Link>
      </div>
      <Card>
        <Card.Header className="">
          <div className=" d-flex justify-content-between ">
            <div>
              <Card.Title as="h5">Documents</Card.Title>

              <span>
                <Link to={`/documents/document`}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </Link>
              </span>
            </div>
          </div>
        </Card.Header>
        <div className="m-0 p-0">{isLoading && <Loading />}</div>
        <div className="m-0 p-0">{isError && <div>No Document:</div>}</div>
        <Card.Body>
          {cateIssucess && (
            <div>
              <div className="d-flex flex-wrap ">
                {subCategory.map((item, i) => (
                  <DocumentSubCategory key={i} item={item} />
                ))}
              </div>
            </div>
          )}
          <div className="d-flex flex-wrap ">
            {data?.map((item) => (
              <div className="mx-1 " key={item.id}>
                <Card style={{ width: '15rem', height: '15rem' }} onClick={() => dispatch(documentView(item))}>
                  {item.file.split('.').pop().includes('png') || item.file.split('.').pop().includes('jpg') ? (
                    <Card.Img className="h-50" variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${item.file}`} />
                  ) : (
                    <div className="box border border-bottom-0 pb-4">
                      <img className="" width="100px" src={file} alt={file} />
                      <h3 className="bg-light file-sty  text-center rounded text-uppercase">{item.file.split('.').pop()}</h3>
                    </div>
                  )}

                  <Card.Body className="py-2 px-2 py-3 mb-4">
                    <div className=" d-flex justify-content-evenly">
                      <div className="mb-1 ">
                        {item.status === 'Pending' ? (
                          <span>
                            <BsXCircleFill className="mx-1" color="red" />
                            {item.status}
                          </span>
                        ) : (
                          <span>
                            <BsFillCheckCircleFill className=" mx-1" color="green" />
                            Published
                          </span>
                        )}
                      </div>
                      <div></div>
                    </div>

                    <Card.Title className="m-0 p-0 h6">
                      <b>{item.name.split(' ')[0]}</b>
                    </Card.Title>
                    <Card.Text className="m-0 p-0" style={{ fontSize: '11px' }}>
                      Author by: {item.user.name}
                    </Card.Text>
                  </Card.Body>

                  <div className=" text-center p-2 shadow my-3 mt-4">
                    {item.file.split('.').pop().includes('pdf') ||
                    item.file.split('.').pop().includes('png') ||
                    item.file.split('.').pop().includes('jpg') ? (
                      <Link to={`/documents/document_view/${item.id}`}>
                        <BsFillEyeFill color="black" size={20} />
                      </Link>
                    ) : (
                      <span className="pointer">
                        <BsFillArrowDownCircleFill onClick={(e) => download(e, item)} color="black" size={18} />
                      </span>
                    )}

                    <Link to={`/documents/document_edit/${item.id}`} className="px-3">
                      <BsPencilSquare size={18} />
                    </Link>

                    <BsFillTrashFill className="pointer mx-1" color="red" size={17} onClick={() => deleteHandel(item.id)} />

                    {item.status === 'Pending' && (
                      <BsReplyAllFill className="pointer mx-1 border " color="green" size={22} onClick={() => DocumentPublish(item.id)} />
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default DocumentCategoryView;
