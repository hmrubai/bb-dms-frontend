import React from 'react';
import { Card } from 'react-bootstrap';
import group from './../../assets/images/File/group.png';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsFillTrashFill, BsFillEyeFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { RiUploadCloud2Fill } from 'react-icons/ri';

export const GroupTable = () => {
  return (
    <>
      <div className="mb-2"></div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Groups</Card.Title>
        </Card.Header>

        <div className="d-flex flex-wrap ">
          <Card >
            <div className='text-center'>
                <Card.Img
              className="m-1 pointer  "
              variant="top"
              src={group}
              style={{ width: '100px', height: '100px' }}
              //   alt={category.name}
            />
            </div>
          
            <Card.Body className="py-0 my-0">
              <Card.Title style={{ fontSize: '100%' }} className="text-center font-weight-bold">
                {/* {category.name} */}
                Bacbon
              </Card.Title>
          
              <div className=" text-center p-2 shadow my-3 mt-4">
                    <div>
                      <Link to={`/documents/document_view/`}>
                        <BsFillEyeFill color="blue" size={22} />
                      </Link>
                      <span className="pointer ml-3">
                        <BsFillArrowDownCircleFill  color="black" size={18} />
                      </span>
                      <Link to={`/documents/document_edit/`} className="px-3">
                        <BsPencilSquare size={18} />
                      </Link>
                      <BsFillTrashFill className="pointer mx-1" color="red" size={17}  />
                      {/* {item.status === 'Pending' && (
                        <RiUploadCloud2Fill className="pointer mx-1  " color="Teal" size={22} onClick={() => DocumentPublish(item.id)} />
                      )} */}
                    </div>
                  </div>
            </Card.Body>
          </Card>
        </div>
      </Card>
    </>
  );
};
