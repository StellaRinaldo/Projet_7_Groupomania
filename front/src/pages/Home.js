import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import CreatePost from "../components/Post/CreatePost";
import Feeds from "../components/Feeds";
import Login from "../components/Log/Login";
import Events from "../components/Events";

import Navbar from "../components/Navbar";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <>
          <header className="header-log">
            {" "}

            <Navbar />
          </header>
          <main id="homePage">
            <Events />
            <div className="main-center">
            <CreatePost /> <Feeds />
            </div>
          </main>
        </>
      ) : (
        <>
        <header className="header-log">
        <img className="logo-left" src="/logo-little.png" alt="logo" />
        </header>
          <Login />
          <p className="info">
            Pas encore de compte ? <br/>
            <Link to="/auth">Inscrivez-vous ici !</Link>
          </p>
        </>
      )}
    </>
  );
};

export default Home;
