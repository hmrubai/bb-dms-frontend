import React from 'react';
import { useGetAllCatagoryQuery } from '../../../services/catagoryApi';



const DashDefault = () => {
  const { data, isFetching } = useGetAllCatagoryQuery();
  if (isFetching) {
    console.log("hi")
  }
  console.log(data)
  return (
    <React.Fragment>
    
    </React.Fragment>
  );
};

export default DashDefault;
