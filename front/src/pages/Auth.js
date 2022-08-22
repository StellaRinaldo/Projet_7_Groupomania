import React, { useContext } from "react";
import Log from "../components/Log/Index";
import { UidContext } from "../components/AppContext";
import Home from "./Home";

const Auth = () => {
  const uid = useContext(UidContext);

  return (
    <div className="accueil">
      {uid ? (
        <Home />
      ) : (
        <div className="log-container">
          <Log login={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Auth;
