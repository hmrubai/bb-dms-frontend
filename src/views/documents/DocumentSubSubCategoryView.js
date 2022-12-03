import React from 'react';
import { Card,Button } from 'react-bootstrap';
import {
  BsArrowLeftCircleFill,
  BsFillEyeFill,
  BsFillTrashFill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import {
  useDeleteDocumentMutation,
  useShowSubSubCategoryDocumentQuery,

} from '../../services/documentApi';
import { useDispatch } from 'react-redux';
import { documentView } from '../../features/documentSlice';
import { toast } from 'react-toastify';


function DocumentSubSubCategoryView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, isLoading, isError, isSuccess, } = useShowSubSubCategoryDocumentQuery(id);

  // console.log(data);

  const [deleteDocument] = useDeleteDocumentMutation();

  const deleteHandel = async (id) => {
    await deleteDocument(id);
  };

  if (isSuccess) {
    toast.success(data.message);
  }

  // console.log(subCategory);

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

        
      </div>
      <Card>
        <Card.Header className="">
          <div className=" d-flex justify-content-between ">
            <div>
              <Card.Title as="h5">Document</Card.Title>
 
              <span>
                <Link to={`/documents/document`}>
                  <BsArrowLeftCircleFill color="black" size={'20px'} />
                </Link>
              </span>
            </div>
          </div>
        </Card.Header>
        <div>{isLoading && <Loading />}</div>
        <div>{isError && <div>No Document:</div>}</div>

        <Card.Body>
          <div className="d-flex flex-wrap ">
            {data?.map((item) => (
              <div className='mx-1' key={item.id} >
                <Card style={{ width: '10rem', height: '13rem'  }} onClick={() => dispatch(documentView(item))}>
                  {item.file.split('.').pop().includes('png') || item.file.split('.').pop().includes('jpg') ? (
                    <Card.Img className="h-50" variant="top" src={`${process.env.REACT_APP_IMAGE_URL}${item.file}`} />
                  ) : (
                    <div className="box ">
                      <h2 className="bg-light text-center rounded text-uppercase">{item.file.split('.').pop()}</h2>
                    </div>
                  )}
                  <Card.Body className="py-2 px-2">
                    <Card.Title className='m-0 p-0 h6' ><b>{item.name}</b></Card.Title>
                    <Card.Text>Author by: {item.user.name}</Card.Text>
                  </Card.Body>

                  <div className=" text-center p-2 shadow m-3 ">
                    {item.file.split('.').pop().includes('pdf') ||
                    item.file.split('.').pop().includes('png') ||
                    item.file.split('.').pop().includes('jpg') ? (
                      <Link to={`/documents/document_view/${item.id}`}>
                        <BsFillEyeFill color="black" size={20} />
                      </Link>
                    ) : (
                      <a href={`${process.env.REACT_APP_IMAGE_URL}${item.file}`} download>
                        <BsFillArrowDownCircleFill color="black" size={18} />
                      </a>
                    )}

                    {/* <Link to={`/catagories/sub_category_edit/${item.id}`} className="px-3">
                      <BsPencilSquare size={18} />
                    </Link> */}

                    {/* <button className=" border-0 " onClick={() => deleteHandel(item.id)}> */}
                      <BsFillTrashFill className='pointer mx-1' color="red" size={17} onClick={() => deleteHandel(item.id)} />
                    {/* </button> */}
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

export default DocumentSubSubCategoryView;
