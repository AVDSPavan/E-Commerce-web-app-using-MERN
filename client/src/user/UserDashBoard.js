import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";

const UserDashBoard = () => {

  const {
    user: { name, email
    //role
  }
  } = isAutheticated();

  const dashboard = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
        </ul>
      </div>
    );
  };


  return (
    <Base
      title="Welcome to User Dashboard"
      description=""
      className="container p-1"
    >
     <div className="container p-3 ">
      <div className="row">
        <div className="col-md-10 offset-md-1">{dashboard()}</div>
      </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
