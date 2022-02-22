import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../utills/Loader";
const AuthGuard = (props) => {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if (!users.auth) {
      navigate("/");
    }
  }, [users.auth, navigate]);

  if (users.auth) {
    return <>{props.children}</>;
  } else return <Loader />;
};

export default AuthGuard;

// i actually wont use that for now
