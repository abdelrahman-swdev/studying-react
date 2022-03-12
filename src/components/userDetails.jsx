import React from "react";
import { useParams } from "react-router-dom";

const UserDetails = (props) => {
  let params = useParams();
  return <h1>Specific User with id : {params.id}</h1>;
};

export default UserDetails;
