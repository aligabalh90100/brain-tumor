import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";

import SignupForm from "../../components/form/SignupForm/SignupForm";
import SigninForm from "../../components/form/SigninForm/SigninForm";
import Overlay from "../../components/form/Overlay";

const HomePage = () => {
  const main = useRef();
  const [signIn, setSignIn] = useState(true);
  const [signUp, setSignUp] = useState(true);
  useEffect(() => {
    function getWindowSize() {
      if (window.innerWidth < 600) {
        setSignIn(false);
      }
    }
    window.addEventListener("loadstart", () => {
      if (window.innerWidth < 600) {
        setSignIn(false);
      } else {
        setSignIn(true);
      }
    });

    getWindowSize();
  }, []);

  return (
    <div>
      <div className="form-container">
        <div ref={main} className="container" id="main">
          {signUp && (
            <SignupForm showSignIn={setSignIn} showSignUp={setSignUp} />
          )}
          {signIn && (
            <SigninForm showSignIn={setSignIn} showSignUp={setSignUp} />
          )}
          <Overlay ref={main} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
