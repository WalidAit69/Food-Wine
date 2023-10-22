import React, { useState } from "react";
import "./Register.css";
import logo from "../assets/food-wine-seeklogo.com.svg";
import { LoginForm } from "./Forms/LoginForm";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log(res);
      alert(res.data.msg);
      setCookies("access_token",res.data.token);
      window.localStorage.setItem("userID",res.data.userID);
      navigate('/')
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="auth_main">
      <img src={logo} alt="" />
      <h3>
        Sign in now to receive our best recipes, restaurant intel, cooking
        advice, wine picks and pairings.
      </h3>
      <LoginForm
        label={"Log in"}
        Username={username}
        setUsername={setUsername}
        password={password}
        setpassword={setpassword}
        onsubmit={onSubmit}
        email={email}
        setEmail={setEmail}
      ></LoginForm>
    </div>
  );
}

export default Login;
