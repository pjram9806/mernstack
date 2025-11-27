import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚫 Redirect if user is not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // ✅ Optional: restrict access only to admin
  if (user.role !== "admin") {
    navigate("/personaldetails");
    return null;
  }

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Welcome Admin {user.name}</h2>
              <p className="h6">Your Dashboard Here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
