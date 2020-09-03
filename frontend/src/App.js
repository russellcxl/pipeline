import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { decode } from "jsonwebtoken";
import MainFrame from "./components/MainFrame";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';

// ------------------------------------ config ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#ffc107',
      dark: '#343a40',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ffc107',
      dark: '#343a40',
      contrastText: '#000',
    },
  },
});


// ------------------------------------ component ------------------------------------ //

function App() {

  const handleAuth = useHandleAuth();

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <Router>
          <MainFrame {...handleAuth} />
        </Router>
      </ThemeProvider>
    </div>
  );
}

// ------------------------------------ authentication ------------------------------------ //

function useHandleAuth() {

  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  
  
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
    }
    catch (e) {
      console.log(e);
      setAuth(false);
    }
  }
  
  
  function handleLogout(e) {
    e.preventDefault();
    setAuth(false);
    setUser(null);
    localStorage.removeItem("token");
  }

  async function getUserDetails(token) {
    try {
      let token = localStorage.getItem("token");
      let res = await axios.get(`${url}/api/users/profile`, {
        headers: {
          "x-auth-token": token
        }
      });
      setUser(res.data.user);
      setAuth(true);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }
  
  
  useEffect(() => {
    let token = localStorage.getItem("token");
  
    if (!(token == null)) {
      let decodedToken = decode(token);
  
      !decodedToken ? localStorage.removeItem("token") : getUserDetails(token);
    }
  }, [isAuth]);

  return {
    isAuth,
    user,
    handleRegister,
    handleLogin,
    handleLogout,
  };
}

export default App;
