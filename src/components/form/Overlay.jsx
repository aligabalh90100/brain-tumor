import React, { useEffect, useRef, forwardRef } from "react";

const Overlay = forwardRef(({}, ref) => {
  const signInBtn = useRef();
  const signUpBtn = useRef();
  useEffect(() => {
    signInBtn.current.addEventListener("click", () => {
      ref.current.classList.remove("right-panel-active");
    });
    signUpBtn.current.addEventListener("click", () => {
      ref.current.classList.add("right-panel-active");
    });
  }, []);
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-left">
          <h1>One of us ?</h1>
          <p>
            Create an account to help us reassure you by reading your MRI image
            without going to a doctor by uploading your MRI and getting the
            result from your phone.
          </p>
          <button ref={signInBtn} id="signIn">
            Sign In
          </button>
        </div>
        <div className="overlay-right">
          <h1>Welcome</h1>
          <p>
            welcome to lifeline community please log in to become one of us.
          </p>
          <button ref={signUpBtn} id="signUp">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
});

export default Overlay;
