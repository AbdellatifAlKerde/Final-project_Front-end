import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLoginPage.css";
import TextField from "../../components/text-field/TextField";
import MainButton from "../../components/main-button/MainButton";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import Cookies from "js-cookie";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin, setAdminLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginChange = (event) => {
    const value = event.target.value;
    setAdminLogin({ ...adminLogin, [event.target.name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    const adminForm = {
      username: adminLogin.username,
      password: adminLogin.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,
        adminForm
      );
      console.log(response);
      if (response.status === 200) {
        Cookies.set("admin-token", response.data.token);
        localStorage.setItem("isSuper", response.data.isSuper);
      }
      if (response.data.isSuper) {
        navigate("/admin-dashboard");
      } else {
        navigate("/owner-dashboard");
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h2>Login</h2>
        <form className="admin-login-form" onSubmit={login}>
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
            onChange={handleLoginChange}
            required={true}
            value={adminLogin.username}
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
            value={adminLogin.password}
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
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
