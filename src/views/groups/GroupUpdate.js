import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useCreateGroupMutation, useSingalGroupQuery, useUpdateGroupMutation } from '../../services/groupApi';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

function GroupUpdate() {
  const {id}=useParams()
  const history = useHistory();
  const { data, isFetching, isSuccess, isLoading } = useSingalGroupQuery(id)
  const [updateGroup,resp]=useUpdateGroupMutation()
 

  // console.log(data);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [user, setUser] = useState([]);
  const [member, setMember] = useState([]);
  const [defaultSelectMember, setDefaultSelectMember] = useState([]);
  const [previewImage, setImagePreview] = useState();

  // console.log(res);





  const submitHandel = async (e) => {
 
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image !== undefined) {
      formData.append('image', image);
    }



   const arr = [];
    if (member.length > 0) {
      member.map((item) => {
        arr.push(item.id);
      });
      
      const memberArr = JSON.stringify(arr);
      formData.append('member', memberArr);
    } else {
      defaultSelectMember.map((item) => {
        arr.push(item.id);
      })
      const memberArr = JSON.stringify(arr);
      formData.append('member', memberArr);
    }

    try {
      const result = await updateGroup({ id: id, data: formData }).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  if (resp.isSuccess) {
    history.goBack();
  }

  useEffect(() => {
    addUserMember();
    if (isSuccess) {
      setName(data?.data?.name)
      setDescription(data?.data?.description)
      setDefaultSelectMember(data?.data?.user)
      setImage(data?.data?.image)

    }
  }, [isSuccess]);

  const addUserMember = (e) => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}all_user_for_group`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('dms_token')}`
      }
    }).then((res) => {
      setUser(res.data);
    });
  };

  function handelImage(e) {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }


  return (
    <>
      <Form onSubmit={submitHandel} encType="multipart/form-data">
        <Card>
          <Card.Header>
        
            <div className='d-flex justify-content-between'>
            <div>
                 <Card.Title as="h5">Update Group</Card.Title>
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
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Select Group Member</Form.Label>
                      <Multiselect
                        options={user}
                        placeholder="Select Member"
                        onSelect={(e) => setMember(e)}
                        displayValue="username"
                        showArrow={true}
                        selectedValues={defaultSelectMember}
                        disablePreSelectedValues={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="1"
                        placeholder="Group Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    
                    <img className="img-circle py-2" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} width="90px" alt="" />
                    <br />
                    <div>
                    <img src={previewImage} className="py-2" width="90px"  alt="" />
                    </div>
                    <Form.Label>Feature image</Form.Label>
                    <br />
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <input
                        type="file"
                        name="image"
                        accept="image/png ,image/jpg,image/jpeg , image/svg+xml ,application/pdf "
                        onChange={(e) => { setImage(e.target.files[0]); handelImage(e);}}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="pt-3">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default GroupUpdate;