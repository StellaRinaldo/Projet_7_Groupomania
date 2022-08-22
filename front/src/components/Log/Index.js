import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [loginModal, setLoginModal] = useState(props.login);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };

  return (
    <>
      <header className="header-log">
        <img className="logo-left" src="/logo-little.png" alt="logo" />
        <nav className="login-bar">
          <ul className="login-bar-list">
            <li
              onClick={handleModals}
              id="signup"
              className={signUpModal ? "active-btn" : null}
            >
              S'inscrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={loginModal ? "active-btn" : null}
            >
              Se connecter
            </li>
          </ul>
        </nav>
      </header>
      <main>
      <div className="connection-form">
        <div className="form-container">
          {signUpModal && <SignUp />}
          {loginModal && <Login />}
        </div>
      </div>
      </main>
      
    </>
  );
};

export default Log;
