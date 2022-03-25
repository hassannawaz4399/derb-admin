import React from "react";
// import man from "../../../assets/images/dashboard/man.png";
const userimage = sessionStorage.getItem("userimage");
const username = JSON.parse(sessionStorage.getItem("user"));

const UserPanel = () => {
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={userimage}
            alt="#"
          />
        </div>
        <h6 className="mt-3 f-14">{username}</h6>
      </div>
    </div>
  );
};

export default UserPanel;
