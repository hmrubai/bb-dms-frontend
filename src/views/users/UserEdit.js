import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { checkObjectInArray } from "../../utils/Helper";
import { useGetAllPermissionQuery } from "../../services/permissionApi";
import getPermissionsMasterData from "./permissionMasterData";
import  axios  from 'axios';
import { useParams } from 'react-router-dom';



const UserEdit = props => {
  const { id } = useParams();
  const { data, isSuccess } = useGetAllPermissionQuery();
  const [mainPermissions, setMainPermissions] = useState([]);
  const [userDefaultPermissions, setUserDefaultPermissions] = useState([])

  // const [role, setRole] = useState({
  //   permissions: [
  //     { permission_id: 1, name: "create_product" },
  //     { permission_id: 2, name: "edit_product" },
  //     { permission_id: 20, name: "view_product" },
  //     { permission_id: 4, name: "delete_product" },
  //     { permission_id: 5, name: "create_category" },
   
  //   ]
  // });


console.log("userDefaultPermissions", userDefaultPermissions);
  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}permission`)
    .then(res => {
    
      setMainPermissions(res.data);
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(`${process.env.REACT_APP_BASE_URL}users/${id}`)
    .then(res => {
         
      setUserDefaultPermissions(res.data.user_has_permission
);
    })
    .catch(err => {
      console.log(err);
    })


  }, []);





  const [permissions, setPermissions] = useState({
    allPermissions: []
  });


  const submitRole = (e) => {
    e.preventDefault(); 
    let selectedPermissions = [];
    permissions.allPermissions.forEach((item, index) => {
      if (item.isChecked) {
        selectedPermissions.push(item);
      }
    });
    
    const data = {
      permissions: selectedPermissions
    };

    console.log("data", data);
    // onSubmitEdit(data);
  };




  useEffect(() => {
    let permissionsData = { ...permissions };

    // let allPermissionsData = getPermissionsMasterData();

    mainPermissions.forEach((item, index) => {
      item.isChecked = checkObjectInArray(item, userDefaultPermissions, "id","permission_id");
      permissionsData.allPermissions.push(item);
    });
    setPermissions(permissionsData);

  }, [userDefaultPermissions]);


  const checkPermission = (e, index) => {
    let permissionsData = { ...permissions };
    const checkedStatus = e.target.checked;
    permissionsData.allPermissions[index].isChecked = checkedStatus;
    setPermissions(permissionsData);
  };


  return (
    <>
     
   
        <Form >
          <Form.Group as={Row} controlId="role">
            <Form.Label column sm="4">
              Enter Role
            </Form.Label>
            <Col sm="6">
              <input
                className="form-control"
                // value={roleData.name}
  
                placeholder="Enter Role Name"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="permissions">
            <Form.Label column sm="4">
              Permissions
            </Form.Label>
          <Col sm="6">

        
          

            
              {permissions?.allPermissions?.map((item, index) => (
                <>
                  <label>
                    <input
                      type="checkbox"
                      value={JSON.stringify(item)}
                      checked={item.isChecked ? true : false}
                      onChange={e => checkPermission(e, index)}
                    />{" "}
                    {item.name}
                  </label>{" "}
                  <br />
                </>
              ))}
            </Col>
        </Form.Group>
        <button onClick={submitRole} className="btn btn-success">
          Update
        </button>
        </Form>
 

    </>
  );
};

export default UserEdit;
