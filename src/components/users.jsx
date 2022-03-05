import React from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";

const Users = (props) => {
  // const queryString = require('query-string');

  // let location = useLocation();
  // let [searchParams] = useSearchParams();

  // console.log(location.search);
  // console.log(queryString.parse(location.search));

  return (
    <React.Fragment>
      <h1>Users</h1>

      <Link to="/users/5" className="m-2">
        Go To Speceific User
      </Link>
      <Link to="/users/nested">Go To nested home</Link>

      <Outlet />
    </React.Fragment>
  );
};

export default Users;
