import React, { useState } from "react";
import "./userLoginPage.css";
import TextField from "../../components/text-field/TextField";
import MainButton from "../../components/main-button/MainButton";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function UserLoginPage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(-1);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [userSignup, setUserSignup] = useState({
    username: "",
    address: "",
    phone: null,
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const emptySignupTextFields = () => {
    setUserSignup({
      username: "",
      address: "",
      phone: null,
      email: "",
      password: "",
    });
  };

  const emptyLoginTextFields = () => {
    setUserLogin({
      email: "",
      password: "",
    });
  };

  const handleLoginChange = (event) => {
    const value = event.target.value;
    setUserLogin({ ...userLogin, [event.target.name]: value });
  };

  const handleSignUpChange = (event) => {
    const value = event.target.value;
    setUserSignup({ ...userSignup, [event.target.name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    const loginForm = {
      email: userLogin.email,
      password: userLogin.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        loginForm
      );
      console.log(response);
      if (response.status === 200) {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        Cookies.set("user-token", response.data.token, { expires: oneWeek });
        Cookies.set("user-id", response.data._id, { expires: oneWeek });
      } else {
        console.error(response.data.message);
      }
      emptyLoginTextFields();
      setIsLoading(false);
      handleButtonClick();
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    const signupForm = {
      username: userSignup.username,
      address: userSignup.address,
      phone: userSignup.phone,
      email: userSignup.email,
      password: userSignup.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        signupForm
      );
      console.log(response);
      emptySignupTextFields();
      setIsLoading(false);
      setIsSignup(false);
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="user-login-page-container">
      <div className="user-login-section">
        <div className="user-login-back-arrow" onClick={handleButtonClick}>
          <ArrowBackRoundedIcon />
        </div>
        <div className="user-login-heading">
          <h2>{isSignup ? "Signup" : "Login"}</h2>
        </div>
        {!isSignup ? (
          <form className="user-login-form" onSubmit={login}>
            <div
              className="user-login-error-message"
              onClick={() => setError("")}
            >
              {error}
            </div>
            <TextField
              type="email"
              name="email"
              label="Email"
              style={{
                boxShadow: "none",
              }}
              onChange={handleLoginChange}
              required={true}
              value={userLogin.email}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              style={{
                boxShadow: "none",
              }}
              onChange={handleLoginChange}
              required={true}
              value={userLogin.password}
            />
            <div className="user-login-button">
              <MainButton
                type="submit"
                name={isLoading ? "" : "LOGIN"}
                style={{
                  width: "100%",
                }}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
              </MainButton>
            </div>
            <div
              className="signup-login-nav"
              onClick={() => {
                setIsSignup(true);
                emptyLoginTextFields();
              }}
            >
              Don't have an account? Signup
            </div>
          </form>
        ) : (
          <form className="user-login-form" onSubmit={signup}>
            <div
              className="user-login-error-message"
              onClick={() => setError("")}
            >
              {error}
            </div>
            <TextField
              type="text"
              name="username"
              label="Username"
              style={{
                boxShadow: "none",
              }}
              onChange={handleSignUpChange}
              required={true}
              value={userSignup.username}
            />
            <TextField
              type="text"
              name="address"
              label="Address"
              style={{
                boxShadow: "none",
              }}
              onChange={handleSignUpChange}
              required={true}
              value={userSignup.address}
            />
            <TextField
              type="number"
              name="phone"
              label="Phone"
              style={{
                boxShadow: "none",
              }}
              onChange={handleSignUpChange}
              required={true}
              value={userSignup.phone}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              style={{
                boxShadow: "none",
              }}
              onChange={handleSignUpChange}
              required={true}
              value={userSignup.email}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              style={{
                boxShadow: "none",
              }}
              onChange={handleSignUpChange}
              required={true}
              value={userSignup.password}
            />
            <div className="user-login-button">
              <MainButton
                type="submit"
                name={isLoading ? "" : "SIGNUP"}
                style={{
                  width: "100%",
                }}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
              </MainButton>
            </div>
            <div
              className="signup-login-nav"
              onClick={() => {
                setIsSignup(false);
                emptySignupTextFields();
              }}
            >
              Have an account? Login
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default UserLoginPage;
