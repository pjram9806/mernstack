import React from "react";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to login if user not found
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">
                Welcome User {user.name} & Role {user.role}
              </h2>
              <p className="h6">Your Details Here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
