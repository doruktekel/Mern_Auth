import React, { useEffect, useState } from "react";
import axios from "axios";

const Welcome = () => {
  const [userInfo, setUserInfo] = useState();

  const getUser = async () => {
    try {
      axios
        .get("/api/auth/user")
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1>{userInfo ? userInfo.name : null}</h1>
    </div>
  );
};

export default Welcome;
