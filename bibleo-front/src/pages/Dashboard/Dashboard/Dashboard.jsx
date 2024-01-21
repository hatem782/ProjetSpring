import React from "react";
import "./style.css";
import img from "../../../assets/images/imgbbl.webp";
import { useSelector } from "react-redux";

function Dashboard() {
  const data = useSelector((state) => state.UserReducers.user);
  return (
    <div className="bibleo-dash">
      <h1>Welcome "{data.fullname}" to the Library Dashboard</h1>
      <img src={img} alt="bibleo" />
    </div>
  );
}

export default Dashboard;
