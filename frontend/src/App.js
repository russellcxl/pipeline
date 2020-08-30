import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { decode } from "jsonwebtoken";
import MainFrame from "./components/MainFrame";

// ------------------------------------ config ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

// ------------------------------------ component ------------------------------------ //

function App() {

  const handleAuth = useHandleAuth();

  return (
    <div className="App">
      <MainFrame {...handleAuth}/>
    </div>
  );
}

// ------------------------------------ authentication ------------------------------------ //

function useHandleAuth() {

  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  
  
  async function handleRegister(details) {
    try {
      let res = await axios.post(`${url}/api/auth/register`, details);
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    }
    catch (e) {
      console.log(e.data.message);
    }
  }
  
  
  async function handleLogin(details) {
    try {
      let res = await axios.post(`${url}/api/auth/login`, details);
      localStorage.setItem("token", res.data.token);
      setAuth(true);
      console.log(res.data);
    }
    catch (e) {
      console.log(e);
      setAuth(false);
    }
  }
  
  
  async function handleLogout(e) {
    console.log("LOGGING OUT");
    e.preventDefault();
    setAuth(false);
    setUser(null);
    localStorage.removeItem("token");
  }
  
  
  useEffect(() => {
    let token = localStorage.getItem("token");
  
    if (!(token == null)) {
      let decodedToken = decode(token);
  
      !decodedToken ? localStorage.removeItem("token") : setAuth(true);
    }
    console.log(isAuth);
  }, [isAuth]);

  return {
    isAuth,
    user,
    handleRegister,
    handleLogin,
    handleLogout,
  }
}

export default App;
