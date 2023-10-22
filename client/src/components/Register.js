import React, { useState } from "react";
import image from "../assets/casey-lee-awj7sRviVXo-unsplash.jpg";
import { FaGlobeAfrica } from "react-icons/fa";
import "./Register.css";
import logo from "../assets/food-wine-seeklogo.com.svg";
import Login from "./Login";
import { RegisterForm } from "./Forms/RegisterForm";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [page, setpage] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register",{username,email,password});
      console.log(res);
      alert(res.data.msg);
      setCookies("access_token",res.data.token);
      window.localStorage.setItem("userID",res.data.userID);
      navigate('/')
    }catch (error) {
      console.error(error);
      alert(error.response.data.error.msg);
    }
  }

  return (
    <main className="Auth_page">
      <div className="Auth_img">
        <img src={image} alt="" />
      </div>
      <div className="Auth_info">
        <div className="auth_nav">
          <div className="auth_lang">
            <FaGlobeAfrica></FaGlobeAfrica>
            <p>English</p>
          </div>
          <div className="auth_signin">
            <p>Already have an account?</p>
            <button onClick={() => setpage(!page)} className="auth_signinbtn">
              {!page ? "Log in" : "sign up"}
            </button>
          </div>
        </div>
        {!page ? (
          <div className="auth_main">
            <img src={logo} alt="" />
            <h3>
              Sign up now to receive our best recipes, restaurant intel, cooking
              advice, wine picks and pairings.
            </h3>
            <RegisterForm
              Username={username}
              setUsername={setUsername}
              password={password}
              setpassword={setpassword}
              label={"Create Account"}
              onsubmit={onSubmit}
              email={email}
              setEmail={setemail}
              page={page}
              setpage={setpage}
            ></RegisterForm>
          </div>
        ) : (
          <Login></Login>
        )}
      </div>
    </main>
  );
}

export default Register;
