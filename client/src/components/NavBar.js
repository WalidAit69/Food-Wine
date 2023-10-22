import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/food-wine-seeklogo.com.svg";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";



function NavBar() {
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [nav, setnav] = useState(false);

  const [cookies, setCookies] = useCookies(["access_token"]);

  const showNav = () => {
    navRef.current.classList.toggle("responsive");
    // document.getElementById("container").classList.toggle("body_blur");
    setnav(!nav);
  };


  const Logout = () =>{
    setCookies("access_token","")
    window.localStorage.removeItem("userID");
    navigate('/auth')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      {!nav ? (
        <FaBars onClick={showNav} className="menu_bar"></FaBars>
      ) : (
        <FaTimes onClick={showNav} className="menu_bar"></FaTimes>
      )}
      <div ref={navRef} className="navbar__links">
        <Link className="links" to={"/"}>
          Home
        </Link>
        <Link className="links" to={"/CreateRecipe"}>
          Create Recipe
        </Link>
        <Link className="links" to={"/SavedRecipes"}>
          Saved Recipes
        </Link>
        {!cookies.access_token ? (
          <Link className="links" to={"/Auth"}>
            Login
          </Link>
        ) : (
          <button onClick={Logout} className="btn" style={{marginTop:"0rem"}}>Log out</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
