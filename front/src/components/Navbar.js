import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav className="login-bar-home">
      {uid ? (
        <>
          <img className="logo-left" src="/logo-little.png" alt="logo" />
          <div className="welcome-user">
            <i className="fa-solid fa-circle-user userlog user-profil fa-2x"></i>
            <h3 className="welcome">Bienvenue {userData.pseudo}</h3>
          </div>

        <div className="nav-icon">
        <i className="fa-solid fa-bell"><span className="number">0</span></i>
        <i className="fa-solid fa-message"><span className="number">0</span></i>
        </div>

          <ul className="login-bar-list-home">
            <Logout />
          </ul>
        </>
      ) : (
        <ul>
          <li>
            <NavLink exact to="/auth">
              <p className="goToLogin">Se connecter</p>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
