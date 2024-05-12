import React, { useEffect, useState } from "react";
import axios from "axios";

const Welcome = () => {
  const [userInfo, setUserInfo] = useState();
  let firstRender = true;
  const refreshToken = async () => {
    try {
      const res = await axios.get("/api/auth/refresh");
      setUserInfo(res.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/user");
      setUserInfo(res.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    if (firstRender) {
      getUser();
      firstRender = false;
    }
    let interval = setInterval(() => {
      refreshToken();
    }, 1000 * 28);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h1>{userInfo ? userInfo.name : null}</h1>
    </div>
  );
};

export default Welcome;
