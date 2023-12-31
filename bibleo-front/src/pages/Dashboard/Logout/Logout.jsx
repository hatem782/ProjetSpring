import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutAction } from "../../../redux/User.reducer";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LogoutAction());
    navigate("/login");
  }, []);

  return <div></div>;
}

export default Logout;
